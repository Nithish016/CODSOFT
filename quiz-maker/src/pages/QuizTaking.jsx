import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizzes } from '../context/QuizContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Send, Timer } from 'lucide-react';

const QuizTaking = () => {
    const { quizId } = useParams();
    const { quizzes } = useQuizzes();
    const navigate = useNavigate();

    const quiz = quizzes.find(q => q.id === quizId);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per quiz for demo

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleSubmit();
        }
    }, [timeLeft]);

    if (!quiz) return <div className="text-center py-20 text-3xl font-bold">Quiz not found</div>;

    const handleAnswer = (optionIdx) => {
        setAnswers({ ...answers, [currentQuestion]: optionIdx });
    };

    const handleSubmit = () => {
        // Calculate score
        let score = 0;
        quiz.questions.forEach((q, idx) => {
            if (answers[idx] === q.correctAnswer) {
                score++;
            }
        });

        navigate('/results', {
            state: {
                score,
                total: quiz.questions.length,
                quizTitle: quiz.title,
                questions: quiz.questions,
                userAnswers: answers
            }
        });
    };

    const q = quiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-text-muted font-medium mb-1">Testing your skills in</h2>
                    <h1 className="text-3xl font-bold">{quiz.title}</h1>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 glass rounded-xl font-mono text-xl ${timeLeft < 10 ? 'text-error animate-pulse' : 'text-accent'}`}>
                    <Timer size={20} />
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
            </div>

            <div className="w-full h-2 bg-white/5 rounded-full mb-12 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass p-10"
                >
                    <span className="text-primary font-bold mb-4 block uppercase tracking-widest text-sm">
                        Question {currentQuestion + 1} of {quiz.questions.length}
                    </span>
                    <h2 className="text-2xl font-bold mb-8">{q.question}</h2>

                    <div className="space-y-4">
                        {q.options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${answers[currentQuestion] === idx
                                        ? 'border-primary bg-primary/10'
                                        : 'border-white/5 hover:border-white/20 bg-white/5'
                                    }`}
                            >
                                <span className="text-lg">{option}</span>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${answers[currentQuestion] === idx
                                        ? 'border-primary bg-primary'
                                        : 'border-white/20'
                                    }`}>
                                    {answers[currentQuestion] === idx && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
                <button
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    className="px-6 py-3 glass rounded-xl font-bold flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ArrowLeft size={20} /> Previous
                </button>

                {currentQuestion === quiz.questions.length - 1 ? (
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-3 bg-success hover:bg-success/80 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-success/20"
                    >
                        Submit Quiz <Send size={20} />
                    </button>
                ) : (
                    <button
                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                        disabled={answers[currentQuestion] === undefined}
                        className="px-8 py-3 bg-primary hover:bg-primary-hover rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                        Next Question <ArrowRight size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizTaking;
