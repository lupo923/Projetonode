const mongoose = require('mongoose');

const VendaSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  itensVendidos: [{
    produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
    quantidade: Number,
    precoUnitario: Number
  }],
  total: Number,
  desconto: { type: Number, default: 0 },
  formaPagamento: { type: String, enum: ['dinheiro', 'cartao', 'pix', 'boleto'], default: 'dinheiro' },
  status: { type: String, enum: ['pendente', 'pago', 'cancelado'], default: 'pendente' },
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Venda', VendaSchema);
