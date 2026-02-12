const Project = require('../models/Project');
const Task = require('../models/Task');

// @desc    Get all projects
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a project
// @route   POST /api/projects
exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
exports.getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update project
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        // Also delete tasks associated with this project
        await Task.deleteMany({ project: req.params.id });
        res.status(200).json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
