async function getAllTasks() {
    try {
        const response = await fetch("http://localhost:3000/tarefas", {
        method: "GET"
        })
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Erro em listar tarefas: " + error);
    }
}

export default getAllTasks;