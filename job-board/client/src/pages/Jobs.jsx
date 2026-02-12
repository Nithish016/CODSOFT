import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/jobs');
                setJobs(res.data);
                setFilteredJobs(res.data);
            } catch (err) {
                console.error("Error fetching jobs", err);
                // Fallback dummy data for demo purposes if backend fails
                const dummy = [
                    { _id: '1', title: 'Software Engineer', company: 'TechCorp', location: 'Remote', type: 'Full-time', salary: '$120k' },
                    { _id: '2', title: 'Product Manager', company: 'InnoSys', location: 'New York', type: 'Full-time', salary: '$140k' },
                    { _id: '3', title: 'Designer', company: 'CreativeStudio', location: 'San Francisco', type: 'Contract', salary: '$80/hr' },
                ];
                setJobs(dummy);
                setFilteredJobs(dummy);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = jobs.filter(job =>
            job.title.toLowerCase().includes(term) ||
            job.company.toLowerCase().includes(term) ||
            job.location.toLowerCase().includes(term)
        );
        setFilteredJobs(filtered);
    };

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <div className="flex justify-between items-center mb-4">
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Job Listings</h1>
                <div style={{ width: '300px' }}>
                    <input
                        type="text"
                        placeholder="Search jobs, companies..."
                        className="form-input"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {loading ? (
                <p>Loading jobs...</p>
            ) : (
                <div className="grid grid-cols-1">
                    {filteredJobs.length > 0 ? filteredJobs.map(job => (
                        <div key={job._id} className="card flex justify-between items-center">
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '5px' }}>{job.title}</h3>
                                <p style={{ color: 'var(--text-light)', marginBottom: '5px' }}>{job.company} • {job.location}</p>
                                <div className="flex gap-4">
                                    <span style={{ background: '#EEF2FF', color: 'var(--primary)', padding: '2px 10px', borderRadius: '4px', fontSize: '0.875rem' }}>{job.type}</span>
                                    {job.salary && <span style={{ color: 'var(--secondary)', fontWeight: '500', fontSize: '0.875rem' }}>{job.salary}</span>}
                                </div>
                            </div>
                            <Link to={`/jobs/${job._id}`} className="btn btn-primary">View Details</Link>
                        </div>
                    )) : (
                        <p>No jobs found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Jobs;
