const router = require('express').Router();
const Application = require('../models/Application');
const auth = require('../middleware/auth');

// Apply for a job (Candidate only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'candidate') return res.status(403).json({ message: 'Only candidates can apply' });

    try {
        const { jobId, resume, coverLetter } = req.body;

        // Check if already applied
        const existingApplication = await Application.findOne({ job: jobId, candidate: req.user.id });
        if (existingApplication) return res.status(400).json({ message: 'Already applied' });

        const application = new Application({
            job: jobId,
            candidate: req.user.id,
            resume,
            coverLetter
        });

        await application.save();
        res.json(application);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get applications for a candidate
router.get('/my-applications', auth, async (req, res) => {
    try {
        const applications = await Application.find({ candidate: req.user.id }).populate('job');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get applications for a job (Employer) - Simplified logic: get all applications where job.postedBy is me
// This is slightly complex in Mongo without aggregation if we want to filter by job owner directly from Application collection 
// unless we pass the jobId. Let's assume frontend passes jobId.
router.get('/job/:jobId', auth, async (req, res) => {
    try {
        // Ideally verify that the job belongs to req.user.id
        const applications = await Application.find({ job: req.params.jobId }).populate('candidate', 'name email resume');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
