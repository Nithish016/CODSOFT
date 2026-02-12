import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const { user } = useContext(AuthContext);
    const [applying, setApplying] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch job logic here (mocked for demo if fail)
        const fetchJob = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
                setJob(res.data);
            } catch (err) {
                // Mock data
                setJob({
                    _id: id,
                    title: 'Software Engineer',
                    company: 'TechCorp',
                    location: 'Remote',
                    type: 'Full-time',
                    salary: '$120k',
                    description: 'We are looking for a skilled Software Engineer to join our team. You will be responsible for developing high-quality web applications.',
                    requirements: ['React', 'Node.js', 'MongoDB'],
                    postedBy: { companyName: 'TechCorp' }
                });
            }
        };
        fetchJob();
    }, [id]);

    const handleApply = async () => {
        if (!user) return alert('Please login to apply');

        setApplying(true);
        try {
            await axios.post('http://localhost:5000/api/applications',
                { jobId: id, resume: user.resume || 'link-to-resume' },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setMessage('Application submitted successfully!');
        } catch (err) {
            setMessage('Unsuccessful, you may have already applied.');
        } finally {
            setApplying(false);
        }
    };

    if (!job) return <div className="container" style={{ padding: '50px' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '50px 20px' }}>
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px', marginBottom: '20px' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>{job.title}</h1>
                    <div className="flex justify-between items-center">
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>{job.company} • {job.location}</p>
                        <span style={{ background: '#EEF2FF', color: 'var(--primary)', padding: '5px 15px', borderRadius: '4px' }}>{job.type}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Description</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>{job.description}</p>
                </div>

                {job.requirements && (
                    <div className="mb-4">
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Requirements</h3>
                        <ul style={{ paddingLeft: '20px' }}>
                            {job.requirements.map((req, index) => <li key={index}>{req}</li>)}
                        </ul>
                    </div>
                )}

                {message && <div style={{ padding: '10px', background: '#DCFCE7', color: '#166534', borderRadius: '4px', marginBottom: '20px' }}>{message}</div>}

                <div style={{ marginTop: '30px', textAlign: 'right' }}>
                    {user?.role === 'employer' ? (
                        <span style={{ color: 'var(--text-light)' }}>Employers cannot apply to jobs.</span>
                    ) : (
                        <button
                            onClick={handleApply}
                            disabled={applying || message}
                            className="btn btn-primary"
                            style={{ padding: '12px 30px', fontSize: '1.1rem' }}
                        >
                            {applying ? 'Applying...' : (message ? 'Applied' : 'Apply Now')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
