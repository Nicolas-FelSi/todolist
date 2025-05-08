import { useEffect, useState } from "react";
import CardsTasks from "./components/CardsTasks";
import ModalNewTask from "./components/ModalNewTask";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    async function getTasks() {
      const response = await fetch("http://localhost:3000/tarefas", {
        method: "GET"
      })

      console.log(await response.json());
    }
    getTasks();
  }, []);

  return (
    <div className="flex flex-col items-center font-semibold gap-4 h-screen bg-gray-900 p-8">
      <button 
        onClick={openModal} 
        className="p-3 bg-amber-500 rounded-sm w-3xs cursor-pointer hover:bg-amber-600 transition-all hover:scale-105"
      >
        Adicionar tarefa
      </button>
      <ul className="grid grid-cols-3 gap-4">
        <CardsTasks/>
        <CardsTasks/>
      </ul>

      <ModalNewTask isOpen={isOpen} closeModal={closeModal}/>
    </div>
  )
}

export default App;