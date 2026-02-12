const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jobboard')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.log('MongoDB Connection Error:', err.message);
        console.log('Make sure you have MongoDB installed and running!');
    });

// Routes (Placeholders for now)
app.get('/', (req, res) => {
    res.send('Job Board API is running');
});

// Import Routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
