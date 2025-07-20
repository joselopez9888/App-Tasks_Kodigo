import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import './App.css';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    const tasksCollection = collection(db, 'tasks');
    const taskSnapshot = await getDocs(tasksCollection);
    const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
    setTasks(taskList);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask.trim() === '') return;

    await addDoc(collection(db, 'tasks'), {
      text: newTask,
      completed: false,
    });

    setNewTask('');
    fetchTasks();
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(task => task.id === id);
    if (!task) return;

    const taskDoc = doc(db, 'tasks', id);
    await updateDoc(taskDoc, { completed: !task.completed });

    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTask(task.id)}>{task.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
