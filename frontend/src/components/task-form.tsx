import { useState } from "react";
import styled from "styled-components";
import moment from 'moment';
import { Button, muiStyles } from "../styles/global-styled-components";
import { MenuItem, TextField } from "@mui/material";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { taskStatusOptions, taskTypes } from "../utils/dropdown-options";

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
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
`
const ButtonContainer = styled.div`
    margin-top: 15px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
`
const CloseButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 15px;
    cursor: pointer;
    color: grey;
    &:hover{
        color: darkgrey;
    }
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
    console.log('Task Data: ', taskData)

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
                <CloseButton onClick={() => setTaskForm({open: false, data: null})}>
                    <AiOutlineCloseSquare size={30}/>
                </CloseButton>
                <h2>{taskForm.data ? `Editing ${taskForm.data.title}` : "New Task"}</h2>
                <>  
                    <TextField style={muiStyles} label="Task Name" value={taskData.title} onChange={(e) => setTaskData({...taskData, title: e.target.value})}/>
                    
                    <TextField style={muiStyles} label="Task Description" multiline rows={4} value={taskData.description} onChange={(e) => setTaskData({...taskData, description: e.target.value})}/>
                    
                    <TextField
                        style={muiStyles}
                        value={taskData.status}
                        select
                        label="Task Status"
                        onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
                    >
                        {taskStatusOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        style={muiStyles}
                        value={taskData.taskType}
                        select
                        label="Task Type"
                        onChange={(e) => setTaskData({ ...taskData, taskType: e.target.value })}
                    >
                        {taskTypes.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    
                </> 
                <ButtonContainer>
                    <Button onClick={handleSubmit}>{taskForm.data ? "Submit Changes" : "Submit Task"}</Button>
                </ButtonContainer>
            </FormContainer>
        </Wrapper>
    )
}

export default TaskForm;