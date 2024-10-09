import Sequelize, { Model } from 'sequelize';

class federatedCredential extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        provider: Sequelize.STRING,
        subject: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: true, //If it's false do not add the attributes (updatedAt, createdAt).
        //paranoid: true, //If it's true, it does not allow deleting from the bank, but inserts column deletedAt. Timestamps need be true.
        //underscored: true, //If it's true, does not add camelcase for automatically generated attributes, so if we define updatedAt it will be created as updated_at.
        //freezeTableName: false, //If it's false, it will use the table name in the plural. Ex: Users
        tableName: 'federated-credentials' //Define table name
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.user, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
  }
}

export default federatedCredential;
