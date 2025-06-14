import { pool } from "./database.js";

async function getAllTasks() {
    const sql = "SELECT * FROM tarefa";
    const tasks = (await pool.query(sql)).rows;
    return tasks;
}

async function getTaskById(id) {
    const sql = "SELECT * FROM tarefa WHERE id = $1";
    const task = (await pool.query(sql, [id])).rows;
    return task;
}

async function createTask(titulo, descricao) {
    const sql = "INSERT INTO tarefa (titulo, descricao) VALUES ($1, $2) RETURNING *"
    const createdTask = (await pool.query(sql, [titulo, descricao])).rows;
    return createdTask;
}

async function updateTask(titulo, descricao, status, id) {
    const sql = "UPDATE tarefa SET titulo = $1, descricao = $2, status = $3 WHERE id = $4 RETURNING *";
    const updatedTask = (await pool.query(sql, [titulo, descricao, status, id])).rows;
    return updatedTask;
}

async function deleteTask(id) {
    const sql = "DELETE FROM tarefas WHERE id = $1 RETURNING *";
    const deletedTask = (await pool.query(sql, [id])).rows;
    return deletedTask;
}

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };