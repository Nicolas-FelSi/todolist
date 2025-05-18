function CardsTasks({task}) {
    return (
        <>
            <li className="bg-indigo-950 p-4 text-white border-indigo-400 border rounded-lg hover:scale-105 transition-all cursor-pointer">
                <h3 className="text-xl">{ task.titulo }</h3>
                <hr className="mx-[-1rem] opacity-50 my-4"/>
                <p className="opacity-80">{ task.descricao }</p>
                <hr className="mx-[-1rem] opacity-50 my-4"/>
                <p className="text-center text-amber-600">{ task.status }</p>
            </li>
        </>
    )
}

export default CardsTasks;