require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const clientRoutes = require('./routes/client');


// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a la base de datos');
}).catch(err => {
  console.log('Error al conectar a la base de datos:', err);
});

// Middleware
app.use(express.json());
app.use('/api/clients', clientRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
