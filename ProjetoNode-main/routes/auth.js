const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  const existe = await User.findOne({ email });
  if (existe) return res.status(400).send("Usuário já existe");
  const novo = new User({ nome, email, senha });
  await novo.save();
  res.status(201).send("Usuário registrado");
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email, senha });
  if (!user) return res.status(401).send("Login inválido");
  res.json({ message: "Login bem-sucedido", usuario: user });
});

module.exports = router;
