const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    status: {
        type: String,
        enum: ['Active', 'Completed', 'On Hold'],
        default: 'Active'
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
