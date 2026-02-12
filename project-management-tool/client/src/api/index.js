import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const fetchProjects = () => API.get('/projects');
export const createProject = (newProject) => API.post('/projects', newProject);
export const updateProject = (id, updatedProject) => API.put(`/projects/${id}`, updatedProject);
export const deleteProject = (id) => API.delete(`/projects/${id}`);
export const getProjectDetails = (id) => API.get(`/projects/${id}`);

export const fetchTasks = (projectId) => API.get(`/tasks/project/${projectId}`);
export const createTask = (newTask) => API.post('/tasks', newTask);
export const updateTask = (id, updatedTask) => API.put(`/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export default API;
