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
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  return (
    <div className="page" data-testid="todos-page">
      <div className="content">
        <div className="card">
          <h2 className="heading" data-testid="todos-heading">Todos</h2>

          <Link className="button" data-testid="create-todo-link" to="/create">
            Create New Todo
          </Link>

          <ul className="todo-list" data-testid="todos-list">
            {todos.map((todo) => (
              <li key={todo._id} data-testid="todo-item" data-todo-id={todo._id}>
                <span className="text" data-testid="todo-text">{todo.text}</span>

                <div className="actions">
                  <button
                    type="button"
                    className="button button--dark-outline"
                    data-testid="todo-edit-button"
                    data-todo-id={todo._id}
                    onClick={() => navigate(`/edit/${todo._id}`)}  {/* fixed backticks */}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="button button--dark-outline"
                    data-testid="todo-delete-button"
                    data-todo-id={todo._id}
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
