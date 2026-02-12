import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizzes } from '../context/QuizContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, ArrowRight, ArrowLeft } from 'lucide-react';

const QuizCreation = () => {
    const { addQuiz, currentUser } = useQuizzes();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [quizInfo, setQuizInfo] = useState({ title: '', description: '' });
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    };

    const handleRemoveQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const updateQuestion = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const updateOption = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const handleSave = () => {
        if (!quizInfo.title || questions.some(q => !q.question)) {
            alert('Please fill in all fields');
            return;
        }
        addQuiz({ ...quizInfo, questions });
        navigate('/quizzes');
    };

    if (!currentUser) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-3xl font-bold mb-6">Login Required</h2>
                <p className="text-text-muted mb-8 text-center max-w-md">
                    You need to be logged in to create a quiz. Please login or register to continue.
                </p>
                <button
                    onClick={() => navigate('/auth')}
                    className="px-8 py-3 bg-primary rounded-xl font-bold hover:bg-primary-hover"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10">
            <div className="flex items-center gap-4 mb-8">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-primary' : 'bg-success'}`}>
                    1
                </div>
                <div className="h-1 w-20 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full bg-primary transition-all duration-500 ${step === 2 ? 'w-full' : 'w-0'}`} />
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-primary' : 'bg-white/10'}`}>
                    2
                </div>
                <h1 className="text-3xl font-bold ml-4">{step === 1 ? 'Quiz Info' : 'Add Questions'}</h1>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 ? (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="glass p-8"
                    >
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-text-muted">Quiz Title</label>
                                <input
                                    type="text"
                                    value={quizInfo.title}
                                    onChange={(e) => setQuizInfo({ ...quizInfo, title: e.target.value })}
                                    placeholder="e.g. Modern Web History"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-text-muted">Description</label>
                                <textarea
                                    value={quizInfo.description}
                                    onChange={(e) => setQuizInfo({ ...quizInfo, description: e.target.value })}
                                    placeholder="What is this quiz about?"
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none"
                                />
                            </div>
                            <button
                                onClick={() => setStep(2)}
                                disabled={!quizInfo.title}
                                className="w-full py-4 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold flex items-center justify-center gap-2"
                            >
                                Next: Add Questions <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        {questions.map((q, qIndex) => (
                            <div key={qIndex} className="glass p-8 relative">
                                <button
                                    onClick={() => handleRemoveQuestion(qIndex)}
                                    className="absolute top-6 right-6 p-2 text-error hover:bg-error/10 rounded-lg transition-all"
                                >
                                    <Trash2 size={20} />
                                </button>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-text-muted">Question {qIndex + 1}</label>
                                        <input
                                            type="text"
                                            value={q.question}
                                            onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                                            placeholder="Enter your question"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {q.options.map((option, oIndex) => (
                                            <div key={oIndex} className="relative">
                                                <input
                                                    type="text"
                                                    value={option}
                                                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                                    placeholder={`Option ${oIndex + 1}`}
                                                    className={`w-full bg-white/5 border rounded-xl pl-4 pr-12 py-3 outline-none transition-all ${q.correctAnswer === oIndex ? 'border-success ring-1 ring-success' : 'border-white/10 focus:border-primary'}`}
                                                />
                                                <button
                                                    onClick={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                                                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${q.correctAnswer === oIndex ? 'bg-success text-white' : 'text-text-muted hover:bg-white/10'}`}
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleAddQuestion}
                                className="w-full py-4 border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
                            >
                                <Plus size={20} /> Add Another Question
                            </button>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 py-4 glass hover:bg-white/5 rounded-xl font-bold flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft size={20} /> Back
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex-[2] py-4 bg-primary hover:bg-primary-hover rounded-xl font-bold flex items-center justify-center gap-2"
                                >
                                    <Save size={20} /> Create Quiz
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuizCreation;
