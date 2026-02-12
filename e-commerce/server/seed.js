const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const products = [
    {
        name: 'Airpods Wireless Bluetooth Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
        description: 'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
        category: 'Electronics',
        price: 89.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'iPhone 13 Pro 256GB Memory',
        image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500&q=80',
        description: 'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life.',
        category: 'Electronics',
        price: 599.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
    },
    {
        name: 'Cannon EOS 80D DSLR Camera',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
        description: 'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
        category: 'Electronics',
        price: 929.99,
        countInStock: 5,
        rating: 3,
        numReviews: 12,
    },
    {
        name: 'Sony Playstation 5 White Edition',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&q=80',
        description: 'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
        category: 'Electronics',
        price: 399.99,
        countInStock: 11,
        rating: 5,
        numReviews: 12,
    },
    {
        name: 'Logitech G-Series Gaming Mouse',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
        description: 'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
        category: 'Electronics',
        price: 49.99,
        countInStock: 7,
        rating: 3.5,
        numReviews: 10,
    },
    {
        name: 'Amazon Echo Dot 3rd Generation',
        image: 'https://images.unsplash.com/photo-1543512214-318c355ef23f?w=500&q=80',
        description: 'Meet Echo Dot - Our most popular voice-controlled speaker, now with a fabric design and improved speaker for richer and louder sound.',
        category: 'Electronics',
        price: 29.99,
        countInStock: 0,
        rating: 4,
        numReviews: 12,
    },
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/e-commerce');
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log('Products Sample Data Imported!');
        process.exit();
    } catch (error) {
        console.error('Error with data import', error);
        process.exit(1);
    }
};

seedProducts();
