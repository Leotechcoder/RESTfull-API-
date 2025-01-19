
import z from 'zod';

/*Defino esquema para crear */
const userSchema = z.object({
    username: z.string(),
    password_: z.string(),
    email: z.string().email(),
    phone: z.number(),
    address: z.string(),
    avatar: z.string(),
    registration_date: z.string(),
});

/*Defino esquema para actualizar */
const userSchemaUpdate = z.object({
    username: z.string(),
    password_: z.string(),
    phone: z.number(),
    phone: z.string(),
    address: z.string(),
    avatar: z.string(),
 });

// Defino la funcion para validar los datos de un usuario

export const validateUser = (user) => {
    return userSchema.safeParse(user);
};

// Defino la funcion para validar los datos de manera parcial

export const validatePartialUser = (order) => {
    return userSchema.partial().safeParse(order);
};

//Defino la funcion para validar la actualizacion del usuario

export const validateUserUpdate = (order) => {
    return userSchemaUpdate.partial().safeParse(order);
};