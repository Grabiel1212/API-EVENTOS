
//Configurar  CONEXION A LA BASE DE DATOS y otras cosas de los SERVICIOS
import express, { Application } from 'express';
import usuarioRoutes from './routes/usuario.route';
import { API_PREFIX } from './shared/constans';

const app: Application = express();

// Middleware para parsear JSON
app.use(express.json());

// Registrar rutas con prefijo /api/v1 o similar
app.use(`${API_PREFIX}/usuarios`, usuarioRoutes);

export default app;

//(backticks ``) son para interpolar variables en cadenas de texto
//En teclados en inglés (US layout): Generalmente está a la izquierda del número 1, encima de la tecla Tab.