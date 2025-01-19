import crypto from 'crypto';

import { pool } from '../../data/db.js';
import bcrypt from 'bcrypt';

export class UserAuthModel {

/*Registro de usuario */
    static async register ({username, email, password}){
        //Validar los datos de entrada
            
        Validation.validateUsername(username);
        Validation.validateEmail(email);
        Validation.validatePassword(password);
        
        console.log(email);
        //Asegurarse que el email no tiene usuario..ARREGLAR ESTA PARTE!!
            const Email = await UserAuthModel.existsByEmail({email})
            
        if(Email){
            console.log('El email ya está en uso')
            return false
        }

        //Crear el usuario
        const id = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(password, 10); //Encriptar la contraseña 
        const newUser = {
            _id: id,
            username,
            email,
            password: hashedPassword
        }
        const columns = ['id_', 'username', 'email', 'password_'];
        const values = [newUser._id, newUser.username, newUser.email, newUser.password];

        // Filtra los valores válidos y sus correspondientes columnas
        const filteredValues = values.map(value => value ?? null);

        const placeholders = filteredValues.map((_, index) => `$${index + 1}`).join(', ');

        const insertQuery = `INSERT INTO users (${columns.join(', ')}) VALUES (${placeholders})`;

        try {
            const insertResult = await pool.query(insertQuery, filteredValues);
            console.log(insertResult);
        } catch (error) {
            console.error('Error inserting user:', error);
        }

        return id
    }

/*Login de usuario */
    static async login ({email, password, req, res}){
        //Validar los datos de entrada
        
        Validation.validateUsername(email);
        Validation.validatePassword(password);
        
        //Buscar el usuario en la base de datos
        const user = await UserAuthModel.existsByEmail({email})
        if(!user){
            return false
     }
            
        //Comprobar la contraseña
        const match = await bcrypt.compare(password, user.password_);
        if(!match){
            console.log('Contraseña incorrecta')
            return false
        }
            
        // Guardar la sesión del usuario
         req.session.passport = {user};

        // Respuesta exitosa
        return user.username;

    }
            
/*Verificar si el usuario está autenticado */
    static async existsByEmail({email}){
        //Buscar el usuario en la base de datos
        console.log('acaa');
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        const {rowCount} = result;

        if(rowCount===0){
            return false
        }
        return result.rows[0];
        
    }
 
}


/*Validaciones basicas */
class Validation {
    static validateUsername(username){
        if(username < 3 || typeof username != 'string'){
            throw new Error('El nombre de usuario debe tener al menos 3 caracteres')
        }
    }

    static validateEmail(email){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(email)){
            throw new Error('El email no es válido')
        }
    }
    static validatePassword(password){
        if(password.length < 8 || typeof password != 'string'){
            throw new Error('La contraseña debe tener al menos 8 caracteres')
        }
    }
    
}