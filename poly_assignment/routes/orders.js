const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const Razorpay = require('razorpay');
const Product = require('../Models/Product');
const Order = require('../Models/Order');

// @route  POST api/orders
// desc :create a order
router.post('/create', async (req, res) => {
  const id = uuidv4();
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  const { product_ids, email } = req.body;
  try {
    const records = await Product.find({ _id: { $in: product_ids } });
    let total = 0;
    records.forEach((record) => (total += record.price));
    const payment_capture = 1;
    const amount = total;
    const currency = 'INR';
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: id,
      payment_capture,
    };
    const response = await razorpay.orders.create(options);
    const order = new Order({
      id: response.id,
      customer_email: email,
      order_total: response.amount,
    });
    await order.save();
    res.status(200).json({
      id: order._id,
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// @route  GET api/orders
// desc :Get orders
router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      orders,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
router.put('/update/:id', async (req, res) => {
  const { payment_status } = req.body;
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      payment_status,
    });

    res.status(200).json({
      msg: 'success',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
