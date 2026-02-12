import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const EmployerDashboard = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newJob, setNewJob] = useState({ title: '', company: '', location: '', type: 'Full-time', description: '', requirements: '' });

    const fetchMyJobs = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/jobs');
            setJobs(res.data.filter(job => job.postedBy?._id === user.id || job.postedBy === user.id));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (user) {
            fetchMyJobs();
            if (user.companyName) {
                setNewJob(prev => ({ ...prev, company: user.companyName }));
            }
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...newJob,
                requirements: newJob.requirements.split(',').map(s => s.trim())
            };
            await axios.post('http://localhost:5000/api/jobs', payload, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Job Posted Successfully!');
            setShowForm(false);
            setNewJob({ title: '', company: user.companyName || '', location: '', type: 'Full-time', description: '', requirements: '' });
            fetchMyJobs(); // Refresh the list
        } catch (err) {
            alert('Failed to post job: ' + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <div className="flex justify-between items-center mb-4">
                <h2>Employer Dashboard</h2>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : 'Post New Job'}</button>
            </div>

            {showForm && (
                <div className="card mb-4">
                    <h3>Post a New Job</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2">
                            <div className="form-group">
                                <label className="form-label">Job Title</label>
                                <input className="form-input" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Company Name</label>
                                <input className="form-input" value={newJob.company} onChange={e => setNewJob({ ...newJob, company: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Location</label>
                                <input className="form-input" value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Job Type</label>
                                <select className="form-input" value={newJob.type} onChange={e => setNewJob({ ...newJob, type: e.target.value })}>
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Contract</option>
                                    <option>Internship</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea className="form-input" rows="4" value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })} required></textarea>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Requirements (comma separated)</label>
                            <input className="form-input" value={newJob.requirements} onChange={e => setNewJob({ ...newJob, requirements: e.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit Job</button>
                    </form>
                </div>
            )}

            <h3>Your Job Postings</h3>
            <div className="grid grid-cols-1">
                {jobs.map(job => (
                    <div key={job._id} className="card">
                        <h4>{job.title}</h4>
                        <p>{job.location} • {new Date(job.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
                {jobs.length === 0 && <p>You haven't posted any jobs yet.</p>}
            </div>
        </div>
    );
};

export default EmployerDashboard;
