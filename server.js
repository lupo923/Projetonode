const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

// Configurar variáveis de ambiente
dotenv.config();

// Middleware para JSON
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Conectado"))
  .catch(err => console.error("Erro ao conectar", err));

// Rotas
const authRoutes = require('./routes/auth');
const categoriaRoutes = require('./routes/categorias');
const produtoRoutes = require('./routes/produtos');
const clienteRoutes = require('./routes/clientes');
const vendaRoutes = require('./routes/vendas');

app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/vendas', vendaRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando`);
});
