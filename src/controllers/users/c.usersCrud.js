
<<<<<<< HEAD
import { UsersModel } from "../../models/users/m.users.js"; //importo la clase Users del archivo users.js
import { access } from "../../middleware/authAccess.js";
import { validatePartialUser, validateUserUpdate } from '../../schemas/users/userSchema.js';
=======
import { UsersModel } from "../../models/m.users.js"; //importo la clase Users del archivo users.js
import { access } from "../../middleware/authAccess.js";
import { validateUser, validatePartialUser, validateUserUpdate } from '../../schemas/users/userSchema.js';
>>>>>>> baaf369 (Autenticacion manual, google y facebook)



export class UsersController {

    //metodo para obtener todos los usuarios
    static async getAll (req, res) {
        
        const acceso = access(req, res); // middleware para permitir el acceso a la api
        if(!acceso.conexion){
            return acceso.status
        }else{
            const users = await UsersModel.get(); //obtengo todos los usuarios
            if(!users){
                return res.status(404).json({
                    error: 'No se encontraron usuarios'
                })
            }
            return res.status(200).json(users);
        }
    }

    //metodo para obtener un usuario por su id
    static async getById (req, res) {
        
        const acceso = access(req, res); // middleware para permitir el acceso a la api
        if(!acceso.conexion){
            return acceso.status
        }else{
            const userId = parseInt(req.params.id);
            
<<<<<<< HEAD
            const user = await UsersModel.getById({ userId }); //obtengo el usuario por id
=======
            const user = await UsersModel.getById({userId, res}); //obtengo el usuario por id
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
            if(!user){
                return res.status(404).send('Usuario no encontrado');
            }else{
                return res.status(302).json(user);
            }
            
              
        }
    
        
    }

    //metodo para crear un nuevo usuario
    static async create (req, res) {
        
        const acceso = access(req, res); // middleware para permitir el acceso a la api
        if(!acceso.conexion){
            return acceso.status
        }else{
            const result = validatePartialUser(req.body); //valido el body de la request
            if(!result.success){

                console.log('Error en los datos del usuario');
                return res.status(400);

            }else{
        
                const newUser = await UsersModel.create(result); //creo un nuevo usuario
                if(!newUser){
                    return res.status(400).json({error: 'El usuario ya existe!'});
                }else{
                    console.log('Nuevo usuario creado correctamente!');
                    return res.status(201).json(newUser);
                }
        
            }      
            
        }
    }

    //metodo para actualizar un usuario por su id
    static async updatePartial (req, res) {

        const acceso = access(req, res); // middleware para permitir el acceso a la api
        if(!acceso.conexion){
            return acceso.status
        }else{
            const userId = parseInt(req.params.id);
            
            const result = validateUserUpdate(req.body); //valido el body de la request
            if(!result.success){

                console.log('Error en los datos del usuario');
                return res.status(400);

            }else{
            
                const updatedUser =  await UsersModel.update({userId, result}); //actualizo el usuario con el id
                if(!updatedUser){
                    return res.status(404).send('Usuario no encontrado');
                } else{
                    console.log('Datos de usuario actualizados correctamente!');
                    return res.status(214).json(updatedUser);
                }
            }
        }
    }

    //metodo para eliminar un usuario por su id
    static async delete (req, res) {
        
        const acceso = access(req, res); // middleware para permitir el acceso a la api
        if(!acceso.conexion){
            return acceso.status
        }else{
            const userId = parseInt(req.params.id);

<<<<<<< HEAD
            const eliminado = await UsersModel.delete({ userId }); //Elimino el usuario con el id
            if(!eliminado){
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
=======
            UsersModel.delete({userId, res}); //Elimino el usuario con el id
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
            res.end().json('Usuario eliminado correctamente!');
        }
    }


}