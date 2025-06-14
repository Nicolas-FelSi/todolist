import { TaskProps } from "../types";

async function createTask(task: TaskProps) {
    try {
        const response = await fetch("http://localhost:3000/tarefas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })

        if (!response.ok) {
            throw new Error(`Falha em criar a tarefa: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Erro ao criar tarefa: " + error);
        throw error;
     }
}

export default createTask;