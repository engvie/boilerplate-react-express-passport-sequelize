import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
//import globalErrorHandler from '../middlewares/errorHandler.middleware';

import session from 'express-session'
import passport from 'passport'

/*
body-parser: Parse incoming request bodies in a middleware before your handlers, 
available under the req.body property.
*/

const routeFiles = fs
.readdirSync('./routes/')
.filter((file) => file.endsWith('.js'));

let server;
let routes = [];

const expressService = {
    init: async () => {
        try {
            /*
            Loading routes automatically
            */
            for (const file of routeFiles) {
                const route = await import(`../routes/${file}`);
                const routeName = Object.keys(route)[0];
                routes.push(route[routeName]);
            }
            
            server = express();
            server.use(bodyParser.json());

            server.use(session({
                secret: 'secret-word',
                resave: false,
                saveUninitialized: true,
            }))

            server.use(passport.session())
            server.use(passport.initialize())

            server.use(routes);

            //server.use(globalErrorHandler);
            server.listen(process.env.SERVER_PORT);
            console.log('[EXPRESS] Express initialized');
        } catch (error) {
            console.log('[EXPRESS] Error during express service initialization');
            throw error;
        }
    },
};

export default expressService;
