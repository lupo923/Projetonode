const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria.js');


router.post('/', async (req, res) => {
  const categoria = await Categoria.create(req.body);
  res.status(201).json(categoria);
});

router.get('/', async (req, res) => {
  const categorias = await Categoria.find();
  res.json(categorias);
});

router.get('/:id', async (req, res) => {
  const categoria = await Categoria.findById(req.params.id);
  if (!categoria) return res.status(404).send("Não encontrada");
  res.json(categoria);
});

router.get('/buscar/:q', async (req, res) => {
  const regex = new RegExp(req.params.q, 'i');
  const categorias = await Categoria.find({
    $or: [{ nome: regex }, { descricao: regex }]
  });
  res.json(categorias);
});

router.put('/:id', async (req, res) => {
  const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(categoria);
});

router.delete('/:id', async (req, res) => {
  await Categoria.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
