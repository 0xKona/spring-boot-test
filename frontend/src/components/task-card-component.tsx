import styled from "styled-components";
import { TaskDataInterface } from "../types/types";
import { Button } from "../styles/global-styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Container from "./task-card-container";
import { taskStatusOptions } from "../utils/dropdown-options";

const DataContainer = styled.div`
    margin: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`
const CardButton = styled(Button)`
    height: 50%;
    background-color: transparent;
    transition: all .15s ease-in-out;
    &:hover{
        background-color: rgba(82, 82, 82, 0.39);
    }
`
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    padding-top: auto;
`

interface props {
    loadTasks: any;
    taskData: TaskDataInterface
    setTaskForm: any
}

const TaskCardComponent = ({loadTasks, taskData, setTaskForm}: props): JSX.Element => {

    const handleDelete = async(): Promise<void> => {
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

    const openTaskMenu = (): void => {
        setTaskForm({open: true, data: taskData})
    }

    const getTaskStatus = (value: string): string => {
        const label = taskStatusOptions.find((option) => option.value === value)
        return label?.label || "Error getting task status"
    }

    return (
        <Container>
            <DataContainer>
                <p>{taskData.title}</p>
                <p>{taskData.description}</p>
                <p>{getTaskStatus(taskData.status)}</p>
            </DataContainer>
            <ButtonContainer>
                <CardButton onClick={handleDelete}><RiDeleteBin6Line size={20}/></CardButton>
                <CardButton onClick={openTaskMenu}><FaEdit size={20}/></CardButton>
            </ButtonContainer>

        </Container>
    )
}

export default TaskCardComponent;