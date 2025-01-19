import { pool } from "../data/db.js";
import { orders } from "../data/dl.orders.js";
import { randomUUID } from "node:crypto";

export class OrdersModel {
  
/*Obtener todas las ordenes*/
  static async get() {
    const { rows } = await pool.query("SELECT * FROM public.orders");
    if(rows === 0){
      return false
    }
    const orders = rows[0];
    return orders;
  }

/*Obtener una orden por su id*/
  static async getById({ orderId, res }) {
    const { rows } = 
      await pool.query(
        "SELECT * FROM public.orders WHERE id_ = $1",
        [orderId]
      )
    if(rows === 0){
      return false
    }
    const order = rows[0];
    return order;
  }

/*Crear una orden*/
  static async create(result) {
  
      const newOrder = {
        id_: randomUUID(),
        ...result.data,
      };
      const columns = Object.keys(newOrder).join(", ");
      const placeholders = Object.keys(newOrder)
        .map((_, index) => `$${index + 1}`)
        .join(", ");
      const values = Object.values(newOrder);

      // Insertar el nuevo usuario en la base de datos
      const order = await pool.query(
        `INSERT INTO public.orders (${columns}) VALUES (${placeholders})`,
        values
      );
      console.log(order);
      
      return newOrder;
  }

/*Actualizar parcialmente una orden*/
  static async updatePartial({ orderId, result, res }) {
    const id = orderId;
    const orderUpdate = result.data;
    const columns = Object.keys(orderUpdate).join(' ,');
    const values = Object.values(orderUpdate).map((_, index) => `$${index + 1}`).join(', ');
    const query = `UPDATE orders SET ${columns} = ${values} WHERE id_ = $${id}`;
    const order = await pool.query(query, [...Object.values(orderUpdate), id]);
    
    console.log(order);
    
    // if (!order) {
    //   return false
    // }
    // return order;
  }

/*Eliminar una orden*/
  static async delete({ orderId, res }) {
    const order = await pool.query("DELETE FROM orders WHERE id_=$1", [orderId]);

    if (!order) {
      return false;
    }
    return order;
  }

}
