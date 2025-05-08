import express from "express"
import dotenv from "dotenv";
import pool from "./database/database.js";
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"]
}))

try {
    await pool.connect();
    console.log("Conexão com banco de dados realizada com sucesso!");
} catch (error) {
    console.log("Erro na conexão do banco de dados. Erro: " + error.stack);
}

app.post("/tarefas", async (req, res) => {
    const sql = "INSERT INTO tarefas (titulo, descricao, status) VALUES ($1, $2, $3)"
    const { titulo, descricao } = req.body;

    if (!titulo) {
        res.status(400).json({ error: "Dados incompletos!" });
        return;
    }

    try {
        await pool.query(sql, [titulo, descricao, "Pendente"]);
        res.status(200).json({  
            message: "Dados incluídos com sucesso.", 
            data: req.body
        });
    } catch (error) {
        res.status(400).send("Erro ao criar tarefa: " + error.stack);
    }
});

app.get("/tarefas", async (req, res) => {
    const sql = "SELECT * FROM tarefas";

    try {
        const tasks = (await pool.query(sql)).rows;
        
        res.status(200).send(tasks.length != 0 ? tasks : "Nenhuma tarefa cadastrada.");
    } catch (error) {
        res.status(400).send("Erro ao listar tarefas: " + error.stack);
    }
})

app.get("/tarefas/:id", async (req, res) => {
    const sql = "SELECT * FROM tarefas WHERE id = $1";
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send("ID com formato incorreto, apenas números.");
        return;
    }

    try {
        const task = (await pool.query(sql, [id])).rows;
        res.status(200).send(task.length != 0 ? task : "Nenhuma tarefa com esse id.");
    } catch (error) {
        res.status(400).send(`Erro ao encontrar tarefa com id ${id}: ` + error.stack);
    }
})

app.put("/tarefas/:id", async (req, res) => {
    const { titulo, descricao, status } = req.body;
    const { id } = req.params;
    const sql = "UPDATE tarefas SET titulo = $1, descricao = $2, status = $3 WHERE id = $4 RETURNING *";

    if (isNaN(id)) {
        res.status(400).send("ID com formato incorreto, apenas números.");
        return;
    }

    if(!(titulo || status)) {
        res.status(400).send("Dados incompletos!");
        return;
    }

    try {
        const task = (await pool.query(sql, [titulo, descricao, status, id])).rows;
        console.log(task)
        res.status(200).send(task.length != 0 ? task : "Nenhuma tarefa com esse id.");
    } catch (error) {
        res.status(400).send(`Erro ao atualizar tarefa com id ${id}: ` + error.stack);
    }
})

app.delete("/tarefas/:id", async (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM tarefas WHERE id = $1";

    if (isNaN(id)) {
        res.status(400).send("ID com formato incorreto, apenas números.");
        return;
    }

    try {
        await pool.query(sql, [id]);
        res.status(200).send("Tarefa deletada com sucesso.");
    } catch (error) {
        res.status(400).send(`Erro ao deletar tarefa com id ${id}: ` + error.stack);
    }
})

app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT)
})