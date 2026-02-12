import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayCircle, PlusCircle, Award, Users, BookOpen } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl"
            >
                <h1 className="text-6xl font-extrabold mb-6 leading-tight">
                    Craft, Share, and <span className="text-primary">Conquer</span> Every Quiz.
                </h1>
                <p className="text-xl text-text-muted mb-10">
                    The ultimate platform for knowledge seekers and creators. Build beautiful quizzes in minutes and challenge the world.
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    <button
                        onClick={() => navigate('/quizzes')}
                        className="px-8 py-4 bg-primary hover:bg-primary-hover rounded-2xl text-lg font-bold flex items-center gap-3 transition-all transform hover:scale-105 shadow-xl shadow-primary/30"
                    >
                        <PlayCircle size={24} />
                        Take a Quiz
                    </button>
                    <button
                        onClick={() => navigate('/create')}
                        className="px-8 py-4 glass hover:bg-white/5 rounded-2xl text-lg font-bold flex items-center gap-3 transition-all transform hover:scale-105"
                    >
                        <PlusCircle size={24} />
                        Create Your Own
                    </button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-5xl"
            >
                <FeatureCard
                    icon={<Award className="text-secondary" />}
                    title="Earn Badges"
                    description="Compete with others and earn recognition for your knowledge across various subjects."
                />
                <FeatureCard
                    icon={<Users className="text-accent" />}
                    title="Community Driven"
                    description="Share your quizzes with a global community of learners and educators."
                />
                <FeatureCard
                    icon={<BookOpen className="text-primary" />}
                    title="Instant Feedback"
                    description="Get detailed insights and immediate scores as soon as you finish a quiz."
                />
            </motion.div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="glass p-8 flex flex-col items-center text-center hover:border-primary/50 transition-colors">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
            {React.cloneElement(icon, { size: 32 })}
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-text-muted">{description}</p>
    </div>
);

export default Home;
