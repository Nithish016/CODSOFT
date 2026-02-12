import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, RefreshCcw, Home, CheckCircle2, XCircle } from 'lucide-react';

const QuizResults = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) return <div className="text-center py-20 text-3xl font-bold">No results to display</div>;

    const { score, total, quizTitle, questions, userAnswers } = state;
    const percentage = Math.round((score / total) * 100);

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 text-center mb-12"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="text-primary" size={48} />
                    </div>
                </div>
                <h1 className="text-4xl font-bold mb-2">Quiz Completed!</h1>
                <p className="text-text-muted text-xl mb-8">You scored in "{quizTitle}"</p>

                <div className="flex flex-col items-center gap-2 mb-10">
                    <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary" style={{
                        background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {percentage}%
                    </div>
                    <p className="text-2xl font-bold text-text-muted">
                        {score} / {total} Correct
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={() => navigate('/quizzes')}
                        className="px-8 py-3 bg-primary hover:bg-primary-hover rounded-xl font-bold flex items-center gap-2"
                    >
                        <RefreshCcw size={20} /> Try Another Quiz
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 glass hover:bg-white/5 rounded-xl font-bold flex items-center gap-2"
                    >
                        <Home size={20} /> Back Home
                    </button>
                </div>
            </motion.div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Review Answers</h2>
                {questions.map((q, idx) => (
                    <div key={idx} className={`glass p-6 border-l-4 ${userAnswers[idx] === q.correctAnswer ? 'border-success' : 'border-error'}`}>
                        <div className="flex items-start gap-4">
                            <div className="mt-1">
                                {userAnswers[idx] === q.correctAnswer
                                    ? <CheckCircle2 className="text-success" size={24} />
                                    : <XCircle className="text-error" size={24} />
                                }
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold mb-4">{q.question}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {q.options.map((option, oIdx) => (
                                        <div
                                            key={oIdx}
                                            className={`p-3 rounded-lg text-sm ${oIdx === q.correctAnswer
                                                    ? 'bg-success/20 text-success border border-success/30'
                                                    : oIdx === userAnswers[idx]
                                                        ? 'bg-error/20 text-error border border-error/30'
                                                        : 'bg-white/5 text-text-muted'
                                                }`}
                                        >
                                            {option}
                                            {oIdx === q.correctAnswer && <span className="ml-2 font-bold">(Correct)</span>}
                                            {oIdx === userAnswers[idx] && oIdx !== q.correctAnswer && <span className="ml-2 font-bold">(Your Answer)</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizResults;
