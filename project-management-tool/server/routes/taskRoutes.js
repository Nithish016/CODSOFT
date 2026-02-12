const express = require('express');
const router = express.Router();
const { getTasksByProject, createTask, updateTask, deleteTask } = require('../controllers/taskController');

router.post('/', createTask);
router.route('/:id').put(updateTask).delete(deleteTask);
router.get('/project/:projectId', getTasksByProject);

module.exports = router;
