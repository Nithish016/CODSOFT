import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div style={{ background: 'linear-gradient(to right, #2563EB, #1D4ED8)', color: 'white', padding: '100px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: '800' }}>Find Your Dream Job</h1>
                    <p style={{ fontSize: '1.25rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
                        Connect with top employers and discover opportunities that match your skills.
                    </p>
                    <div className="flex" style={{ justifyContent: 'center', gap: '20px' }}>
                        <Link to="/jobs" className="btn" style={{ background: 'white', color: '#2563EB', padding: '15px 30px', fontSize: '1.1rem' }}>Browse Jobs</Link>
                        <Link to="/register" className="btn" style={{ border: '1px solid white', color: 'white', padding: '15px 30px', fontSize: '1.1rem' }}>Post a Job</Link>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '80px 20px' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center', fontWeight: '800' }}>How it works</h2>
                <div className="grid md:grid-cols-3">
                    <Link to="/jobs" className="card hover-card" style={{ textAlign: 'center', padding: '50px 30px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '25px', display: 'inline-block', padding: '20px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '50%' }}>🔍</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', fontWeight: '700' }}>Search Jobs</h3>
                        <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Filter through thousands of job listings to find the perfect match for your skills.</p>
                    </Link>
                    <Link to="/jobs" className="card hover-card" style={{ textAlign: 'center', padding: '50px 30px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '25px', display: 'inline-block', padding: '20px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%' }}>📄</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', fontWeight: '700' }}>Apply Directly</h3>
                        <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Submit your profile and resume directly to top-tier employers in just a few seconds.</p>
                    </Link>
                    <Link to="/register" className="card hover-card" style={{ textAlign: 'center', padding: '50px 30px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '25px', display: 'inline-block', padding: '20px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '50%' }}>🚀</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', fontWeight: '700' }}>Get Hired</h3>
                        <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Connect with global industry leaders and fast-track your career journey today.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
