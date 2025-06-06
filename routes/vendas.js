const express = require('express');
const router = express.Router();
const Venda = require('../models/Venda.js');

router.post('/', async (req, res) => {
  const venda = await Venda.create(req.body);
  res.status(201).json(venda);
});

router.get('/', async (req, res) => {
  const vendas = await Venda.find()
    .populate('clienteId')
    .populate('produtos.produtoId');
  res.json(vendas);
});

router.get('/:id', async (req, res) => {
  const venda = await Venda.findById(req.params.id)
    .populate('clienteId')
    .populate('produtos.produtoId');
  if (!venda) return res.status(404).send("Venda não encontrada");
  res.json(venda);
});

router.get('/buscar/:q', async (req, res) => {
  const regex = new RegExp(req.params.q, 'i');
  const vendas = await Venda.find()
    .populate({
      path: 'clienteId',
      match: { nome: regex }
    })
    .populate('produtos.produtoId');

  const filtradas = vendas.filter(v => v.clienteId != null);
  res.json(filtradas);
});

router.put('/:id', async (req, res) => {
  const venda = await Venda.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(venda);
});

router.delete('/:id', async (req, res) => {
  await Venda.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
