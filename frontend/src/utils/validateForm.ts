import { ErrorProp } from "../types";

function validate(titleTask: string) {
    const newErrors: ErrorProp = {};

    if (titleTask == "") {
        newErrors.titulo = "Preencha o título.";
    }

    return newErrors;
}

export default validate;