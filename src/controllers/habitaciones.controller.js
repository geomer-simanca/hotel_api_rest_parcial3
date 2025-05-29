import { pool } from '../db.js';

// consulta de las reservas

// consulta general de usuarios
export const gethabitaciones = async (req,res)=>{
    try {
        const [rows] = await pool.query('SELECT * FROM habitaciones');
        res.send(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Error al consultar las reservas',
            error: error.message
        });
    }
}

//consulta un usuario por id
export const gethabitacion = async (req,res)=>{
    const codigo = req.params.codigo;
    const [rows] = await pool.query('SELECT * FROM habitaciones WHERE codigo = ?',[codigo]);
    if (rows.length <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    
    res.send(rows[0])
}

// crear un usuario
export const createhabitacion = async(req,res)=>{
    const {numero ,tipo,valor} = req.body;

    const [rows] = await pool.query('INSERT INTO habitaciones (numero ,tipo,valor) VALUES (?,?,?)',[numero ,tipo,valor]);
    console.log(req.body);
    res.send({
        codigo: rows.codigo,
        numero,
        tipo,
        valor
    })
}

// actualizar un usuario
export const updatehabitacion = async (req,res)=>{
    const codigo = req.params.codigo;
    const {numero ,tipo,valor} = req.body;
    const [result] = await pool.query('UPDATE habitaciones SET numero = IFNULL(?,numero), tipo = IFNULL(?,tipo),valor = IFNULL(?,valor)  WHERE codigo = ?',[
        numero ,tipo,valor, codigo
    ]);
    if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Usuario no se actualizo porque no existe'
    });
    const [rows] = await pool.query('SELECT * FROM reservas WHERE codigo = ?',[codigo]);
    res.json(rows[0]);
}

// eliminar un usuario
export const deletehabitacion = async (req,res)=>{
    const codigo = req.params.codigo;
    const [result] = await pool.query('DELETE  FROM habitaciones WHERE codigo = ?',[codigo]);
    if (result.affectedRows <= 0) return res.status(404).json({
            message: 'reserva no se elimino prque no existe'
        });
    
    res.send(204)
}