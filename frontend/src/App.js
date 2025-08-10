import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/header';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import CreateTodo from './pages/CreateTodo';
import EditTodo from './pages/EditTodo';
import Layout from './components/Layout';
import './styles.css';

const isAuthenticated = () => !!localStorage.getItem('token');

function App() {
  return (
    <Router>
      <Header />  {/* Always visible */}
      <Routes>
        <Route path="/login" element={<Layout title="Login"><Login /></Layout>} />
        <Route path="/todos" element={<Layout title="Todos"><TodoList /></Layout>} />
        <Route path="/create" element={<Layout title="Create a Todo"><CreateTodo /></Layout>} />
        <Route path="/edit/:id" element={<Layout title="Edit Todo"><EditTodo /></Layout>} />
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
