import { Router } from "express";
import { gethabitaciones,createhabitacion,updatehabitacion,deletehabitacion,gethabitacion } from "../controllers/habitaciones.controller.js";
const router = Router();

router.get('/rooms',gethabitaciones)
router.get('/rooms/:codigo',gethabitacion)

router.post('/rooms',createhabitacion)

router.put('/rooms/:codigo',updatehabitacion)

router.delete('/rooms/:codigo',deletehabitacion)

export default router;