const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nomeCompleto: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  senha: { type: String, required: true },
  telefone: String,
  endereco: {
    rua: String,
    numero: String,
    cidade: String,
    estado: String,
    cep: String
  },
  ativo: { type: Boolean, default: true },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
