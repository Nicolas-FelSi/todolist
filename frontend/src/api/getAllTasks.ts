import { TaskProps } from "../types";

async function getAllTasks(): Promise<TaskProps[]> {
    try {
        const response = await fetch("http://localhost:3000/tarefas", {
        method: "GET"
        })

        if (!response.ok) {
            let errorMessage = `Erro em buscar tarefas: ${response.statusText}`;
            
            try {
                const data = await response.json();
                
                if (data && data.error) {
                    errorMessage = data.error;
                }
            } catch (error) {
                console.log("Não foi possível capturar o erro da resposta: " + error);
            }

            throw new Error(errorMessage);
        }
    
        const data = await response.json();

        if (!Array.isArray(data.tasks)) {
            throw new Error("A resposta da API não retornou um array.");
        }

        return data.tasks;
    } catch (error) {
        console.log("Erro em buscar tarefas: " + error);
        throw error;
    }
}

export default getAllTasks;