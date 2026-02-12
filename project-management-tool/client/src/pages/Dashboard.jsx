import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Briefcase, CheckCircle, Clock } from 'lucide-react';
import { fetchProjects } from '../api';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const { data } = await fetchProjects();
                setProjects(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        getProjects();
    }, []);

    const stats = [
        { name: 'Total Projects', value: projects.length, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { name: 'Active Projects', value: projects.filter(p => p.status === 'Active').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { name: 'Completed', value: projects.filter(p => p.status === 'Completed').length, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    ];

    return (
        <div className="fade-in">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
                <p className="text-slate-400">Here's what's happening with your projects today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={stat.name}
                        className="glass p-6 card"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm font-medium">{stat.name}</p>
                                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass p-8">
                    <h3 className="text-xl font-bold mb-6">Recent Projects</h3>
                    {loading ? (
                        <p className="text-slate-500">Loading projects...</p>
                    ) : projects.length === 0 ? (
                        <p className="text-slate-500">No projects yet. Create one to get started!</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {projects.slice(0, 5).map(project => (
                                <div key={project._id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-10 bg-indigo-500 rounded-full"></div>
                                        <div>
                                            <p className="font-semibold">{project.title}</p>
                                            <p className="text-xs text-slate-400">{project.description?.substring(0, 50)}...</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                        }`}>
                                        {project.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="glass p-8">
                    <h3 className="text-xl font-bold mb-6">Upcoming Deadlines</h3>
                    <p className="text-slate-500 italic">Tracking module coming soon...</p>
                    {/* Simplified placeholder for now */}
                    <div className="mt-4 flex flex-col gap-3">
                        <div className="p-4 rounded-xl border border-white/5 bg-slate-800/30 opacity-50">
                            <p className="text-sm font-medium">Design System Update</p>
                            <p className="text-xs text-rose-400 font-medium">Due in 2 days</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
