const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['employer', 'candidate'], default: 'candidate' },
    createdAt: { type: Date, default: Date.now },
    // Additional fields for candidates/employers can be added here
    resume: { type: String }, // URL to resume
    companyName: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
