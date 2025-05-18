import { useEffect, useState } from "react";
import CardsTasks from "./components/CardsTasks";
import ModalNewTask from "./components/ModalNewTask";
import getAllTasks from "./api/getAllTasks";
import { ToastContainer } from "react-toastify" 

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const loadTasks = async () => {
    try {
      setTasks(await getAllTasks(setTasks));
    } catch (error) {
      console.log("Erro em listar tarefas: " + error);      
    }
  }

  useEffect(() => {
    loadTasks()
  }, []);

  return (
    <div className="flex flex-col items-center font-semibold gap-4 p-8">
      <button 
        onClick={openModal} 
        className="p-3 bg-amber-500 rounded-sm w-3xs cursor-pointer hover:bg-amber-600 transition-all hover:scale-105"
      >
        Adicionar tarefa
      </button>
      <ul className="grid grid-cols-3 gap-4">
        {
          tasks.map(task => (
            <CardsTasks key={task.id} task={task} />
          ))
        }
      </ul>

      <ModalNewTask isOpen={isOpen} closeModal={closeModal} refreshTasks={loadTasks}/>
      <ToastContainer/>
    </div>
  )
}

export default App;