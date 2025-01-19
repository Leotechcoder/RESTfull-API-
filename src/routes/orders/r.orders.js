//Archivo que contiene las rutas de la entidad orders
// para obtener, crear, actualizar y eliminar ordenes

import { Router } from 'express';
import { OrdersController } from '../../controllers/orders/c.orders.js';

export const routerOrders = Router();

//obtener todas las ordenes
routerOrders.get('/orders', OrdersController.getAll);

//Obtener una orden por id
routerOrders.get('orders/:id', OrdersController.getById);

//Crear una orden
routerOrders.post('orders/', OrdersController.create);

//Actualizar parcialmente una orden
routerOrders.patch('orders/:id', OrdersController.updatePartial);

//Eliminar una orden
routerOrders.delete('orders/:id', OrdersController.delete);