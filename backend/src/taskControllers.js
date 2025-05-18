import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "./taskQueries.js";

async function listTasks(req, res) {
  try {
    const tasks = await getAllTasks();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json("Erro ao listar tarefas: " + error.stack);
  }
}

async function findTaskById(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      res
        .status(400)
        .json({ error: "ID com formato incorreto, apenas números." });
      return;
    }

    const task = await getTaskById(id);

    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json(`Erro ao encontrar tarefa com id ${id}: ` + error.stack);
  }
}

async function addTask(req, res) {
  try {
    const { titulo, descricao } = req.body;

    if (!titulo) {
      res.status(400).json({ error: "Dados incompletos!" });
      return;
    }

    const createdTask = await createTask(titulo, descricao);

    res.status(201).json({
      message: "Dados incluídos com sucesso.",
      data: createdTask,
    });
  } catch (error) {
    res.status(500).json("Erro ao criar tarefa: " + error.stack);
  }
}

async function editTask(req, res) {
  try {
    const { titulo, descricao, status } = req.body;
    const { id } = req.params;

    if (isNaN(id)) {
      res.status(400).json("ID com formato incorreto, apenas números.");
      return;
    }

    if (!(titulo || status)) {
      res.status(400).json("Dados incompletos!");
      return;
    }

    const updatedTask = await updateTask(titulo, descricao, status, id);

    res.status(200).json({
      message: "Tarefa editada com sucesso.",
      data: updatedTask,
    });
  } catch (error) {
    res
      .status(500)
      .json(`Erro ao atualizar tarefa com id ${id}: ` + error.stack);
  }
}

async function removeTask(req, res) {
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
    res.status(500).json(`Erro ao deletar tarefa com id ${id}: ` + error.stack);
  }
}

export { addTask, editTask, findTaskById, listTasks, removeTask };
