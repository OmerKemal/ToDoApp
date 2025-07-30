// frontend/src/api.js
const API_BASE = 'http://localhost:5000/api';

// -------------------- AUTH --------------------
export const login = async (arg1, arg2) => {
    // Supports login(username, password) OR login({ username, password })
    let payload;
    if (typeof arg1 === 'object' && arg1 !== null) {
        payload = { username: arg1.username, password: arg1.password };
    } else {
        payload = { username: arg1, password: arg2 };
    }

    const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Login failed');
    return res.json(); // { token: 'mysecrettoken' }
};

// -------------------- TODOS --------------------
export const getTodos = async (token) => {
    const res = await fetch(`${API_BASE}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to load todos');
    return res.json();
};

export const createTodo = async (todo, token) => {
    const res = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(todo), // e.g., { text: 'Buy milk' }
    });
    if (!res.ok) throw new Error('Failed to create todo');
    return res.json();
};

export const updateTodo = async (id, todo, token) => {
    const res = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(todo), // e.g., { text: 'Updated text' }
    });
    if (!res.ok) throw new Error('Failed to update todo');
    return res.json();
};

export const deleteTodo = async (id, token) => {
    const res = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete todo');
    // backend returns { message: 'Deleted' } — no body needed by caller
    return res.json();
};
