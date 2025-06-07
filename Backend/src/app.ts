
//Configurar  CONEXION A LA BASE DE DATOS y otras cosas de los SERVICIOS

import express, { Application } from 'express';
import alumnoRoutes from './routes/alumno.route';
import { API_PREFIX } from './shared/constans';

const app:Application = express();
// Base de datos

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());
//Routes 

app.use(    `${API_PREFIX}/alumnos` , alumnoRoutes);
export default app;

//(backticks ``) son para interpolar variables en cadenas de texto
//En teclados en inglés (US layout): Generalmente está a la izquierda del número 1, encima de la tecla Tab.