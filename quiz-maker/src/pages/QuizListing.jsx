import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizzes } from '../context/QuizContext';
import { motion } from 'framer-motion';
import { Search, Play, User as UserIcon, HelpCircle } from 'lucide-react';

const QuizListing = () => {
    const { quizzes } = useQuizzes();
    const navigate = useNavigate();

    return (
        <div className="py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Available Quizzes</h1>
                    <p className="text-text-muted text-lg">Choose a challenge and test your skills.</p>
                </div>

                <div className="relative max-w-md w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                    <input
                        type="text"
                        placeholder="Search quizzes..."
                        className="w-full pl-12 pr-6 py-3 glass focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {quizzes.map((quiz, index) => (
                    <motion.div
                        key={quiz.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass p-6 group cursor-pointer hover:border-primary/40 transition-all flex flex-col"
                        onClick={() => navigate(`/take/${quiz.id}`)}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <HelpCircle className="text-primary" size={24} />
                            </div>
                            <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-semibold uppercase tracking-wider text-text-muted">
                                {quiz.questions.length} Questions
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                            {quiz.title}
                        </h3>
                        <p className="text-text-muted mb-6 flex-grow">
                            {quiz.description}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2 text-sm text-text-muted">
                                <UserIcon size={16} />
                                <span>By {quiz.creator}</span>
                            </div>
                            <button
                                className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-all"
                            >
                                <Play size={20} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default QuizListing;
