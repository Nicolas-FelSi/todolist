async function deleteTask(id_tarefa: number) {
    try {
        const response = fetch(`http://localhost:3000/tarefas/${id_tarefa}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = (await response).json();

        return data;
    } catch (error) {
        console.log("Erro ao deletar tarefa: " + error);
    }
}

export default deleteTask;