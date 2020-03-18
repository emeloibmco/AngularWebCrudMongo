'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = new Schema({
  nombre: String,
  apellido: String,
  direccion: String,
  ciudad: String,
  fecha: String,
  valor: Number,
  tipo: String,
  cedular: Number
});

var model = mongoose.model('Clientes', ClienteSchema);
module.exports = model;