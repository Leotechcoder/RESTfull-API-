import z from 'zod';

// Definimos un esquema para los productos

const productSchema = z.object({
    name_: z.string(),
    description: z.string(),
    price: z.number(),
    image: z.string(),
    category: z.string(),
    stock: z.number(),
    available: z.boolean(),
    state: z.string()
});

const productSchemaUpdate = z.object({
    name_: z.string(),
    description: z.string(),
    price: z.number(),
    image_url: z.string(),
    category: z.string(),
    stock: z.number(),
    available: z.boolean(),
    state: z.string()
});

// Definimos la función para validar un producto

export const validateProduct = (product) => {
    return productSchema.safeParse(product);
};

// Definimos la función para validar un producto para actualizar 

export const validateProductUpdate = (product) => {
    return productSchemaUpdate.partial().safeParse(product);
};