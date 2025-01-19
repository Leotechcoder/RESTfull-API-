import { Router } from 'express';
import passport from 'passport';
import { CLIENT_URL, LOGIN_URL } from '../../lib/config.js';

export const authGoogle = Router();

//Ruta para iniciar sesión con Google
authGoogle.get(
    '/auth/google/',
<<<<<<< HEAD
    passport.authenticate('google', { scope: ['profile'] })
=======
    passport.authenticate('google', { scope: ['profile', 'email'] })
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
)

//Ruta para redireccionar a Google al callback para completar el proceso de inicio de sesión
authGoogle.get(
    '/auth/google/callback',
    passport.authenticate('google', {
<<<<<<< HEAD
        failureRedirect: LOGIN_URL,
    })
    ,
    function(req, res) {
        res.redirect(CLIENT_URL);
        
    }
=======
        successRedirect: CLIENT_URL,
        failureRedirect: LOGIN_URL,
    })
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
)

