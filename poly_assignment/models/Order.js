const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  customer_email: {
    type: String,
    required: true,
  },
  order_total: {
    type: Number,
    required: true,
  },
  order_status: {
    type: String,
    default: 'processing',
  },
  payment_status: {
    type: String,
    default: 'Not Paid',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('order', OrderSchema);
