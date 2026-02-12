import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../api';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const Auth = ({ setUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = isLogin ? await signIn(formData) : await signUp(formData);
            localStorage.setItem('profile', JSON.stringify(data));
            setUser(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
        setLoading(false);
    };

    return (
        <div className="container flex justify-center py-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-morphism p-8 rounded-3xl w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Join Vogue'}</h1>
                <p className="text-slate-400 mb-8">{isLogin ? 'Enter your details to sign in' : 'Create an account to start shopping'}</p>

                {error && <div className="bg-rose-500/10 border border-rose-500 text-rose-500 p-3 rounded-lg mb-6 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 focus:outline-none focus:ring-2 ring-indigo-500/50"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    )}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-slate-500" size={18} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 focus:outline-none focus:ring-2 ring-indigo-500/50"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 focus:outline-none focus:ring-2 ring-indigo-500/50"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold flex items-center justify-center gap-2 transition"
                    >
                        {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <p className="text-center mt-8 text-slate-400">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-indigo-400 font-semibold ml-2 hover:underline"
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default Auth;
