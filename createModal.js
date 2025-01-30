import product from "./product.js";
import {
	createInput,
	createLabel,
	createButton,
	inputConfig,
	showErrors
} from "./utils.js";

const createModal = (function () {
	const handleInput = (e) => {};

	const handleSubmit = (e, errors, object) => {
		e.preventDefault();
		const form = document.querySelector("[data-model]");
		// data.forEach((ele) => console.log(ele));
		if (checkErrors(errors)) {
			for (const key in errors) {
				showErrors(key, errors[key]);
			}
			return;
		}
		for (const key in object) {
			if (key === "id") continue;
			object[key] = form[key].value;
		}
		product.addProduct(object);
		form.parentElement.removeChild(form);
	};

	const checkErrors = (errors) => {
		return Object.values(errors).filter(Boolean).length > 0;
	};

	const closeModal = () => {
		const form = document.querySelector("[data-model]");
		if (form) {
			form.parentElement.removeChild(form);
		}
	};

	const createForm = () => {
		const newProduct = product.createEmptyProduct();
		closeModal();
		const form = document.createElement("form");
		form.setAttribute("data-model", "");
		form.classList.add("form", "form-modal");
		let errors = {};
		let isValid = false;

		const inputs = Object.keys(newProduct).map((key) => {
			const inputRules = inputConfig[key];
			if (!inputRules) {
				return null;
			}
			const div = document.createElement("div");
			const input = createInput(key, inputRules, handleInput, errors);
			if (key === "id") {
				form.append(input);
				return input;
			}
			div.classList.add("form-field");
			const label = key != "id" ? createLabel(key) : null;
			const inputDiv = document.createElement("div");
			inputDiv.append(input);
			inputDiv.setAttribute(`data-error`, key);
			if (label) div.append(label);
			div.append(inputDiv);
			form.append(div);
			return div;
		});

		const div = document.createElement("div");
		div.classList.add("action-buttons");

		const submit = createButton("submit", "Submit", ["btn", "btn-submit"]);
		const close = createButton("button", "Close", ["btn"], closeModal);

		div.append(submit);
		div.append(close);
		form.append(div);
		form.addEventListener("submit", (e) => {
			handleSubmit(e, errors, newProduct);
		});

		root.append(form);
	};
	// createForm();
	return {
		showCreateModel: createForm
	};
})();

export default createModal;
