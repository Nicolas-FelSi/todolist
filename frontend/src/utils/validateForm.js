function validate(task) {
    const newErrors = {};

    if (task.titulo == "") {
        newErrors.titulo = "Preencha o título.";
    }

    return newErrors;
}

export default validate;