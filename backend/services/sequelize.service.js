import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.js';
import fs from 'fs';

const modelFiles = fs
  .readdirSync('./models/')
  .filter((file) => file.endsWith('.js'));

const sequelizeService = {
  init: async () => {
    try {
      let connection = new Sequelize({...databaseConfig, logging: console.log });

      /*
        Loading models automatically
      */
      for (const file of modelFiles) {
        const model = await import(`../models/${file}`);
        model.default.init(connection);
        console.log(`${file} is initiated`)
      }

      modelFiles.map(async (file) => {
        const model = await import(`../models/${file}`);
        model.default.associate && model.default.associate(connection.models);
      });

      console.log('[SEQUELIZE] Database service initialized');
    } catch (error) {
      console.log('[SEQUELIZE] Error during database service initialization');
      throw error;
    }
  },
};

export default sequelizeService;
