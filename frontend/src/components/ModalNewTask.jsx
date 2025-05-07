function ModalNewTask({isOpen, closeModal}) {
    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
                    onClick={closeModal}
                >
                    <form className="bg-white p-4 rounded-sm flex flex-col justify-center relative">
                        <h2>Adicionar tarefa</h2>
                        <hr className="mx-[-1rem] opacity-20 my-4"/>
                        <div className="w-full">
                            <label className="uppercase text-xs font-bold mb-2" htmlFor="inputTitle">
                                Título
                            </label>
                            <input
                                className="w-full bg-indigo-100 text-gray-700 border rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
                                id="inputTitle"
                                type="text"
                                placeholder="Ex: Estudar Reactjs"
                            />
                        </div>
                        <div className="w-full">
                            <label className="uppercase text-xs font-bold mb-2" htmlFor="inputDescription">
                                Descrição
                            </label>
                            <textarea
                                className="w-full bg-indigo-100 text-gray-700 border rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
                                id="inputDescription"
                                placeholder="Adicione uma descrição"
                            />
                        </div>
                        <button
                            className="p-2 bg-amber-500 rounded-sm cursor-pointer hover:bg-amber-600 transition-all hover:scale-105"
                            onClick={closeModal}
                        >
                            Adicionar tarefa
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}

export default ModalNewTask