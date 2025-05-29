import { Router } from "express";
import { getreservas,createreserva,updatereserva,deletereserva,getreserva } from "../controllers/usuarios.controller.js";
const router = Router();

router.get('/reservas',getreservas)
router.get('/reservas/:codigo',getreserva)

router.post('/reservas',createreserva)

router.put('/reservas/:codigo',updatereserva)

router.delete('/reservas/:codigo',deletereserva)

export default router;