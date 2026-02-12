const router = require('express').Router();
const mongoose = require('mongoose');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// Get all jobs (Public)
router.get('/', async (req, res) => {
    try {
        console.log('Fetching jobs... URI:', mongoose.connection.client.s.url);
        const jobs = await Job.find().populate('postedBy', 'name companyName');
        console.log(`Found ${jobs.length} jobs`);
        res.json(jobs);
    } catch (err) {
        console.error('Error in /api/jobs:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get single job
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('postedBy', 'name companyName');
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post a job (Employer only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'employer') return res.status(403).json({ message: 'Access denied' });

    try {
        const newJob = new Job({
            ...req.body,
            postedBy: req.user.id
        });
        const savedJob = await newJob.save();
        res.json(savedJob);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
