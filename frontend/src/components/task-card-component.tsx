import styled from "styled-components";
import { TaskDataInterface } from "../types/types";

const Container = styled.div`
    width: 400px;
    height: 150px;
    border-radius: 15px;
    padding: 10px;
    background-color: orange;
`

interface props {
    loadTasks: any;
    taskData: TaskDataInterface
    setTaskForm: any
}

const TaskCardComponent = ({loadTasks, taskData, setTaskForm}: props): JSX.Element => {

    const handleDelete = async() => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/api/tasks/${taskData.id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
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

    const openTaskMenu = () => {
        setTaskForm({open: true, data: taskData})
    }

    return (
        <Container>
            <p>{taskData.title}</p>
            <p>{taskData.description}</p>
            <p>{taskData.status}</p>
            <p>{taskData.type}</p>

            <button onClick={handleDelete}>{"Delete This Tasks [No Going Back]"}</button>
            <button onClick={openTaskMenu}>Edit Task</button>
        </Container>
    )
}

export default TaskCardComponent;