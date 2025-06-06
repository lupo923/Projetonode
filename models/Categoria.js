const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  nomeCategoria: { type: String, required: true },
  descricao: String,
  icone: String,
  prioridade: { type: Number, default: 1 },
  ativa: { type: Boolean, default: true }
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
