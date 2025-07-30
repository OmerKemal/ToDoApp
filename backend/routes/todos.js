const express = require('express');
const router = express.Router();

// In-memory store (lost on server restart)
let todos = [];
let nextId = 1;

// Simple auth middleware (expects 'Bearer mysecrettoken')
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (token === 'mysecrettoken') return next();
    return res.status(401).json({ message: 'Unauthorized' });
};

// GET /api/todos
router.get('/', authenticate, (req, res) => {
    res.json(todos);
});

// POST /api/todos   { text: string }
router.post('/', authenticate, (req, res) => {
    const { text } = req.body || {};
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ message: 'text is required' });
    }
    const newTodo = { _id: String(nextId++), text };
    todos.push(newTodo);
    return res.status(201).json(newTodo);
});

// PUT /api/todos/:id   { text: string }
router.put('/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const { text } = req.body || {};
    const todo = todos.find(t => t._id === id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ message: 'text is required' });
    }
    todo.text = text;
    return res.json(todo);
});

// DELETE /api/todos/:id
router.delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const before = todos.length;
    todos = todos.filter(t => t._id !== id);
    if (todos.length === before) return res.status(404).json({ message: 'Todo not found' });
    return res.json({ message: 'Deleted' });
});

module.exports = router;
