import { useEffect, useState } from "react";
import ModalEditTask from "./ModalEditTask";
import getAllTasks from "../api/getAllTasks";
import deleteTask from "../api/deleteTask";
import { toast } from "react-toastify";

function CardsTasks({ task, setTasks, refreshTasks }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const loadTasks = async () => {
    setTasks(await getAllTasks());
  }

  const handleDelete = async () => {
    const data = await deleteTask(task.id_tarefa)

    if (data.message) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }

    refreshTasks();
  }

  useEffect(() => {
    loadTasks()
  }, []);

  return (
    <>
      <li onClick={openModal} className="bg-indigo-950 w-xs p-4 text-white border-indigo-900 border rounded-lg hover:scale-105 transition-all cursor-pointer">
        <h3 className="text-xl">{task.titulo}</h3>
        <hr className="mx-[-1rem] opacity-20 my-4" />
        <p className="opacity-80 text-center">
          {task.descricao == "" ? "Descrição vazia" : task.descricao}
        </p>
        <hr className="mx-[-1rem] opacity-20 my-4" />
        <div className="flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
          <button className="p-1 rounded-sm shadow-2xl cursor-pointer bg-green-400">
            <img width={"20px"} src="\verificar.svg" alt="icone de concluir tarefa" />
          </button>
          <p className="text-center text-amber-600">
            {task.status == false ? "Pendente" : "Concluída"}
          </p>
          <button className="p-1 rounded-sm shadow-2xl cursor-pointer bg-red-400" onClick={handleDelete}>
            <img width={"20px"} src="\lixo.svg" alt="icone de deletar tarefa" />
          </button>
        </div>
      </li>

      <ModalEditTask isOpen={isOpen} closeModal={closeModal} refreshTasks={loadTasks} taskClicked={task}/>
    </>
  );
}

export default CardsTasks;
