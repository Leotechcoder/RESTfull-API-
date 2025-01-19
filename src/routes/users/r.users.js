
//En este archivo se encuentran las rutas para 
// obtener, crear, actualizar y eliminar usuarios

import { Router } from "express";

import { UsersController } from "../../controllers/users/c.usersCrud.js";


//Creo la instancia de router para las rutas de los usuarios
export const routerUsers = Router();


//Ruta para obtener todos los usuarios
routerUsers.get('/users', UsersController.getAll);


//Ruta para obtener un usuario por su id
routerUsers.get('/users/:id', UsersController.getById);


//Ruta para crear un nuevo usuario
routerUsers.post('/users', UsersController.create);


// //Ruta para actualizar un usuario
//  routerUsers.patch('/users/:id', UsersController.updatePartial);

//Ruta para eliminar un usuario
//  routerUsers.delete('/users/:id', UsersController.delete);


