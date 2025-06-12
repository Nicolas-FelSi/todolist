import { TaskProps } from "../types";

async function updateTask(task: TaskProps) {
    try {
        const response = fetch(`http://localhost:3000/tarefas/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })

        const data = (await response).json();

        return data;
    } catch (error) {
        console.log("Erro ao editar tarefa: " + error);
    }
}

export default updateTask;