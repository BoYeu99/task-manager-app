const API_URL = 'http://localhost:3000/api';
let tasks = [];
let currentFilter = 'all';

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');

// Lắng nghe sự kiện
taskForm.addEventListener('submit', handleAddTask);
filterBtns.forEach(btn => {
  btn.addEventListener('click', handleFilterChange);
});

// Khởi tạo
loadTasks();

async function loadTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    tasks = await response.json();
    renderTasks();
  } catch (error) {
    console.error('Lỗi khi tải công việc:', error);
  }
}

async function handleAddTask(e) {
  e.preventDefault();
  const title = taskInput.value.trim();

  if (!title) return;

  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    if (response.ok) {
      const newTask = await response.json();
      tasks.push(newTask);
      taskInput.value = '';
      renderTasks();
    }
  } catch (error) {
    console.error('Lỗi khi thêm công việc:', error);
  }
}

async function handleToggleTask(id) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
      method: 'PATCH'
    });

    if (response.ok) {
      const updatedTask = await response.json();
      const taskIndex = tasks.findIndex(t => t.id === id);
      if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask;
      }
      renderTasks();
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật công việc:', error);
  }
}

async function handleDeleteTask(id) {
  if (!confirm('Bạn có chắc chắn muốn xóa công việc này?')) return;

  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      tasks = tasks.filter(t => t.id !== id);
      renderTasks();
    }
  } catch (error) {
    console.error('Lỗi khi xóa công việc:', error);
  }
}

function handleFilterChange(e) {
  currentFilter = e.target.dataset.filter;
  filterBtns.forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');
  renderTasks();
}

function getFilteredTasks() {
  switch (currentFilter) {
    case 'active':
      return tasks.filter(t => !t.completed);
    case 'completed':
      return tasks.filter(t => t.completed);
    default:
      return tasks;
  }
}

function renderTasks() {
  taskList.innerHTML = '';
  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <input
        type="checkbox"
        class="task-checkbox"
        ${task.completed ? 'checked' : ''}
        onchange="handleToggleTask('${task.id}')"
      />
      <span class="task-text">${escapeHtml(task.title)}</span>
      <button class="task-delete" onclick="handleDeleteTask('${task.id}')">Xóa</button>
    `;
    taskList.appendChild(li);
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
