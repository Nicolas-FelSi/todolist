import { toast } from "react-toastify";
import getAllTasks from "./getAllTasks";

async function createTask(task) {
    try {
        const response = fetch("http://localhost:3000/tarefas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })

        const data = (await response).json();

        if (!data.error) {
            toast.success(data.message);
        } else {
            toast.error(data.error);
        }

        await getAllTasks();
    } catch (error) {
        console.log("Erro ao criar tarefa: " + error);
    }
}

export default createTask;