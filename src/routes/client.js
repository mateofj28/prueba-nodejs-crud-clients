const express = require('express');
const Client = require('../models/client');
const router = express.Router();

// Crear un cliente (Create)
router.post('/', async (req, res) => {
  try {
    const cliente = new Client(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el cliente', error });
  }
});

// Obtener todos los clientes (Read)
router.get('/', async (req, res) => {
  try {
    const clientes = await Client.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los clientes', error });
  }
});

// Obtener un cliente por ID (Read)
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Client.findById(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el cliente', error });
  }
});

// Actualizar un cliente (Update)
router.put('/:id', async (req, res) => {
  try {
    const cliente = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el cliente', error });
  }
});

// Eliminar un cliente (Delete)
router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Client.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el cliente', error });
  }
});

module.exports = router;
