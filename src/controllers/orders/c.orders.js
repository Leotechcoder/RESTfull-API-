<<<<<<< HEAD
import { OrdersModel } from "../../models/orders/m.orders.js";
=======
import { OrdersModel } from "../../models/m.orders.js";
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
import { access } from "../../middleware/authAccess.js";
import {
  validateOrder,
  validateOrderUpdate
} from "../../schemas/orders/orderSchema.js";

export class OrdersController {
  
//metodo para obtener todas las ordenes
  static async getAll(req, res) {
    const acceso = access(req, res); // middleware para permitir el acceso a la api
    if (!acceso.conexion) {
      return acceso.status;
    } else {
      // Obtengo todas las ordenes
<<<<<<< HEAD
      const orders = await OrdersModel.getAll();
=======
      const orders = await OrdersModel.get();
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
      if (!orders) {
        return res.status(404).json({
          message: "No se encontraron ordenes",
        });
      }
      return res.status(200).json(orders);
    }
  }


//metodo para obtener una orden por id
  static async getById(req, res) {
    const acceso = access(req, res); // middleware para permitir el acceso a la api
    if (!acceso.conexion) {
      return acceso.status;
    } else {
      const orderId = parseInt(req.params.id);

      // Obtengo la orden por id
<<<<<<< HEAD
      const order = await OrdersModel.getById({ orderId });
=======
      const order = await OrdersModel.getById({ orderId, res });
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }
      return res.status(200).json(order);
    }
  }


//metodo para crear una orden
  static async create(req, res) {
    const acceso = access(req, res); // middleware para permitir el acceso a la api
    if (!acceso.conexion) {
      return acceso.status;
    } else {
      // Valido si los datos la orden que enviaron son correctos
      const result = validateOrder(req.body);

      // Si hay un error en los datos de la orden, devuelvo un error
<<<<<<< HEAD
      if (!result.success) {
=======
      if (result.error) {
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
        return res
          .status(400)
          .json({ message: "Error en los datos de la orden" });
      } else {
        const newOrder = await OrdersModel.create(result);
<<<<<<< HEAD
        if (!newOrder) {
          return res.status(500).json({ message: "Error al crear la orden" });
        }
=======
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
        res.status(201).json(newOrder);
      }
    }
  }


//metodo para actualizar parcialmente una orden
  static async updatePartial(req, res) {
    const acceso = access(req, res); // middleware para permitir el acceso a la api
    if (!acceso.conexion) {
      return acceso.status;
    } else {
      // Valido si los datos la orden que enviaron son correctos
      const orderId = parseInt(req.params.id);
      const result = validateOrderUpdate(req.body);

      if (result.error) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      // Actualizo la orden
<<<<<<< HEAD
      const updatedOrder = OrdersModel.updatePartial({ orderId, result });
=======
      const updatedOrder = OrdersModel.updatePartial({ orderId, result, res });
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      //Devuelvo la orden actualizada
      return res.status(201).json(updatedOrder);
    }
  }


//metodo para eliminar una orden
  static async delete(req, res) {
    const acceso = access(req, res); // middleware para permitir el acceso a la api
    if (!acceso.conexion) {
      return acceso.status;
    } else {
      const orderId = parseInt(req.params.id);

      // Elimino la orden
<<<<<<< HEAD
      const order = await OrdersModel.delete({ orderId });
=======
      const order = await OrdersModel.delete({ orderId, res });
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      // Si la orden se elimino correctamente, devuelvo un mensaje 204
      return res.status(204).json({ message: `Orden eliminada: ${order}` });
    }
  }
}
