import { UserAuthModel } from "../../models/auth/m.auth.user.js";
import { LOGIN_URL} from "../../lib/config.js";
<<<<<<< HEAD
import { isAuthenticated } from "../../middleware/auth.js";
=======
>>>>>>> baaf369 (Autenticacion manual, google y facebook)

export class UserAuthController {

/*Register user */
    static async register(req, res) {
        const {username, email, password} = req.body
        console.log(req.body);
            
        try {
            const id = await UserAuthModel.register({username, email, password})
            if(!id){
                return res.status(400).json({error: 'Ya existe un usuario con ese email!'});
            }
            return res.status(201).json({id})
        } catch (error) {
            res.status(400).send('error.message')
        }
    }


/*Login user */
     static async login(req, res) {
        const {email, password} = req.body
        try {
                
            //Valido al usuario y lo busco en la base de datos
            const user = await UserAuthModel.login({email, password, req, res})          
                
            if(!user){
                return res.status(400).json({error: 'El usuario no existe'});
            }else{
                res.json({
                    message: 'Login correcto',
                    user
                })
            }
                
                    
        } catch (error) {
            res.status(500).send('Usuario o contraseña incorrectos')
        }
    }

/*Logout */
    static async logout(req, res) {
        req.logout(async (err) => {
            if (err) {
            return res.status(404).json({message: 'error al cargar'})
            }else{
                    
<<<<<<< HEAD
                // await UserAuthModel.clear(req, res)
=======
                await UserAuthModel.clear(req, res)
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
                res.redirect(LOGIN_URL)
            }
        });
    }

/*Verificacion de usuario logueado */
<<<<<<< HEAD
    static async authUser(req, res) {
        const authenticated = isAuthenticated(req, res)
        
        if(!authenticated) {
            return res.status(401).json({
                username: 'invitado',
=======
    static async getUserAuth(req, res) {
        res.set({ "content-type": "text/html; charset=utf-8" })
        const {passport} = req.session;
        console.log(req);
        
        if(!passport) {
            return res.status(401).json({
                username: null,
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
                error: true,
                message: 'Debes iniciar sesión para acceder a esta ruta'
            });

        }else{
<<<<<<< HEAD
            
            const {user} = req.session.passport
                
            if(!user){
                return res.status(401).json({
                    username: 'invitado',
                    error: true,
                    message: 'Debes iniciar sesión para acceder a esta ruta'
=======

            const {user} = req.session.passport;
                
            if(!user){
                return res.status(401).json({
                    username: null,
                    error: true,
                        message: 'Debes iniciar sesión para acceder a esta ruta'
>>>>>>> baaf369 (Autenticacion manual, google y facebook)
                });

            }else{
                //Si no hay error devuelve el nombre del usuario logueado
                res.status(200).json({
                    username: user.username,
                    error: false, 
                    message: 'Usuario autorizado'
                })
            }
        }
    }



}