const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente.js');

router.post('/', async (req, res) => {
  const cliente = await Cliente.create(req.body);
  res.status(201).json(cliente);
});

router.get('/', async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
});

router.get('/:id', async (req, res) => {
  const cliente = await Cliente.findById(req.params.id);
  if (!cliente) return res.status(404).send("Cliente não encontrado");
  res.json(cliente);
});

router.get('/buscar/:q', async (req, res) => {
  const regex = new RegExp(req.params.q, 'i');
  const clientes = await Cliente.find({
    $or: [{ nome: regex }, { email: regex }]
  });
  res.json(clientes);
});

router.put('/:id', async (req, res) => {
  const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(cliente);
});

router.delete('/:id', async (req, res) => {
  await Cliente.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
