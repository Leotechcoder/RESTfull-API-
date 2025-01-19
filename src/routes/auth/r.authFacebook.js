import { Router } from 'express';
import passport from 'passport';
import { CLIENT_URL, LOGIN_URL } from '../../lib/config.js';

export const authFacebook = Router();

authFacebook.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['public_profile'] }));


authFacebook.get('/auth/facebook/callback',
    passport.authenticate(
        'facebook', 
        { failureRedirect: LOGIN_URL }),
        function(req, res) {
            res.redirect(CLIENT_URL);
        }
);

