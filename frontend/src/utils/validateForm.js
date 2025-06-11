function validate(titleTask) {
    const newErrors = {};

    if (titleTask == "") {
        newErrors.titulo = "Preencha o título.";
    }

    return newErrors;
}

export default validate;