export interface CreateTaskBodyProps {
    titulo: string;
    descricao: string;
}

export interface EditTaskBodyProps extends CreateTaskBodyProps {
    status: boolean;
}

export interface TaskParamsProps {
    id: number;
}