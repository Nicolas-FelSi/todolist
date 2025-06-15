export interface ErrorProp {
    titulo?: string;
}

export interface ModalNewTaskProps {
  isOpen: boolean;
  closeModal: () => void;
  refreshTasks: () => void;
}

export interface ModalEditTaskProps extends ModalNewTaskProps {
    taskClicked: TaskProps;
}

export interface CreateTaskProps {
    titulo: string;
    descricao: string;
}

export interface TaskProps extends CreateTaskProps {
    id: number;
    status: boolean;
}