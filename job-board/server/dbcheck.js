const mongoose = require('mongoose');
const User = require('./models/User');
const Job = require('./models/Job');
const dotenv = require('dotenv');

dotenv.config();

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jobboard');
        const userCount = await User.countDocuments();
        const jobCount = await Job.countDocuments();
        const jobs = await Job.find();
        console.log(`Users: ${userCount}, Jobs: ${jobCount}`);
        console.log('Jobs data:', JSON.stringify(jobs, null, 2));
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

check();
