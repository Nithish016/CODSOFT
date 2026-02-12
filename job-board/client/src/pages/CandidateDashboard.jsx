import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const CandidateDashboard = () => {
    const { user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/applications/my-applications', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setApplications(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (user) fetchApplications();
    }, [user]);

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <h2 className="mb-4">My Applications</h2>
            <div className="grid grid-cols-1">
                {applications.map(app => (
                    <div key={app._id} className="card">
                        <h4>{app.job?.title || 'Unknown Job'}</h4>
                        <p>Status: <span style={{ fontWeight: 'bold', color: app.status === 'hired' ? 'var(--secondary)' : 'var(--primary)' }}>{app.status}</span></p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Applied on: {new Date(app.appliedAt).toLocaleDateString()}</p>
                    </div>
                ))}
                {applications.length === 0 && <p>You haven't applied to any jobs yet.</p>}
            </div>
        </div>
    );
};

export default CandidateDashboard;
