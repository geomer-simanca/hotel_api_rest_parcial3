import { pool } from '../db.js';

// consulta de las reservas

// consulta general de usuarios
export const getreservas = async (req,res)=>{
    try {
        const [rows] = await pool.query('SELECT * FROM reservas');
        res.send(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Error al consultar las reservas',
            error: error.message
        });
    }
}

//consulta un usuario por id
export const getreserva = async (req,res)=>{
    const codigo = req.params.codigo;
    const [rows] = await pool.query('SELECT * FROM reservas WHERE codigo = ?',[codigo]);
    if (rows.length <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    
    res.send(rows[0])
}

// crear un usuario
export const createreserva = async(req,res)=>{
    const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : null;
    const {codigo_habitacion ,nombre_cliente,telefono_cliente,fecha_reservacion,fecha_entrada,fecha_salida} = req.body;

    const [rows] = await pool.query('INSERT INTO reservas (codigo_habitacion,nombre_cliente,telefono_cliente,fecha_reservacion,fecha_entrada,fecha_salida) VALUES (?,?,?,?,?,?)',[codigo_habitacion,nombre_cliente,telefono_cliente,formatDate(fecha_reservacion),formatDate(fecha_entrada), formatDate(fecha_salida)]);
    console.log(req.body);
    res.send({
        codigo: rows.codigo,
        codigo_habitacion,
        nombre_cliente,
        telefono_cliente,
        fecha_reservacion,
        fecha_entrada,
        fecha_salida
    })
}

// actualizar un usuario
export const updatereserva = async (req,res)=>{
    const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : null;
    const codigo = req.params.codigo;
    const {nombre_cliente,telefono_cliente,fecha_reservacion,fecha_entrada,fecha_salida} = req.body;
    const [result] = await pool.query('UPDATE reservas SET nombre_cliente = IFNULL(?,nombre_cliente), telefono_cliente = IFNULL(?,telefono_cliente),fecha_reservacion = IFNULL(?,fecha_reservacion),fecha_entrada = IFNULL(?,fecha_entrada),fecha_salida = IFNULL(?,fecha_salida)  WHERE codigo = ?',[
        nombre_cliente,telefono_cliente,formatDate(fecha_reservacion),formatDate(fecha_entrada), formatDate(fecha_salida), codigo
    ]);
    if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Usuario no se actualizo porque no existe'
    });
    const [rows] = await pool.query('SELECT * FROM reservas WHERE codigo = ?',[codigo]);
    res.json(rows[0]);
}

// eliminar un usuario
export const deletereserva = async (req,res)=>{
    const codigo = req.params.codigo;
    const [result] = await pool.query('DELETE  FROM reservas WHERE codigo = ?',[codigo]);
    if (result.affectedRows <= 0) return res.status(404).json({
            message: 'reserva no se elimino prque no existe'
        });
    
    res.send(204)
}