import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Plus, CheckCircle2, Clock, ListTodo, Calendar, Trash2 } from 'lucide-react';
import { getProjectDetails, fetchTasks, createTask, updateTask, deleteTask } from '../api';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', status: 'To Do', priority: 'Medium', deadline: '' });

    useEffect(() => {
        loadProjectAndTasks();
    }, [id]);

    const loadProjectAndTasks = async () => {
        try {
            const projectRes = await getProjectDetails(id);
            const tasksRes = await fetchTasks(id);
            setProject(projectRes.data);
            setTasks(tasksRes.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        await createTask({ ...newTask, project: id });
        setIsTaskModalOpen(false);
        setNewTask({ title: '', status: 'To Do', priority: 'Medium', deadline: '' });
        loadProjectAndTasks();
    };

    const handleToggleStatus = async (task) => {
        const nextStatus = {
            'To Do': 'In Progress',
            'In Progress': 'Completed',
            'Completed': 'To Do'
        };
        await updateTask(task._id, { status: nextStatus[task.status] });
        loadProjectAndTasks();
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Delete this task?')) {
            await deleteTask(taskId);
            loadProjectAndTasks();
        }
    };

    if (!project) return <div className="p-10 text-slate-500">Loading project details...</div>;

    const stats = {
        todo: tasks.filter(t => t.status === 'To Do').length,
        inProgress: tasks.filter(t => t.status === 'In Progress').length,
        completed: tasks.filter(t => t.status === 'Completed').length,
        total: tasks.length
    };

    const progress = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

    return (
        <div className="fade-in max-w-6xl mx-auto">
            <Link to="/projects" className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 mb-8 transition-colors group">
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Projects
            </Link>

            <div className="flex flex-col lg:flex-row gap-8 mb-12">
                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                    <p className="text-slate-400 text-lg leading-relaxed mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-4">
                        <div className="px-4 py-2 glass rounded-xl flex items-center gap-2">
                            <Calendar size={16} className="text-indigo-400" />
                            <span className="text-sm font-medium">Started {new Date(project.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="px-4 py-2 glass rounded-xl flex items-center gap-2">
                            <Clock size={16} className="text-amber-400" />
                            <span className="text-sm font-medium uppercase tracking-wider">{project.status}</span>
                        </div>
                    </div>
                </div>

                <div className="lg:w-80 glass p-6 self-start">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold">Progress</h4>
                        <span className="text-sm font-bold text-indigo-400">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3 mb-6 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="bg-indigo-500 h-full rounded-full"
                        />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Total Tasks</span>
                            <span className="font-bold">{stats.total}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Completed</span>
                            <span className="font-bold text-emerald-400">{stats.completed}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <ListTodo className="text-indigo-500" />
                    Tasks Pipeline
                </h2>
                <button
                    onClick={() => setIsTaskModalOpen(true)}
                    className="btn btn-primary"
                >
                    <Plus size={20} />
                    New Task
                </button>
            </div>

            <div className="space-y-4">
                {tasks.length === 0 ? (
                    <div className="glass p-12 text-center text-slate-500 rounded-3xl border-dashed border-2">
                        No tasks created yet for this project.
                    </div>
                ) : (
                    tasks.map((task, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={task._id}
                            className="glass p-5 group flex items-center justify-between gap-6 hover:bg-slate-800/40"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <button
                                    onClick={() => handleToggleStatus(task)}
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-600 hover:border-indigo-500'
                                        }`}
                                >
                                    {task.status === 'Completed' && <CheckCircle2 size={16} />}
                                </button>
                                <div>
                                    <p className={`font-semibold ${task.status === 'Completed' ? 'line-through text-slate-500' : 'text-white'}`}>
                                        {task.title}
                                    </p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${task.priority === 'High' ? 'bg-rose-500/10 text-rose-500' :
                                                task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-400'
                                            }`}>
                                            {task.priority}
                                        </span>
                                        {task.deadline && (
                                            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                                <Clock size={10} />
                                                Due {new Date(task.deadline).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className={`text-xs font-bold px-3 py-1 rounded-lg ${task.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                                        task.status === 'In Progress' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-800 text-slate-400'
                                    }`}>
                                    {task.status}
                                </span>
                                <button
                                    onClick={() => handleDeleteTask(task._id)}
                                    className="p-2 text-slate-600 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Task Modal */}
            <AnimatePresence>
                {isTaskModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsTaskModalOpen(false)}
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-md relative z-10"
                        >
                            <h2 className="text-2xl font-bold mb-6">Add New Task</h2>
                            <form onSubmit={handleAddTask}>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Task Title</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="What needs to be done?"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                />

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Priority</label>
                                        <select
                                            value={newTask.priority}
                                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Deadline</label>
                                        <input
                                            type="date"
                                            value={newTask.deadline}
                                            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsTaskModalOpen(false)}
                                        className="flex-1 btn btn-outline justify-center"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 btn btn-primary justify-center"
                                    >
                                        Add Task
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

export default ProjectDetail;
