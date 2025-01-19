//Aca voy a crear el backend de mi servidor importando express y creando una instancia de express

import express from 'express';
import cors from 'cors'
import passport from 'passport';
import morgan from 'morgan';
import helmet from 'helmet'

//Importo las rutas de login, usuarios y orders
import { routerUserAuth } from './routes/auth/r.auth.js';
import { routerUsers } from './routes/users/r.users.js';
import { routerOrders } from './routes/orders/r.orders.js';
import { routerProducts } from './routes/products/r.products.js';
import { authGoogle } from './routes/auth/r.authGoogle.js';
import { authFacebook } from './routes/auth/r.authFacebook.js';

import { PORT } from './lib/config.js';
import { ACCEPTED_ORIGINS } from './lib/access.js';//Origenes permitidos
import sessionMiddleware from './middleware/sessionMiddleware.js';

import { AuthGoogle } from './controllers/auth/c.passportGoogle.js';
import { AuthFacebook } from './controllers/auth/c.passportFacebook.js';

const app = express();//Creo una instancia de express
app.use(express.json()); //middleware para poder leer el body de las peticiones
app.use(express.urlencoded({extended: true}));//true para trabajar con sesiones
app.disable( 'x-powered-by' ); // Ocultar la cabecera de express

app.use(
  cors({
    origin: ACCEPTED_ORIGINS, //Puedes cambiar esto para permitir solo una IP o un dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, //Esto habilita las cookies para las peticiones CORS
    preflightContinue: true, //Esto permite que el navegador permita la petición CORS
    optionsSuccessStatus: 200  //Si preflightContinue es true, esta cabecera se establece en 200
  })
);
app.use(helmet())
app.use(morgan("dev"))

//Sessiones
  app.use(sessionMiddleware);

//Middleware para passport
  app.use(passport.initialize());
  app.use(passport.session());


 

//Rutas para registrarse e iniciar sesion

  app.use(
    cors({
      origin: ACCEPTED_ORIGINS, //Puedes cambiar esto para permitir solo una IP o un dominio
      methods: ['GET', 'POST'],
      credentials: true, //Esto habilita las cookies para las peticiones CORS
      preflightContinue: true, //Esto permite que el navegador permita la petición CORS
      optionsSuccessStatus: 200  //Si preflightContinue es true, esta cabecera se establece en 200
    }), 
    routerUserAuth
  );

//Sessiones
  app.use(sessionMiddleware);

//Middleware para passport
  app.use(passport.initialize());
  app.use(passport.session());

//Middleware de CORS
  app.use(
    cors({
      origin: ACCEPTED_ORIGINS, //Puedes cambiar esto para permitir solo una IP o un dominio
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true, //Esto habilita las cookies para las peticiones CORS
      preflightContinue: true, //Esto permite que el navegador permita la petición CORS
      optionsSuccessStatus: 200  //Si preflightContinue es true, esta cabecera se establece en 200
    })
  );

  app.use(helmet())
  app.use(morgan("dev"))
 

//Rutas para registrarse e iniciar sesion

  app.use(
    cors({
      origin: ACCEPTED_ORIGINS, //Puedes cambiar esto para permitir solo una IP o un dominio
      methods: ['GET', 'POST'],
      credentials: true, //Esto habilita las cookies para las peticiones CORS
      preflightContinue: true, //Esto permite que el navegador permita la petición CORS
      optionsSuccessStatus: 200  //Si preflightContinue es true, esta cabecera se establece en 200
    }), 
    routerUserAuth
  );


//Configuracion autenticacion google
  AuthGoogle.passportSetup()
  app.use(authGoogle); //Rutas de autenticacion de usuario google

//Configuracion autenticacion facebook
  AuthFacebook.passportSetup()
  app.use(authFacebook); //Rutas de autenticacion de usuario facebook


//Rutas para crear, obtener y modificar ordenes
  app.use(routerOrders);
  
//Rutas para crear, obtener y modificar informacion sobre usuarios
  app.use(routerUsers);
  
//Middleware para habilitar CORS para el path /users/:id
  app.options('/users/:id', cors());//CORS para PUT, DELETE Y OPTIONS

//Rutas para crear, obtener y modificar productos
  app.use(routerProducts)
  
//Rutas para crear, obtener y modificar ordenes
  app.use(routerOrders);


//Middleware para habilitar CORS para el path /users/:id
  app.options('/users/:id', cors());//CORS para PUT, DELETE Y OPTIONS


//Arrancar el server

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
  });