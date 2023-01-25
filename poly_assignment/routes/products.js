const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const access = require('../middlewares/access');
const Product = require('../Models/Product');

// @route  get api/products
// desc :rget all products
// access: public

router.get('/all', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {}
});

// @route  POST api/products
// desc :add a product
// access: private
router.post(
  '/add',
  access,
  [
    check('name', 'Please include a product name').notEmpty(),
    check('url', 'Please include a product img url').notEmpty(),
    check('price', 'Please add product price').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, url, quantity, price } = req.body;
    try {
      const product = new Product({ name, url, quantity, price });
      await product.save();
      res.status(200).json({ msg: 'Product added successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);
// @route  PUT api/products/id
// desc :update a product
// access: private
router.put('/update/:id', access, async (req, res) => {
  const { name, imgURL, quantity, price } = req.body;
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      imgURL,
      quantity,
      price,
    });
    res.status(200).json({ msg: 'Product updated successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});
// @route  delete api/products/id
// desc :delete  a product
// access: private
router.delete('/delete/:id', access, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Product deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;
