import React, { useEffect, useState } from 'react'
import USSDSimulator from '../components/USSDSimulator';

const Dashboard = () => {
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });
    const [issues, setIssues] = useState(() => {
        const saved = localStorage.getItem('issues');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },[tasks]);

    useEffect(() => {
        localStorage.setItem('issues', JSON.stringify(issues));
    },[issues]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(description || assignee || dueDate !== '') {
            const newTask = {
                id: Date.now(),
                description,
                assignee,
                dueDate,
                status: 'Pending',
            };
    
            setTasks([...tasks, newTask]);
    
            //Clear form
            setDescription('');
            setAssignee('');
            setDueDate('');
        } else {
            alert('Please fill in all fields');
        };
    };

    const completeTask = (id) => {
        const updated = tasks.map((task) => 
            task.id === id 
            ? {...task, status: 'completed'} 
            :  task);
        setTasks(updated);
    }

    const reportIssue = (text) => {
        const newIssue = {
            id: Date.now(),
            text,
            date: new Date().toLocaleString(),
        };
        setIssues([...issues,newIssue]);
    };

  return (
    <div className='dashboard'>
        <h2>Task Manager Dashboard</h2>

        <div className="task-form">
            <h3>Assign New Task</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Task Description:
                    <input 
                        type="text" 
                        name='description' 
                        onChange={(e) => setDescription(e.target.value)}/>
                </label>

                <label>
                    Assigned To:
                    <input 
                        type="text" 
                        name='assignee'
                        onChange={(e) => setAssignee(e.target.value)} />
                </label>
                <br />

                <label>
                    Due Date:
                    <input 
                        type="date" 
                        name='due'
                        onChange={(e) => setDueDate(e.target.value)} />
                </label>
                <br />
                <button type='submit'>Assign Task</button>
            </form>
        </div>

        <div className="task-list">
            <h3>Current Tasks</h3>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>{task.description}</strong><br />
                        Assigned to: {task.assignee}<br />
                        Due: {task.dueDate}<br />
                        Status: <span style={{color: task.status === 'completed' ? 'green' : 'orange'}}>
                            {task.status}
                        </span>
                    </li>
                ))}
            </ul>
        </div>

        <div className="issue-list">
            <h3>Reported Issues</h3>
            {issues.length === 0 ? (
                <p>NO issues reported.</p>
            ) : (
                <ul>
                    {issues.map((issue) => (
                        <li key={issue.id}>
                            {issue.text} <br />
                            <small>{issue.date}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
      <USSDSimulator 
        tasks={tasks} 
        onCompleteTask={completeTask}
        onReportIssue ={reportIssue} />
    </div>
  )
}

export default Dashboard
