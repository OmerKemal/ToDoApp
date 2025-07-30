const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);        // POST /api/login
app.use('/api/todos', todoRoutes);  // CRUD /api/todos

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// app.use(express.json()); // or bodyParser.json()
// app.use('/api', authRoutes);
// app.use('/api/todos', todoRoutes);
