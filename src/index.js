import app from './app.js'; // Asegúrate de que la ruta sea correcta
import { PORT } from './config.js'; // Asegúrate de que la ruta sea correcta

app.listen(PORT,()=>{
    console.log(`servidor escuchando en http://localhost:${PORT}`);

})