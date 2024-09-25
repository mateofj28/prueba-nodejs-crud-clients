const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email address'
    }
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Middleware to hash the password before saving
ClientSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
