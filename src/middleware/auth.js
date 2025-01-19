<<<<<<< HEAD


export const isAuthenticated = (req, res) => {
  console.log(req.session);
  
  const isAuthenticated = req.isAuthenticated()
  
  if (!isAuthenticated) {
    return false
  } else {
    return true
  }
=======
import { pool } from "../data/db.js";

export const isAuthenticated = async (req, res) => {
  res.set({ "content-type": "text/html; charset=utf-8" })
  const {passport} = req.session;
  if(!passport) {
      return res.status(401).json({
        username: null,
        error: true,
        message: 'Debes iniciar sesión para acceder a esta ruta'
      });

  }else{
    const {user} = passport;
    
    if(!user){

      return false

    }else{
      
      // Consultar en la base de datos si el usuario existe
      const existUser = await pool.query('SELECT * FROM users WHERE id_ = $1', [user.id_]);
        
      if(existUser.rowCount === 0){
        return false;
      }
      return

    }
  }
    
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
}