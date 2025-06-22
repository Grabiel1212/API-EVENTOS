import express, { Application } from "express";
import Env from './config/env';
import UsuarioRoutes from './router/usuario.routes';



export class App {

 public app : Application; // instanciamos el exprees


 // inicializamos la Clase App
 constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
 }

 // Registra los middlewares necesarios para la aplicación.
 private middlewares () : void {
     this.app.use(express.json());
 }

 //Registra los middlewares necesarios para la aplicación.
 private routes() : void {
  this.app.use(`${Env.API_PREFIX}/user` , UsuarioRoutes);// para usuarios
  
 
 }


 //esto nos ayudara a instaciar nuestar clase App e inicilizar en otros TS
 public getApp() :Application {
    return this.app;
 }


}


export default App;