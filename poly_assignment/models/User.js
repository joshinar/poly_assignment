const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'customer',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('user', UserSchema);
