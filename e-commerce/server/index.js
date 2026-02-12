const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));

app.get('/', (req, res) => {
    res.send('E-commerce API is running...');
});

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/e-commerce')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
