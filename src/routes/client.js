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

// Get all clients or filter by exact email
router.get('/', async (req, res) => {
  const { email } = req.query;

  try {
    // Obtener todos los clientes
    const users = await Client.find();

    // Filtrar por email si se proporciona
    if (email) {
      const user = users.find(user => user.email === email);

      if (user) {
        return res.json(user); // Retornar el usuario encontrado
      } else {
        return res.status(404).json({ message: 'User not found' }); // Manejar el caso cuando no se encuentra el usuario
      }
    }

    // Retornar todos los usuarios si no se proporciona email
    res.json(users);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving users' }); // Mensaje de error más claro
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
