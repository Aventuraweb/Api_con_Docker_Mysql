import express from 'express';
import helmet from 'helmet';
import Cors from "cors";
import session from 'express-session';
import dotenv from 'dotenv';
import limiter from './server/Routes/limit.js';
import Router from "./server/Routes/routes.js"; 


dotenv.config();

const app = express();

// Seguridad HTTP
app.use(helmet());

// Configuración de CORS
app.use(Cors()); 

// Parseo de JSON
app.use(express.json());

// Limitar las solicitudes
app.use(limiter);

// Configurar sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecret', 
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Usar las rutas de usuarios
app.use('/', Router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
