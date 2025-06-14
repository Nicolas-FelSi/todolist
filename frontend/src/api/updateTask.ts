import { TaskProps } from "../types";

async function updateTask(task: TaskProps) {
    try {
        const response = await fetch(`http://localhost:3000/tarefas/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })

        if (!response.ok) {
            throw new Error("Erro ao editar tarefa: " + response.statusText);
        }

        const data = (await response).json();

        return data;
    } catch (error) {
        console.log("Erro ao editar tarefa: " + error);
        throw error;
    }
}

export default updateTask;