import { useState } from "react";
import styled from "styled-components";
import moment from 'moment';

const Wrapper = styled.div`
    margin: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: pink;
    display: flex;
    justify-content: center;
    align-items: center;
`
const FormContainer = styled.div`
    width: 500px;
    border-radius: 15px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: whitesmoke;
`

const TaskForm = ({loadTasks, taskForm, setTaskForm} : any): JSX.Element => {

    const getCurrentDate = () => {
        const time = moment().format('YYYY-MM-DD HH:mm:ss');
        return time
    }

    const [taskData, setTaskData] = useState(
        taskForm.data ??
            {title: '', description: '', status: 'TO_DO', taskType: "BUG"}
    );
    console.log(taskData)
    const taskTypes = ['BUG', 'FEATURE', 'REFACTOR'];
    const taskStatusOptions = ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'COMPLETED'];

    const submitNewTask = async() => {
        try {
            const response = await fetch("http://127.0.0.1:8080/api/tasks", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...taskData, date_created: getCurrentDate()})
              });
            if (response.ok) {
                loadTasks();
            } else {
                console.log("Error Submitting Task");
            }
          } catch (error) {
            console.log(error)
          }
    }

    const submitTaskChanges = async() => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/api/tasks/${taskForm.data.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...taskData, date_updated: getCurrentDate()})
              });
            if (response.ok) {
                loadTasks();
            } else {
                console.log("Error Submitting Task");
            }
          } catch (error) {
            console.log(error)
          }
    }

    const handleSubmit = async() => {
        if (taskForm.data) {
            await submitTaskChanges();
            setTaskForm({open: false, data: null});
        } else {
            await submitNewTask();
            setTaskForm({open: false, data: null});
        }
    }

    return (
        <Wrapper>
            <FormContainer>
                <h2>{taskForm.data ? `Editing ${taskForm.data.title}` : "New Task"}</h2>
                <>  
                    <input placeholder="Task Title" value={taskData.title} onChange={(e) => setTaskData({...taskData, title: e.target.value})}/>
                    <input placeholder="Task Description" value={taskData.description} onChange={(e) => setTaskData({...taskData, description: e.target.value})}/>

                    <select onInput={(e) => setTaskData({...taskData, status: (e.target as HTMLSelectElement).value})}>
                        {taskStatusOptions.map((option: any) => (<option key={option}>{option}</option>))}
                    </select>

                    <select onInput={(e) => setTaskData({...taskData, taskType: (e.target as HTMLSelectElement).value})}>
                        {taskTypes.map((option: any) => (<option key={option}>{option}</option>))}
                    </select>

                    <input placeholder="Task Url" value={taskData.url} onChange={(e) => setTaskData({...taskData, url: e.target.value})}/>
                </>
                <button onClick={handleSubmit}>{taskForm.data ? "Submit Changes" : "Submit New Task"}</button>
                <button onClick={() => setTaskForm({open: false, data: null})}>Close Form</button>
            </FormContainer>
        </Wrapper>
    )
}

export default TaskForm;