import createModal from "./createModal.js";

console.log("Hello")

window.addEventListener("DOMContentLoaded", () => {
    const button = document.createElement('button')
    button.type = 'button'
    button.addEventListener('click', () => createModal.showCreateModel())
    button.innerText = "Click"
    root.append(button)
})