document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Load tasks on page load
    fetchTasks();
  
    // Add task
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const task = taskInput.value.trim();
      if (task) {
        await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ task })
        });
        taskInput.value = '';
        fetchTasks();
      }
    });
  
    // Delete task
    taskList.addEventListener('click', async (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        await fetch(`/api/tasks/${index}`, { method: 'DELETE' });
        fetchTasks();
      }
    });
  
    // Fetch and display tasks
    async function fetchTasks() {
      const response = await fetch('/api/tasks');
      const tasks = await response.json();
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${task} <span class="delete-btn" data-index="${index}">✕</span>`;
        taskList.appendChild(li); // Fixed: task01List -> taskList
      });
    }
  });