import express from 'express'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oidc'

import userModel from '../models/user.model.js'
import federatedCredentialModel from '../models/federated-credential.model.js'

var router = express.Router();

passport.use(
    new GoogleStrategy({
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: 'http://localhost:3000/auth/google/callback',
    },  async function(issuer, profile, callback) {
        const credentialsRow = await federatedCredentialModel.findOne({
            where: {
                provider: issuer,
                subject: profile.id,
            },
            logging: (sql) => console.log(sql),
        });


        let user = null;
        if (credentialsRow === null) {
            user = await userModel.create({
                name: profile.displayName,
                email: profile.emails[0].value,
            })

            await user.createFederatedCredential({
                provider: issuer,
                subject: profile.id,
            })
        } else {
            user = await userModel.findOne({ where: { user_id: item.id } })
        }

        callback(null, user);
    })
)

passport.serializeUser(function(user, callback) {
    process.nextTick(function() {
        callback(null, { id: user.id, username: user.username, name: user.name });
    });
});

passport.deserializeUser(function(user, callback) {
    process.nextTick(function() {
        return callback(null, user);
    });
});

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    callbackURL: 'http://localhost:3000/auth/google/callback'
}));

router.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/dashboard',
        failureRedirect: '/'
    })
);

router.get('/auth/facebook/callback',
    passport.authenticate( 'facebook', {
        successRedirect: '/dashboard',
        failureRedirect: '/'
    })
);

router.get('/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'User not authenticated' });
    }
});

router.get('/auth/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err) }
        res.redirect('/');
    });
});


export default router;
