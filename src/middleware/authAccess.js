import { ACCEPTED_ORIGINS } from "../lib/access.js";
import { isAuthenticated } from "./auth.js";



export const access = (req, res) => {
  const origin = req.header('origin'); // Obtener el origen de la solicitud
  
  
  // Verificar si el origen está en la lista de aceptados
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin); // Permitir el origen
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Headers permitidos
    res.header('Access-Control-Allow-Credentials', 'true'); // Permitir credenciales (si es necesario)
    
    console.log(`Se esta accediendo desde el origen: ${origin}`);
    
    isAuthenticated(req, res);
    if(!isAuthenticated){
      return {
        conexion: false,
        status: res.status(401).json({message: 'Debes iniciar sesión para acceder a esta ruta'})
      }
    }

    
    if(req.method === 'OPTIONS'){

      // Manejo de solicitudes preflight (OPTIONS)
      return {
        conexion: true,
        status: 204
      } // Respuesta exitosa para solicitudes preflight

    }else{
      return {
        conexion: true,
        status: 200
      }

    }

  }else {

    // Si el origen no está permitido, bloquear la solicitud
    console.log(`Origin no permitido desde donde se quiere acceder: ${origin}`);
    return {
      conexion: false,
      status: res.status(403).send('CORS: Origin not allowed')
    }
  }
  

}
