import React, { useState } from 'react'
import './USSDSimulator.css'

const USSDSimulator = ({tasks, onCompleteTask, onReportIssue}) => {
    const [screen, setScreen] = useState('menu');
    const [inputValue, setInputValue] = useState('');
    const [issueText, setIssueText] = useState('');

    const handleOptionSelect = (e) => {
        e.preventDefault();
        if(inputValue === '1') {
            setScreen('view-tasks');
        } else if(inputValue === '2'){
            setScreen('mark-complete')
        } else if(inputValue === '3') {
            setScreen('report-issue');
        } else {
            setScreen('menu');
        }
        setInputValue('');
    }

    const handleComplete = (e) => {
        e.preventDefault();
        const taskIndex = parseInt(inputValue) - 1;
        if(tasks[taskIndex]) {
            onCompleteTask(tasks[taskIndex].id);
            setScreen('menu');
        } else {
            alert('Invalid task number');
        }
        setInputValue('');
    };

  return (
    <div>
      <div className="ussd-sim">
        <h3>USSD Simulator</h3>
        <div className="ussd-screen">
            {screen === 'menu' && (
                <>
                    <p>*123#</p>
                    <p>1. View My Tasks</p>
                    <p>2. Mark Task Complete</p>
                    <p>3. Report an Issue</p>
                    <form onSubmit={handleOptionSelect}>
                        <input      
                            type="text"
                            placeholder='Enter option'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}/>
                            <button type='submit
                            '>send</button>
                    </form>
                </>
            )}

            {screen === 'view-tasks' && (
                <>
                    <p><strong>My Tasks:</strong></p>
                    {tasks.length === 0 ? (
                        <p>No tasks assigned.</p>
                    ) : (
                        <ul>
                            {tasks.map((task) => (
                                <li key={task.id}> {task.description} </li>
                            ))}
                        </ul>
                    )}
                    <button onClick={() => setScreen('menu')}>Back</button>
                </>
            )}

            {screen === 'mark-complete' && (
                <>
                    <p>Select task number to mark as complete:</p>
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={task.id}>
                                {index + 1}. {task.description} ({task.status})
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleComplete}>
                        <input 
                            type="text"
                            placeholder='Enter task number'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} />
                        <button type='submit'>Complete</button>
                    </form>
                    <button onClick={() => setScreen('menu')}>Back</button>
                </>
            )}

            {screen === 'report-issue' && (
                <>
                    <p>Describe the issue (max 100 chars):</p>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if(issueText.length > 0) {
                            onReportIssue(issueText.trim());
                            setIssueText('');
                            setScreen('menu');
                        } else {
                            alert('Issue cannot be empty')
                        }
                    }}>
                        <input 
                            type="text"
                            value={issueText}
                            onChange={(e) => setIssueText(e.target.value)}
                            maxLength={100} />
                            <button type='submit'>Send</button>
                    </form>
                    <button onClick={() => setScreen('menu')}>Back</button>
                </>
            )}
        </div>
      </div>
    </div>
  )
}

export default USSDSimulator
