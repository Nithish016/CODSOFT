const mongoose = require('mongoose');
const User = require('./models/User');
const Job = require('./models/Job');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jobboard');
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Job.deleteMany({});

        // Create a demo employer
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('demo123', salt);

        const employer = new User({
            name: 'John Doe',
            email: 'demo@employer.com',
            password: hashedPassword,
            role: 'employer',
            companyName: 'TechSolutions Inc.'
        });
        await employer.save();

        // Create sample jobs
        const jobs = [
            {
                title: 'Senior Frontend Developer',
                company: 'TechSolutions Inc.',
                location: 'Remote',
                type: 'Full-time',
                description: 'We are looking for an expert React developer to join our growing team. You will be responsible for building high-performance web applications.',
                salary: '$120,000 - $150,000',
                requirements: ['5+ years React experience', 'Mastry of CSS/HTMl', 'Experience with state management (Redux/Zustand)'],
                postedBy: employer._id
            },
            {
                title: 'Backend Engineer (Node.js)',
                company: 'TechSolutions Inc.',
                location: 'New York, NY',
                type: 'Full-time',
                description: 'Join our backend team to build scalable APIs and microservices. Experience with MongoDB and Express is a must.',
                salary: '$110,000 - $140,000',
                requirements: ['Node.js expertise', 'MongoDB mastery', 'Experience with cloud services (AWS/Azure)'],
                postedBy: employer._id
            },
            {
                title: 'UI/UX Designer',
                company: 'Creative Studio',
                location: 'San Francisco, CA',
                type: 'Contract',
                description: 'Looking for a creative designer to help us with mobile and web interface designs. 6-month contract with possibility of renewal.',
                salary: '$80 - $100 per hour',
                requirements: ['Proficiency in Figma', 'Portfolio of web apps', 'Understanding of user-centric design'],
                postedBy: employer._id
            }
        ];

        await Job.insertMany(jobs);
        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error('Seeding Error:', err);
        process.exit(1);
    }
};

seedData();
