# Boilerplate: React router & Express, Passport.js, Sequelize

This boilerplate contains both a Frontend and Backend. A quick setup to begin developing a frontend with react and a backend api with express and sequelize. Passport.js is used for authentication and right now Google Auth is predefined but it will be very easy to add for example facebook or github.
Authentication is handled by passport-session which means the client will store a cookie with the session id.

#### Frontend:
- React
- React router
- Auth protected routes

#### Backend
- Express
- Passport.js with Google Oauth 2.0
- Sequelize (ORM) with migrations


## Setup


- ./
    - Copy .env.example to .env
    - Get your Google Auth credentials by following this:
        - https://support.google.com/cloud/answer/6158849
    - run `docker-compose up` to setup mariadb and the database


- ./frontend
    - Run `npm install`
    - Done, now run `npm run dev` to start develop the frontend

- ./backend
    - Run `npm install`
    - Run `npx sequelize-cli db:migrate` to 
    - Done, now run `npm run dev` to start develop the backend
