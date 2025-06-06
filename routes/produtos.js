const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto.js');


router.post('/', async (req, res) => {
  const produto = await Produto.create(req.body);
  res.status(201).json(produto);
});

router.get('/', async (req, res) => {
  const produtos = await Produto.find().populate('categoriaId');
  res.json(produtos);
});

router.get('/:id', async (req, res) => {
  const produto = await Produto.findById(req.params.id).populate('categoriaId');
  if (!produto) return res.status(404).send("Produto não encontrado");
  res.json(produto);
});

router.get('/buscar/:q', async (req, res) => {
  const regex = new RegExp(req.params.q, 'i');
  const produtos = await Produto.find({
    $or: [{ nome: regex }, { descricao: regex }]
  }).populate('categoriaId');
  res.json(produtos);
});

router.put('/:id', async (req, res) => {
  const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(produto);
});

router.delete('/:id', async (req, res) => {
  await Produto.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
