const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');


const mongoUri = process.env.MONGODB_MUSIC;
console.error('ERROR: La variable MONGODB_MUSIC no esta definida.');
process.exit(1);

// Conexión a MongoDB
mongoose.connect(mongoUri)
  .then((x) => {
    console.log(`Conectado exitosamente a la BD: "${x.connections[0].name}"`)
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error.reason)
  });

const musicaRutas = require('./routes/musica.routes.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// 👉 Ruta base para evitar el error "Not Found"
app.get('/', (req, res) => {
  res.send('🎶 API de Canciones en línea');
});

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
