require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//Initialize server
const app = express();

// Connect Mongo DB
connectDB();
// enable cors
app.use(cors());
// json parser
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

const PORT = process.env.PORT || 5000;

//Start server
app.listen(PORT || 5000, () => console.log(`Server started on port ${PORT}`));
