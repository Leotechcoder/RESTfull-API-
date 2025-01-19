
import { pool } from "../../data/db.js";
import { randomUUID } from "node:crypto";
import { UserAuthModel } from "../auth/m.auth.user.js";

export class UsersModel {

/*Obtener todos los usuarios*/
  static async get() {
    const result = await pool.query("SELECT * FROM public.users");
    
    if(result.rowCount === 0){
      return false
    }else{
      const users = result.rows;
  
      return users;
    }
  }

/*Obtener un usuario por su id*/
  static async getById({ userId }) {
    // const user = users.find((user) => user.id === userId);
    const user = await pool.query("SELECT FROM public.users WHERE id_ = $1", [userId]).rows[0];
    console.log(user);
    
    if (!user) {
      return false
    } else {
      return user[0];
    }
  }

/*Crear un nuevo usuario*/
  static async create(result) {
    const email = result.data.email;
    const user = await UserAuthModel.existsByEmail({ email });

    if (!user) {
      const newUser = {
        id_: randomUUID(),
        ...result.data,
        registration_date: new Date(),
      };
      const columns = Object.keys(newUser).join(", ");
      const placeholders = Object.keys(newUser)
        .map((_, index) => `$${index + 1}`)
        .join(", ");
      const values = Object.values(newUser);

      // Insertar el nuevo usuario en la base de datos
      const creado = await pool.query(
        `INSERT INTO public.users (${columns}) VALUES (${placeholders})`,
        values
      );
      console.log(creado);
      
      if(!creado){
        return false;
      }
      return newUser;
    } else {
      return false;
    }
  }

/*Actualizar un usuario*/
  static async update({ userId, result }) {
    const id = userId;
    const userUpdate = result.data;
    const columns = Object.keys(userUpdate).join(' ,');
    const values = Object.values(userUpdate).map((_, index) => `$${index + 1}`).join(', ');
    const query = `UPDATE public.users SET ${columns} = ${values} WHERE id_ = $${id}`;
    const user = await pool.query(query, [...Object.values(userUpdate), id]);
    
    console.log(user);
    
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    return user;
  }

/*Borrar un usuario*/
  static async delete({ userId }) {
    const user = await pool.query("DELETE FROM public.users WHERE id_ =$1", [userId]);
    console.log(user);
    
    if (!user) {
      return false;
    }
    return;
  }
}
