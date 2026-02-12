// Local Storage based API implementation for easy deployment without a backend server

const getStorageItem = (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
};

const setStorageItem = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const fetchProjects = () => {
    const projects = getStorageItem('proManage_projects');
    return Promise.resolve({ data: projects });
};

export const createProject = (newProject) => {
    const projects = getStorageItem('proManage_projects');
    const project = {
        ...newProject,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString()
    };
    projects.push(project);
    setStorageItem('proManage_projects', projects);
    return Promise.resolve({ data: project });
};

export const getProjectDetails = (id) => {
    const projects = getStorageItem('proManage_projects');
    const project = projects.find(p => p._id === id);
    return Promise.resolve({ data: project });
};

export const deleteProject = (id) => {
    let projects = getStorageItem('proManage_projects');
    projects = projects.filter(p => p._id !== id);
    setStorageItem('proManage_projects', projects);

    let tasks = getStorageItem('proManage_tasks');
    tasks = tasks.filter(t => t.project !== id);
    setStorageItem('proManage_tasks', tasks);

    return Promise.resolve({ data: { message: 'Project deleted' } });
};

export const fetchTasks = (projectId) => {
    const tasks = getStorageItem('proManage_tasks');
    const projectTasks = tasks.filter(t => t.project === projectId);
    return Promise.resolve({ data: projectTasks });
};

export const createTask = (newTask) => {
    const tasks = getStorageItem('proManage_tasks');
    const task = {
        ...newTask,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString()
    };
    tasks.push(task);
    setStorageItem('proManage_tasks', tasks);
    return Promise.resolve({ data: task });
};

export const updateTask = (id, updatedTask) => {
    const tasks = getStorageItem('proManage_tasks');
    const index = tasks.findIndex(t => t._id === id);
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updatedTask };
        setStorageItem('proManage_tasks', tasks);
        return Promise.resolve({ data: tasks[index] });
    }
    return Promise.reject(new Error('Task not found'));
};

export const deleteTask = (id) => {
    let tasks = getStorageItem('proManage_tasks');
    tasks = tasks.filter(t => t._id !== id);
    setStorageItem('proManage_tasks', tasks);
    return Promise.resolve({ data: { message: 'Task deleted' } });
};

export default {};
