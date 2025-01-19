import { Router } from 'express'
import { ProductsController } from '../../controllers/products/c.products.js';

export const routerProducts = Router();

//GET - obtener todos los productos

routerProducts.get('/products', ProductsController.getAll);

//GET - obtener un producto por id

routerProducts.get('/products/:id', ProductsController.getById);

//POST - crear un nuevo producto

routerProducts.post('/products', ProductsController.create);

//PATCH - actualizar un producto

routerProducts.patch('/products/:id', ProductsController.update);

//DELETE - eliminar un producto

routerProducts.delete('/products/:id', ProductsController.delete);