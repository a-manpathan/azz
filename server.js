const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static('public'));

// In-memory task storage
let tasks = [];

// API to get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// API to add a task
app.post('/api/tasks', (req, res) => {
  const task = req.body.task;
  if (task) {
    tasks.push(task);
    res.status(201).json({ message: 'Task added', task });
  } else {
    res.status(400).json({ message: 'Task is required' });
  }
});

// API to delete a task
app.delete('/api/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted' });
  } else {
    res.status(400).json({ message: 'Invalid index' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});