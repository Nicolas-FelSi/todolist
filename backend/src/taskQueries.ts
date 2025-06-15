const { pool } = require("./database");

async function getAllTasks() {
    const sql = "SELECT * FROM tarefa";
    const tasks = (await pool.query(sql)).rows;
    return tasks;
}

async function getTaskById(id: number) {
    const sql = "SELECT * FROM tarefa WHERE id = $1";
    const task = (await pool.query(sql, [id])).rows;
    return task;
}

async function createTask(titulo: string, descricao: string) {
    const sql = "INSERT INTO tarefa (titulo, descricao) VALUES ($1, $2) RETURNING *"
    const createdTask = (await pool.query(sql, [titulo, descricao])).rows;
    return createdTask;
}

async function updateTask(titulo: string, descricao: string, status: boolean, id: number) {
    const sql = "UPDATE tarefa SET titulo = $1, descricao = $2, status = $3 WHERE id = $4 RETURNING *";
    const updatedTask = (await pool.query(sql, [titulo, descricao, status, id])).rows;
    return updatedTask;
}

async function deleteTask(id: number) {
    const sql = "DELETE FROM tarefa WHERE id = $1 RETURNING *";
    const deletedTask = (await pool.query(sql, [id])).rows;
    return deletedTask;
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };