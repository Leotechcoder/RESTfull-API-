import { Router } from 'express';


import { UserAuthController } from '../../controllers/users/c.userAuth.js'

export const routerUserAuth = Router();

//Ruta para registrar un usuario

 routerUserAuth.post('/register', UserAuthController.register);

//Ruta para iniciar sesión

 routerUserAuth.post('/login', UserAuthController.login);

/*Obtener username */

routerUserAuth.get('/authenticate', UserAuthController.authUser);

/* Logout user */

routerUserAuth.get('/logout', UserAuthController.logout);