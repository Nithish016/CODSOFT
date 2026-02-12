import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="logo">JobFindr</Link>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/jobs">Jobs</Link>

                    {user ? (
                        <>
                            {user.role === 'employer' && <Link to="/employer">Dashboard</Link>}
                            {user.role === 'candidate' && <Link to="/candidate">My Profile</Link>}
                            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '5px 15px' }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '5px 15px', color: 'white' }}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
