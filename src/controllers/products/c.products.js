import { access } from "../../middleware/authAccess.js";
import { ProductsModel } from "../../models/products/m.products.js";
import { validateProduct, validateProductUpdate } from "../../schemas/products/productSchema.js";


export class ProductsController {
    
    /*Obtengo todos los productos */
    static async getAll (req, res){
        const acceso = access(req, res); // middleware para permitir el acceso a la api
        if(!acceso.conexion){
            return acceso.status
        }else{
            const products = await ProductsModel.getAll(); //obtengo todos los productos
            if(!products){
                return res.status(404).json({message: 'No se encontraron productos'})
            }
            return res.status(200).json(products);
        }
    }
    
    /*Obtengo un producto por id */
    static async getById (req, res){
        const acceso = access(req, res); // middleware para permitir el acceso a la api
        if(!acceso.conexion){
            return acceso.status
        }else{
            const productId = parseInt(req.params.id);
            
            const product = await ProductsModel.getById({ productId }); //obtengo el producto por id
            if(!product){
                return res.status(404).json({message: 'Producto no encontrado'})
            }
            return res.status(200).json(product);
        }
    }
    
    /*Creo un nuevo producto */
    static async create (req, res){
        const acceso = access(req, res); // middleware para permitir el acceso a la api
        if(!acceso.conexion){
            return acceso.status
        }else{
            const result = validateProduct(req.body);
            if(!result.success){
                return res.status(400).json(result.errors)
            }

            const newProduct = await ProductsModel.create( result ); //creo un nuevo producto
            if(!newProduct){
                return res.status(500).json({message: 'Error al crear el producto'})
            }
            return res.status(201).json(newProduct);
        }
    }
    
    /*Actualizo un producto */
    static async update (req, res){
        const acceso = access(req, res); // middleware para permitir el acceso a la api
        if(!acceso.conexion){
            return acceso.status
        }else{
            const result = validateProductUpdate(req.body);
            if(!result.success){
                return res.status(400).json(result.errors)
            }
            const productId = parseInt(req.params.id);
            
            const product = await ProductsModel.updatePartial({productId, result, res}); //actualizo el producto
            if(!product){
                return res.status(404).json({message: 'Producto no encontrado'})
            }
            return res.status(200).json(product);
        }
    }
    
    /*Elimino un producto */
    static async delete (req, res){
        const acceso = access(req, res); // middleware para permitir el acceso a la api
        if(!acceso.conexion){
            return acceso.status
        }else{
            const productId = parseInt(req.params.id);
            
            const product = await ProductsModel.delete({productId, res}); //elimino el producto
            if(!product){
                return res.status(404).json({message: 'Producto no encontrado'})
            }
            return res.status(204).send();
        }
    }

}