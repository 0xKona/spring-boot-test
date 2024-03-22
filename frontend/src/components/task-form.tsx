import { useState } from "react";
import styled from "styled-components";
import moment from 'moment';
import { Button } from "../styles/global-styled-components";
import { MenuItem, TextField } from "@mui/material";

const Wrapper = styled.div`
    margin: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`
const FormContainer = styled.div`
    width: 500px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.72);
    /* border-radius: 16px; */
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
`
const ButtonContainer = styled.div`
    display: flex;
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
                    <TextField label="Task Name" value={taskData.title} onChange={(e) => setTaskData({...taskData, title: e.target.value})}/>
                    
                    <TextField label="Task Description" multiline rows={4} value={taskData.description} onChange={(e) => setTaskData({...taskData, description: e.target.value})}/>
                    
                    <TextField style={{width: '100%'}} value={taskData.status} select label="Task Status" onInput={(e) => setTaskData({...taskData, status: (e.target as HTMLSelectElement).value})}>
                        {taskStatusOptions.map((option: any) => (
                            <MenuItem key={option} value={option.value}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    
                    <TextField style={{width: '100%'}} value={taskData.taskType} select label="Task Type" onChange={(e) => setTaskData({ ...taskData, taskType: e.target.value })}>
                        {taskTypes.map((option: any) => (
                            <MenuItem key={option} value={option.value}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    
                    <TextField label="Url" value={taskData.url} onChange={(e) => setTaskData({...taskData, url: e.target.value})}/>
                </> 
                <ButtonContainer>
                    <Button onClick={() => setTaskForm({open: false, data: null})}>Close Form</Button>
                    <Button onClick={handleSubmit}>{taskForm.data ? "Submit Changes" : "Submit Task"}</Button>
                </ButtonContainer>
            </FormContainer>
        </Wrapper>
    )
}

export default TaskForm;