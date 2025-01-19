import { Router } from 'express';
import passport from 'passport';
import { CLIENT_URL, LOGIN_URL } from '../../lib/config.js';

export const authGoogle = Router();

//Ruta para iniciar sesión con Google
authGoogle.get(
    '/auth/google/',
    passport.authenticate('google', { scope: ['profile'] })
)

//Ruta para redireccionar a Google al callback para completar el proceso de inicio de sesión
authGoogle.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: CLIENT_URL,
        failureRedirect: LOGIN_URL,
    })
)

