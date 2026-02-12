import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MoreHorizontal, Calendar, ArrowRight } from 'lucide-react';
import { fetchProjects, createProject } from '../api';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProject, setNewProject] = useState({ title: '', description: '', status: 'Active' });

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        const { data } = await fetchProjects();
        setProjects(data);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        await createProject(newProject);
        setIsModalOpen(false);
        setNewProject({ title: '', description: '', status: 'Active' });
        loadProjects();
    };

    return (
        <div className="fade-in">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Projects</h1>
                    <p className="text-slate-400">Manage and track your ongoing projects</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary shadow-indigo-500/20 shadow-lg"
                >
                    <Plus size={20} />
                    Create Project
                </button>
            </header>

            <div className="grid">
                {projects.map((project, index) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        key={project._id}
                        className="glass p-6 group hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between h-full"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-2 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold ${project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-indigo-500/10 text-indigo-500'
                                    }`}>
                                    {project.status}
                                </span>
                                <button className="text-slate-500 hover:text-white transition-colors">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                            <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                                {project.description || "No description provided."}
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 text-slate-500 text-xs mb-6">
                                <Calendar size={14} />
                                <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                            </div>
                            <Link
                                to={`/project/${project._id}`}
                                className="w-full btn btn-outline justify-center hover:bg-indigo-600 hover:text-white hover:border-indigo-600"
                            >
                                View Project
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Create Project Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-md relative z-10 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
                            <form onSubmit={handleCreate}>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Project Title</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Enter project name..."
                                    value={newProject.title}
                                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                />

                                <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                                <textarea
                                    rows="4"
                                    placeholder="Describe the project goals..."
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                />

                                <div className="flex gap-4 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 btn btn-outline justify-center"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 btn btn-primary justify-center"
                                    >
                                        Create Project
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Projects;
