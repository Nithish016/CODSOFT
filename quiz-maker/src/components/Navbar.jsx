import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuizzes } from '../context/QuizContext';
import { BrainCircuit, PlusCircle, List, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { currentUser, logout } = useQuizzes();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass sticky top-4 mx-4 mt-4 z-50 px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" style={{
                background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            }}>
                <BrainCircuit className="text-primary" size={32} style={{ color: 'var(--primary)' }} />
                <span>QuizMaster</span>
            </Link>

            <div className="flex items-center gap-6">
                <Link to="/quizzes" className="flex items-center gap-1 hover:text-primary transition-colors">
                    <List size={20} />
                    <span>Browse Quizzes</span>
                </Link>

                {currentUser ? (
                    <>
                        <Link to="/create" className="flex items-center gap-1 hover:text-primary transition-colors">
                            <PlusCircle size={20} />
                            <span>Create Quiz</span>
                        </Link>
                        <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                            <span className="flex items-center gap-2 text-text-muted">
                                <User size={18} />
                                {currentUser.username}
                            </span>
                            <button onClick={handleLogout} className="p-2 rounded-full hover:bg-white/10 text-error transition-colors">
                                <LogOut size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    <Link to="/auth" className="px-6 py-2 bg-primary hover:bg-primary-hover rounded-full font-medium transition-all shadow-lg shadow-primary/20">
                        Login / Register
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
