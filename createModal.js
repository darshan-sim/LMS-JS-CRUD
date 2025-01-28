import product from "./product.js";
import {
	createInput,
	createLabel,
	createButton,
	inputConfig
} from "./utils.js";

const createModal = (function () {
	let errors = [];

	const handleSubmit = (e, formEle) => {
		e.preventDefault();
		const form = e.target;
		// form.parentNode.removeChild(form);
		// console.log(errors)
	};

	const handleInput = (e) => {
		console.log(e);
	};

	const createForm = () => {
		const newProduct = product.createEmptyProduct();
		const form = document.createElement("form");
		form.addEventListener("submit", handleSubmit);
		let isValid = false;
		let errors = {};
		const inputs = Object.keys(newProduct).map((key) => {
			const inputRules = inputConfig[key];
			if (!inputRules) {
				return null;
			}
			const div = document.createElement("div");
			const label = key != "id" ? createLabel(key) : null;
			const input = createInput(key, inputRules, handleInput, errors);
			if (label) div.append(label);
			div.append(input);
			form.append(div);
			return div;
		});
		console.log(inputs);
		const button = createButton(
			"submit",
			"Submit",
			["button", "submit"],
			() => {
				console.log("submit");
			}
		);
		form.append(button);
		root.append(form);
	};
	createForm();

	return {
		showCreateModel: createForm
	};
})();

export default createModal;
