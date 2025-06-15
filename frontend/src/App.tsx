import { useEffect, useState } from "react";
import CardsTasks from "./components/CardsTasks";
import ModalNewTask from "./components/ModalNewTask";
import getAllTasks from "./api/getAllTasks";
import { toast, ToastContainer } from "react-toastify" 
import { TaskProps } from "./types";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<Array<TaskProps>>([]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const loadTasks = async () => {
    try {
      const data = await getAllTasks(); 
      
      if (data && Array.isArray(data)){
        setTasks(data);
      } else {
        toast.error(data);
      }

    } catch (error) {
      console.log("Erro no componente: " + error);
      setTasks([]);
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
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        { 
          tasks.length != 0 ?
            tasks.map(task => (
                <CardsTasks key={task.id} task={task} setTasks={setTasks} refreshTasks={loadTasks}/>
              )) 
            : (
              <p className="col-span-full text-white">Nenhuma tarefa adicionada</p>
            )
        }
      </ul>

      <ModalNewTask isOpen={isOpen} closeModal={closeModal} refreshTasks={loadTasks}/>
      <ToastContainer/>
    </div>
  )
}

export default App;