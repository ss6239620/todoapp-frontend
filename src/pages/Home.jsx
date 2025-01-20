import React, { useEffect, useState } from 'react';
import '../asset/css/Home.css'; // Importing the CSS file
import { SERVER_URL_API } from '../constat';

const Home = () => {
  const [todo, setTodo] = useState('');
  const token = localStorage.getItem('token');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch(`${SERVER_URL_API}/read-todos`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setTodos(data.todos);
    };

    getTodos();
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${SERVER_URL_API}/create-todo`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo }),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error('Error creating todo:', response.status);
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }

    setTodo('');
  };

  const handleEdit = async (todoId) => {
    const updatedTodo = prompt('Update your todo');

    const response = await fetch(`${SERVER_URL_API}/update-todo/${todoId}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedTodo }),
    });

    const data = await response.json();
    alert(data.message);
    window.location.reload();
  };

  const handleDelete = async (todoId) => {
    const response = await fetch(`${SERVER_URL_API}/delete-todo/${todoId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    alert(data.message);
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <section className="home-section">
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          className="todo-input"
          type="text"
          placeholder="Add a new todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="todo-submit" type="submit">
          Add Todo
        </button>
      </form>
      <div className="todo-list">
        {todos.map((todo) => (
          <div className="todo-item" key={todo._id}>
            <span className="todo-text">{todo.todo}</span>
            <button className="todo-edit" onClick={() => handleEdit(todo._id)}>
              Edit
            </button>
            <button className="todo-delete" onClick={() => handleDelete(todo._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
};

export default Home;
