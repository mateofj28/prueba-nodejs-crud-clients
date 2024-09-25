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

// Get all clients or filter by email
router.get('/', async (req, res) => {
  const { email } = req.query;  // Get the query parameter 'email' if provided

  try {
    let clients;

    if (email) {
      // If the email is in the query params, filter by email
      clients = await Client.find({ email: new RegExp(email, 'i') });
    } else {
      // If no email is provided, return all clients
      clients = await Client.find();
    }

    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving clients', error });
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
