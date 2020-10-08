import moment from 'moment';
import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import Input from './Components/Input/Input';
import Task from './Components/Task/Task';
const { uuid } = require('uuidv4');

export type TaskType = {
  title: string,
  id: number,
  completedAt: number | null,
}

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks') || '') || [];
}

function updateStorage(tasklist : TaskType[] = []) {
  localStorage.setItem('tasks', JSON.stringify(tasklist.filter((task: TaskType) => !task.completedAt)));
}

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [init, setInit] = useState<boolean>(false);
  const prevTasks = usePrevious(tasks);

  useEffect(()=>{
    if (!init) {
      setTasks(getTasks());
      setInit(true)
    } else {
      if (JSON.stringify(prevTasks) !== JSON.stringify(tasks)) {
        updateStorage(tasks)
      } 
    }
  })

  const onToggle = (id: number) => {
    
      const index = tasks.findIndex(item => item.id === id);
      const newTask = {...tasks[index]};
      newTask.completedAt = !newTask.completedAt ? moment.now() : null;
      const newTasks = [...tasks];
      newTasks[index] = newTask;
      console.log('newTasks', newTasks)
      setTasks(newTasks); 
    
  };

  const onRemove = (id: number) => {
    setTasks(tasks.filter(item => item.id !== id))
  }

  const onAddTask = (task: string) => {
    if (task !== '') {
      setTasks([...tasks, {
        title: task,
        id: uuid(),
        completedAt: null,
      }])
    }
  }

  const sortedTask = [...tasks].sort((a,b)=> (!!a.completedAt ? a.completedAt : 0) - (!!b.completedAt ? b.completedAt : 0));
  return (
    <div className="app">
        <h1 className="app__main-heading">Task Manager</h1>
        <h2 className="app__heading">Work</h2>
        <Input onAddTask={onAddTask}/>
        <div>
          {sortedTask.map(task => (
            <Task 
              key={task.id} 
              task={task} 
              onToggle={onToggle} 
              onRemove={onRemove} 
            />
          ))}
        </div>
      </div>
  );
}

export default App;
