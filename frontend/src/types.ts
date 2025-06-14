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

export interface TaskProps {
    id: number;
    titulo: string;
    descricao: string;
    status: boolean;
}