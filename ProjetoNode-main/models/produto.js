const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
  nomeProduto: { type: String, required: true },
  descricao: String,
  preco: { type: Number, required: true },
  estoque: { type: Number, default: 0 },
  imagens: [String],
  ativo: { type: Boolean, default: true },
  destaque: { type: Boolean, default: false },
  categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }
});

module.exports = mongoose.model('Produto', ProdutoSchema);
