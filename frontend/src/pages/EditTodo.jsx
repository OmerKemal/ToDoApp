import React, { useEffect, useState } from 'react';
import { getTodos, updateTodo } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const EditTodo = () => {
  const { id } = useParams();
  const [text, setText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      const token = localStorage.getItem('token');
      const todos = await getTodos(token);
      const todo = todos.find((t) => t._id === id);
      if (todo) {
        setText(todo.text);
      } else {
        alert('Todo not found');
        navigate('/');
      }
    };

    fetchTodo();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await updateTodo(id, { text }, token);
      navigate('/');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update todo');
    }
  };

  return (
    <div>
      <h2>Edit Todo</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditTodo;
