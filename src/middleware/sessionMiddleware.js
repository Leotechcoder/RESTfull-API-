import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { pool } from '../data/db.js';
import { PRODUCTION, SECRET_KEY } from '../lib/config.js';

// Inicializar el almacenamiento de sesiones usando PostgreSQL
const PgSession = connectPgSimple(session);

const sessionMiddleware = session({
  store: new PgSession({
    pool,             // Conexión existente al pool de PostgreSQL
    tableName: 'session_user', // Nombre de la tabla para almacenar sesiones
    createTableIfMissing: true // Crea automáticamente la tabla si no existe
  }),
  secret: SECRET_KEY,         // Clave secreta para firmar la cookie de sesión
  resave: false,              // No volver a guardar sesiones no modificadas
  saveUninitialized: false,   // No guardar sesiones vacías
  cookie: {
<<<<<<< HEAD
    // secure: PRODUCTION, // Activar solo en producción
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: 'strict', // Restringe el envío de cookies a solicitudes del mismo origen
    httpOnly: true,      // Evita acceso desde JavaScript del cliente
=======
    secure: PRODUCTION, // Activar solo en producción
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: 'strict', // Restringe el envío de cookies a solicitudes del mismo origen
    httpOnly: true      // Evita acceso desde JavaScript del cliente
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
  }
});

export default sessionMiddleware;

