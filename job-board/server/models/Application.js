const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resume: { type: String }, // Link to resume
    coverLetter: { type: String },
    status: { type: String, enum: ['applied', 'reviewed', 'interview', 'rejected', 'hired'], default: 'applied' },
    appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', ApplicationSchema);
