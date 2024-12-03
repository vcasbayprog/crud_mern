const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: String,
    email: String,
    telefono: String,
    idusuario: String
});

const ModeloUsuario = mongoose.model('usuarios', usuarioSchema);
module.exports = router;

//Agregar usuario
router.post('/agregarusuario', async (req, res) => {
    try {
        const nuevoUsuario = new ModeloUsuario({
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono,
            idusuario: req.body.idusuario
        });

        await nuevoUsuario.save(); // Usamos async/await en lugar de un callback
        res.send('Usuario agregado correctamente');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//Obtener todos los usuarios
router.get('/obtenerusuarios', async (req, res) => {
    try {
        const usuarios = await ModeloUsuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//Obtener data de los usuarios 
router.post('/obtenerdatausuario', async (req, res) => {
    try {
        const usuarios = await ModeloUsuario.find({}, { nombre: 1, email: 1, telefono: 1, idusuario: 1, _id: 0 });
        res.json(usuarios);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//Actualizar usuario
router.post('/actualizausuario', async (req, res) => {
    try {
        const usuarioActualizado = await ModeloUsuario.findOneAndUpdate(
            { idusuario: req.body.idusuario }, // Filtro para encontrar el usuario
            {
                nombre: req.body.nombre,
                email: req.body.email,
                telefono: req.body.telefono
            },
            { new: true } // Esta opción devuelve el documento actualizado
        );

        if (usuarioActualizado) {
            res.send('Usuario actualizado correctamente');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Borrar usuario
router.post('/borrarusuario', async (req, res) => {
    try {
        const usuarioEliminado = await ModeloUsuario.findOneAndDelete({ idusuario: req.body.idusuario });

        if (usuarioEliminado) {
            res.send('Usuario eliminado correctamente');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});






