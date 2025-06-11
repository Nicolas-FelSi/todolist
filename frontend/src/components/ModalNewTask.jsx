import { useState } from "react";
import createTask from "../api/createTask";
import validate from "../utils/validateForm.js"
import { toast } from "react-toastify";

function ModalNewTask({ isOpen, closeModal, refreshTasks }) {
  const [errors, setErrors] = useState([]);
  const [task, setTask] = useState({
    titulo: "",
    descricao: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(task.titulo);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = await createTask(task);

    if (data.message) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }

    refreshTasks();
    setTask({ titulo: "", descricao: "" });
    setErrors([]);
    closeModal();
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <form
            className="bg-white p-4 rounded-sm flex flex-col justify-center relative"
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Adicionar tarefa</h2>
            <hr className="mx-[-1rem] opacity-20 my-4" />
            <div className="w-full">
              <label
                className="uppercase text-xs font-bold mb-2"
                htmlFor="inputTitle"
              >
                Título
              </label>
              <input
                className={`w-full bg-indigo-100 text-gray-700 border ${errors.titulo ? "border-red-600" : ""} rounded py-3 px-4 focus:outline-none focus:bg-white`}
                id="inputTitle"
                type="text"
                name="titulo"
                placeholder="Ex: Estudar Reactjs"
                value={task.titulo}
                onChange={handleChange}
              />
            </div>
            { errors.titulo && <p className="bg-red-200 rounded-sm py-0.5 px-2 border mt-1 border-red-600">{errors.titulo}</p> }
            <div className="w-full mt-3">
              <label
                className="uppercase text-xs font-bold mb-2"
                htmlFor="inputDescription"
              >
                Descrição
              </label>
              <textarea
                className="w-full bg-indigo-100 text-gray-700 border rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
                id="inputDescription"
                name="descricao"
                placeholder="Adicione uma descrição"
                value={task.descricao}
                onChange={handleChange}
              />
            </div>
            <button
              className="p-2 bg-amber-500 rounded-sm cursor-pointer hover:bg-amber-600 transition-all hover:scale-105"
              type="submit"
            >
              Adicionar
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ModalNewTask;
