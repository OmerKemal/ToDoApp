import React, { useState } from 'react';
import { createTodo } from '../api';
import { useNavigate } from 'react-router-dom';

const CreateTodo = () => {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to create todos.');
      return;
    }

    try {
      await createTodo({ text }, token);
      navigate('/todos');
    } catch (error) {
      console.error('Failed to create todo:', error);
      alert('Failed to create todo.');
    }
  };

  return (
    <div>
      <h2>Create New Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter todo text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTodo;
