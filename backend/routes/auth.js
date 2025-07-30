// backend/routes/auth.js
const express = require('express');
const router = express.Router();

// Dummy user (no DB)
const DUMMY_USER = {
    username: 'testuser',
    password: 'test123',
};

// POST /api/login
router.post('/login', (req, res) => {
    // Debug line to see what's coming in (check your server console)
    console.log('Login payload:', req.body);

    const { username, password, email } = req.body || {};
    const userInput = username || email; // allow either, but we expect 'username'

    if (userInput === DUMMY_USER.username && password === DUMMY_USER.password) {
        return res.json({ token: 'mysecrettoken' });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
