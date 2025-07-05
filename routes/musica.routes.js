const express = require('express');
const musicaRouter = express.Router();

const Cancion = require('../models/canciones');

// Agregar una canción
musicaRouter.route('/agregar').post(async (req, res) => {
    try {
        const totalCanciones = await Cancion.countDocuments();

        const nuevaCancion = new Cancion({
            ...req.body,
            numeroCancion: totalCanciones + 1
        });

        const data = await nuevaCancion.save();
        console.log('Canción agregada correctamente');
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al agregar la canción");
    }
});

// Obtener todas las canciones
musicaRouter.route('/canciones').get((req, res) => {
    Cancion.find()
    .then((data) => {
        console.log('Canciones obtenidas correctamente');
        res.send(data);
    })
    .catch((error) => {
        console.error(error);
    });
});

// Obtener una canción por ID
musicaRouter.route('/cancion/:id').get((req, res) => {
    Cancion.findById(req.params.id)
    .then((data) => {
        console.log('Canción obtenida correctamente');
        res.send(data);
    })
    .catch((error) => {
        console.error(error);
    });
});

// Actualizar una canción
musicaRouter.route('/actualizar/:id').put((req, res) => {
    Cancion.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((data) => {
        console.log('Canción actualizada correctamente');
        res.send(data);
    })
    .catch((error) => {
        console.error(error);
    });
});

// Eliminar una canción
musicaRouter.route('/eliminar/:id').delete((req, res) => {
    Cancion.findByIdAndDelete(req.params.id)
    .then((data) => {
        console.log('Canción eliminada correctamente');
        res.send(data);
    })
    .catch((error) => {
        console.error(error);
    });
});

module.exports = musicaRouter;
