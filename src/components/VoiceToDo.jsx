import { useState, useEffect } from 'react';
import { useVoiceCommand } from '../hooks/useVoiceCommand';
import { MdDeleteForever } from "react-icons/md";
import { TiInputChecked } from "react-icons/ti";
import "./VoiceToDo.css";

export const VoiceToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useVoiceCommand((task) => {
    setTasks(prev => [...prev, { id: Date.now(), text: task, done: false }]);
  });

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="voice-todo">
      <h1>Voice ToDo 📢</h1>
      <div className='inputBtn-div'>
        <input
          className="task-input"
          type="text"
          value={input}
          placeholder="Add a Task"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button className="add-btn" onClick={addTask}>+</button>
      </div>
      <ul className="task-list">
        {tasks.map(t => (
          <li key={t.id} className={`task-item ${t.done ? "done" : ""}`}>
            <span>{t.text}</span>
            <button className="done-btn" onClick={() => toggleDone(t.id)}>
              <TiInputChecked />
            </button>
            <button className="delete-btn" onClick={() => deleteTask(t.id)}>
              <MdDeleteForever />
            </button>
          </li>
        ))}
      </ul>
      <p><i>Try saying: "Add Task: call one"</i></p>
    </div>
  );
};
