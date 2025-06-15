import { Request, Response } from "express";
import { CreateTaskBodyProps, EditTaskBodyProps, TaskParamsProps } from "./types";

const {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} = require("./taskQueries");

async function listTasks(req: Request, res: Response) {
  try {
    const tasks = await getAllTasks();

    res.status(200).json({ tasks });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: "Erro ao listar tarefas: " + error.stack });
    } else {
      res.status(500).json({ error: "Erro inesperado: " + error });
    }
  }
}

async function addTask(req: Request<{},{},CreateTaskBodyProps>, res: Response) {
  try {
    const { titulo, descricao } = req.body;

    if (!titulo) {
      res.status(400).json({ error: "Dados incompletos!" });
      return;
    }

    const createdTask = await createTask(titulo, descricao);

    res.status(201).json({
      message: "Tarefa criada com sucesso.",
      data: createdTask,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: "Erro ao criar tarefa: " + error.stack });
    } else {
      res.status(500).json({ error: "Erro inesperado: " + error });
    }
  }
}

async function editTask(req: Request<TaskParamsProps,{},EditTaskBodyProps>, res: Response) {
  try {
    const { titulo, descricao, status } = req.body;
    const { id } = req.params;

    if (isNaN(id)) {
      res.status(400).json({error: "ID com formato incorreto, apenas números." });
      return;
    }

    if (!(titulo || status)) {
      res.status(400).json({ error: "Dados incompletos!" });
      return;
    }

    const updatedTask = await updateTask(titulo, descricao, status, id);

    res.status(200).json({
      message: "Tarefa editada com sucesso.",
      data: updatedTask,
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: `Erro ao atualizar tarefa: ` + error.stack });
    } else {
      res.status(500).json({ error: "Erro inesperado: " + error });
    }
  }
}

async function removeTask(req: Request<TaskParamsProps>, res: Response) {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      res
        .status(400)
        .json({ error: "ID com formato incorreto, apenas números." });
      return;
    }

    const deletedTask = await deleteTask(id);

    res.status(200).json({
      message: "Tarefa deletada com sucesso.",
      data: deletedTask,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Erro ao deletar tarefa: ` + error.stack });
    } else {
      res.status(500).json({ error: "Erro inesperado: " + error });
    }
  }
}

module.exports = { addTask, editTask, listTasks, removeTask };
