import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizzes } from '../context/QuizContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const { login } = useQuizzes();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate auth
        login({ username: formData.username || formData.email.split('@')[0], email: formData.email });
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-10 w-full max-w-md"
            >
                <div className="flex gap-4 mb-8 p-1 bg-white/5 rounded-xl">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-3 rounded-lg font-bold transition-all ${isLogin ? 'bg-primary shadow-lg shadow-primary/20' : 'hover:bg-white/5'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-3 rounded-lg font-bold transition-all ${!isLogin ? 'bg-primary shadow-lg shadow-primary/20' : 'hover:bg-white/5'}`}
                    >
                        Register
                    </button>
                </div>

                <h2 className="text-3xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                <p className="text-text-muted mb-8">
                    {isLogin ? 'Enter your details to access your quizzes.' : 'Join our community of quiz masters today.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                            <input
                                type="text"
                                placeholder="Username"
                                required
                                className="w-full pl-12 pr-4 py-4 glass border-white/10 focus:border-primary outline-none transition-all"
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    )}
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            className="w-full pl-12 pr-4 py-4 glass border-white/10 focus:border-primary outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full pl-12 pr-4 py-4 glass border-white/10 focus:border-primary outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-primary hover:bg-primary-hover rounded-xl font-bold text-lg flex items-center justify-center gap-2 mt-6 shadow-xl shadow-primary/20"
                    >
                        {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-8 text-center text-text-muted">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-primary font-bold hover:underline"
                    >
                        {isLogin ? 'Register Now' : 'Login here'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
