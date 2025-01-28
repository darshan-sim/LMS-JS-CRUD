const inputConfig = {
    id: { type: "text", type: "number", hidden: true },
    name: { type: "text", placeholder: "Product Name", required: true, error: "Please enter name" },
    description: { type: "text", placeholder: "Product Name", required: false, error: "Please enter description" },
    price: { type: "number", placeholder: "900", required: true, error: "Please enter price" },
    // category: {type: "text", placeholder: "Product Name", required: true, error: "Please enter name"},
    tags: [],
    quantity: { type: "number", placeholder: "1", required: true, error: "Please enter quantity" },
    images: [],
    offer: { type: "number", placeholder: "10%", required: false, error: "Please enter name" },
    // startTime: { type: "date", placeholder: "None", required: false, error: "Please enter date" },
    // endTime: "",
}

const createLabel = (name) => {
    const label = document.createElement("label")
    label.textContent = name
    label.setAttribute('for', name)
    return label
}

const createInput = (name, config, callback) => {
    const input = document.createElement("input")
    input.type = config.type
    input.id = name
    if (config.hidden) {
        input.hidden = true
        return input
    }
    input.placeholder = config.placeholder
    input.setAttribute("required", config.required)
    console.log(config.required)
    input.addEventListener('input', (e) => callback(e))
    return input
}

const createButton = (type, text, className, callback) => {
    const button = document.createElement("button");
    button.value = text
    button.type = type
    className.forEach(name => {
        button.classList.add(name)
    });
    button.textContent = text
    button.classList.add(...className)
    callback && button.addEventListener('click', (e) => callback(e))
    return button
}

export { createInput, createLabel, createButton, inputConfig }