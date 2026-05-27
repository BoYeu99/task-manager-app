const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Lưu trữ công việc trong bộ nhớ
let tasks = [
  { id: uuidv4(), title: 'Học Node.js', completed: false, createdAt: new Date() },
  { id: uuidv4(), title: 'Xây dựng ứng dụng quản lý công việc', completed: false, createdAt: new Date() }
];

// Lấy tất cả công việc
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Thêm công việc mới
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Tiêu đề công việc là bắt buộc' });
  }
  
  const newTask = {
    id: uuidv4(),
    title: title.trim(),
    completed: false,
    createdAt: new Date()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Đánh dấu công việc hoàn thành
app.patch('/api/tasks/:id/toggle', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === id);
  
  if (!task) {
    return res.status(404).json({ error: 'Không tìm thấy công việc' });
  }
  
  task.completed = !task.completed;
  res.json(task);
});

// Xóa công việc
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  
  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Không tìm thấy công việc' });
  }
  
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Task Manager API chạy tại http://localhost:${PORT}`);
});
