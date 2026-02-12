const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Middleware to protect routes (Very basic)
const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        // In a real app, verify JWT here. 
        // For this demo, we'll assume valid if token exists.
        next();
    } else {
        res.status(401).json({ message: 'Not authorized' });
    }
};

router.post('/', protect, async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400).json({ message: 'No order items' });
            return;
        }

        const order = new Order({
            orderItems,
            user: "65bc12... placeholder", // Would get from req.user.id
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
