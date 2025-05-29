import express from 'express';
// import {pool} from './db.js'; // Asegúrate de que la ruta sea correcta
import usuariosRoutes from './routes/usuarios.routes.js'; // Asegúrate de que la ruta sea correcta
import habitacionesRoutes from './routes/habitaciones.routes.js'; // Asegúrate de que la ruta sea correcta
import indexRoutes from './routes/index.routes.js'; // Asegúrate de que la ruta sea correcta
// import {PORT} from './config.js'; // Asegúrate de que la ruta sea correcta

const app = express();
// const port = 3001;

//middleware
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON
app.use('/api',usuariosRoutes)
app.use('/api',habitacionesRoutes)
app.use(indexRoutes);




//routes


// motodos GET
app.get('/',(req,res)=>{
    res.send('hola desde express')
})


export default app;
// usuarios


// escuchador