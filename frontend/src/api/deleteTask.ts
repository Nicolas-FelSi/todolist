async function deleteTask(id: number) {
    try {
        const response = await fetch(`http://localhost:3000/tarefas/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error("Erro ao deletar a tarefa: " + response.statusText);
        }

        const data = response.json();

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default deleteTask;