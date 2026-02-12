import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ user, setUser, cartCount }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('profile');
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="glass-morphism sticky top-0 z-50 py-4 px-6 mb-8">
            <div className="container flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-rose-400 bg-clip-text text-transparent">
                    VOGUE
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="hover:text-indigo-400 transition">Shop</Link>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="bg-slate-800/50 border border-slate-700 rounded-full px-4 py-1.5 pl-10 focus:outline-none focus:ring-2 ring-indigo-500/50 w-64"
                        />
                        <Search className="absolute left-3 top-2 text-slate-400" size={18} />
                    </div>
                    <Link to="/cart" className="relative transition hover:text-indigo-400">
                        <ShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium">{user.name}</span>
                            <button onClick={handleLogout} className="p-2 hover:bg-slate-800 rounded-full transition">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/auth" className="flex items-center space-x-2 btn-primary">
                            <User size={20} />
                            <span>Login</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 space-y-4 pb-4"
                    >
                        <Link to="/" className="block">Shop</Link>
                        <Link to="/cart" className="block">Cart ({cartCount})</Link>
                        {user ? (
                            <button onClick={handleLogout} className="block w-full text-left">Logout</button>
                        ) : (
                            <Link to="/auth" className="block">Login</Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
