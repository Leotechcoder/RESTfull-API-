//En este archivo validamos los datos de las ordenes para que cumplan con el esquema definido en el archivo orders.js

//Aca importamos zod para validar los datos de las ordenes
import z from "zod";

/*Aca definimos el esquema que deben cumplir las ordenes para ser validadas*/
const orderSchema = z.object({
<<<<<<< HEAD
  user_id: z.string(),
  items_id: z.string(),
  total_amount: z.number(),
  status: z.string()
=======
  userId: z.number().int(),
  items: z.array(
    z.object({
      productId: z.number().int(),
      quantity: z.number().int(),
    })
  ),
  totalAmount: z.number(),
  status: z.string(),
  orderDate: z.string({
    message: "orderDate is required",
    required_error: "orderDate is required",
    format: {
      type: "date",
      message: "orderDate must be a valid date",
    },
  }),
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
});

/*Esquema para validar actualizacion de orden */
const orderSchemaUpdate = z.object({
<<<<<<< HEAD
  items: z.string(),
  totalAmount: z.number(),
  status: z.string()
=======
  items: z.array(
    z.object({
      productId: z.number().int(),
      quantity: z.number().int(),
    })
  ),
  totalAmount: z.number(),
  status: z.string(),
  orderDate: z.string({
    message: "orderDate is required",
    required_error: "orderDate is required",
    format: {
      type: "date",
      message: "orderDate must be a valid date",
    },
  }),
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
});
//Aca exportamos las funciones para validar las ordenes
export const validateOrder = (order) => {
  return orderSchema.safeParse(order);
};

//Aca exportamos las funciones para validar datos parciales (e.g: status y orderDate)
export const validatePartialOrder = (order) => {
  return orderSchema.partial().safeParse(order);
};

//Aca exportamos las funciones para validar la actualización de la orden

export const validateOrderUpdate = (order) => {
  return orderSchemaUpdate.partial().safeParse(order);
};