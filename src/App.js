import React, { useState, useEffect } from 'react';

export default function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todoAppTodos'));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todoAppTodos', JSON.stringify(todos));
  }, [todos]);

  const handleAddOrUpdate = () => {
    if (task.trim() === '') return;

    if (isEditing) {
      const updated = [...todos];
      updated[editIndex].text = task;
      setTodos(updated);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: task, completed: false }]);
    }
    setTask('');
  };

  const handleToggle = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const handleEdit = (index) => {
    setTask(todos[index].text);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <h1>Todo List App</h1>
      <button className="toggle-theme" onClick={toggleDarkMode}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>{isEditing ? 'Update' : 'Add'}</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => handleToggle(index)}>{todo.text}</span>
            <div className="actions">
              <button onClick={() => handleEdit(index)}>✏️</button>
              <button onClick={() => handleDelete(index)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
