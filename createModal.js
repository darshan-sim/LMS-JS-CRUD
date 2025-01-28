import product from "./product.js"
import { createInput, createLabel, createButton, inputConfig } from "./utils.js"

const createModal = (function() {

    const handleSubmit = (e, formEle) => {
        e.preventDefault()
        const form = e.target
        form.parentNode.removeChild(form);
    }

    const handleInput = (e) => {
        console.log(e.target.value)
    }

    const createForm = () => {
        const newProduct = product.createEmptyProduct()
        const form = document.createElement('form');
        form.addEventListener('submit', handleSubmit)

        const inputs = Object.keys(newProduct).map(key => {
            const inputRules = inputConfig[key]
            if (!inputRules) {
                return null
            }
            const div = document.createElement("div")
            const label = key != "id" ? createLabel(key) : null
            const input = createInput(key, inputRules, handleInput)
            if (label) div.append(label);
            div.append(input)
            form.append(div)
            return input;
        })
        const button = createButton("submit", "Submit", ["button", "submit"], () => { console.log("submit") })
        form.append(button)
        root.append(form)
    }
    return {
        showCreateModel: createForm
    }
})()

export default createModal