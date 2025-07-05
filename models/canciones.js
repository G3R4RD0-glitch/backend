const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Cancion = new Schema({
  numeroCancion: { type: Number, required: true, unique: true }, 
  titulo: { type: String, required: true },
  artista: { type: String, required: true },
  album: { type: String, required: true },
  duracion: { type: String, required: true },
  genero: { type: String, required: true } 
});

module.exports = mongoose.model('Cancion', Cancion);






