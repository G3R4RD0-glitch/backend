const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  
const bodyParser = require('body-parser');  
const createError = require('http-errors'); 

// Conexión a MongoDB
mongoose.connect('mongodb+srv://gerardoaati22:D0n0hMDPFUNkptPz@cluster0.fj5zru8.mongodb.net/canciones01?retryWrites=true&w=majority&appName=Cluster0')
.then((x) => {
    console.log(`Conectado exitosamente a la BD: "${x.connections[0].name}"`)
})
.catch((error) => {
    console.error('Error al conectar a la base de datos:', error.reason)
});

// Configuración del servidor
const musicaRutas = require('./routes/musica.routes.js');
const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(cors());

app.use('/api', musicaRutas);

// Puerto
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ' + port);
});

// Manejador de error 404
app.use((req, res, next) => {
    next(createError(404));
});

// Manejador de errores generales
app.use((err, req, res, next) => {
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
