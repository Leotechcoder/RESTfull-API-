import { pool } from "../../data/db.js";
import { randomUUID } from "node:crypto";

export class ProductsModel {
    /*Obtener todos los productos*/
    static async getAll() {
        const { rows } = await pool.query("SELECT * FROM public.products");
        console.log(rows);
        
        if(rows === 0){
            return false
        }
        const products = rows[0];
        return products;
    }
    /*Obtener un producto por su id*/
    static async getById({ productId }) {
        const { rows } = await pool.query(
            "SELECT * FROM public.products WHERE id_ = $1",
            [productId]
        );
        console.log(rows);
        
        if(rows === 0){
            return false
        }
        const product = rows[0];
        return product;
    }
    /*Crear un producto*/
    static async create( result ) {
        const newProduct = {
            id_: randomUUID(),
            ...result.data,
            created_at: new Date(),
            updated_at: new Date(),
        };
        const columns = Object.keys(newProduct).join(", ");
        const placeholders = Object.keys(newProduct)
        .map((_, index) => `$${index + 1}`)
        .join(", ");
        const values = Object.values(newProduct);

        // Insertar el nuevo producto en la base de datos
        const creado = await pool.query(
            `INSERT INTO public.products (${columns}) VALUES (${placeholders})`,
            values
        );
        console.log(creado);
        
        if(!creado){
            return false;
        }
        return newProduct;
        
    }
    /*Actualizar un producto*/
    static async updatePartial({ productId, result }) {
        
        const productUpdate = result.data;
        const columns = Object.keys(productUpdate).join(' ,');
        const values = Object.values(productUpdate).map((_, index) => `$${index + 1}`).join(', ');
        const query = `UPDATE public.products SET ${columns} = ${values} WHERE id_ = $${productId}`;

        const update = await pool.query(query, [...Object.values(productUpdate), productId]);
        console.log(update);
        
        if(!update){
            return false;
        }
        
        return productUpdate;
    }
    /*Borrar un producto*/
    static async delete({ productId, res }) {
        const query = "DELETE FROM public.products WHERE id_ = $1";
        const borrar = await pool.query(query, [productId]);
        console.log(borrar);
        
        if(!borrar){
            return false;
        }
        
        return true;
    }

}