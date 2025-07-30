import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import TodoList from './pages/TodoList';
import CreateTodo from './pages/CreateTodo';
import EditTodo from './pages/EditTodo';

const isAuthenticated = () => !!localStorage.getItem('token');

function App() {
  return (
    <Router>
      <Routes>
        {/* Smart root: go to /todos if logged in, otherwise /login */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated() ? '/todos' : '/login'} replace />}
        />

        {/* If already logged in, prevent viewing login page */}
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/todos" replace /> : <Login />}
        />

        {/* Protected routes */}
        <Route
          path="/todos"
          element={isAuthenticated() ? <TodoList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/create"
          element={isAuthenticated() ? <CreateTodo /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/edit/:id"
          element={isAuthenticated() ? <EditTodo /> : <Navigate to="/login" replace />}
        />

        {/* Optional: catch-all to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
