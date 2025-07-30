import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo } from '../api';
import { Link, useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const data = await getTodos(token);
      setTodos(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteTodo(id, localStorage.getItem('token'));
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div>

      <h2 data-testid="todos-heading">Todos</h2>
      <Link to="/create">Create New Todo</Link>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => navigate(`/edit/${todo._id}`)}>Edit</button>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
