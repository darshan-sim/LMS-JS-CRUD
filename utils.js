const inputConfig = {
	id: { type: "text", type: "number", hidden: true },
	name: {
		type: "text",
		placeholder: "Product Name",
		validations: {
			required: { value: true, message: "Please enter name" }
		}
	},
	description: {
		type: "text",
		placeholder: "Product Name",
		validations: {
			required: { value: false, message: "Please enter description" }
		}
	},
	price: {
		type: "number",
		placeholder: "900",
		validations: {
			required: { value: true, message: "Please enter price" },
			min: { value: 1, message: "Minimum price should be 1" }
		}
	},
	// category: {type: "text", placeholder: "Product Name", required: true, error: "Please enter name"},
	quantity: {
		type: "number",
		placeholder: "1",
		validations: {
			required: { value: true, message: "Please enter quantity" }
		}
	},
	// images: [],
	offer: {
		type: "number",
		placeholder: "10%",
		validations: {
			required: { value: false, message: "Please enter name" },
			min: { value: 1, message: "Min value should be 1" },
			max: { value: 100, message: "Max value should be 100" }
		}
	}
};

const createLabel = (name) => {
	const label = document.createElement("label");
	label.textContent = name;
	label.setAttribute("for", name);
	return label;
};

const handleValidation = (value, validations) => {
	let errorMessage = "";
	if (validations) {
		if (validations.required?.value) {
			if (value.trim().length <= 0 || !value) {
				errorMessage = validations.required?.message;
			}
		}
		if (validations?.min?.value) {
			if (value < Number(validations.min?.value)) {
				errorMessage = validations.min?.message;
			}
		}
		if (validations?.max?.value) {
			console.log(Number(value) > validations.max.value);
			if (Number(value) > Number(validations.max?.value)) {
				errorMessage = validations.max?.message;
			}
		}
	}
	return errorMessage;
};

const createInput = (name, config, callback, errors) => {
	const input = document.createElement("input");
	input.type = config.type;
	input.id = name;
	if (config.hidden) {
		input.hidden = true;
		return input;
	}
	input.placeholder = config.placeholder;
	input.addEventListener("input", (e) => {
		const error = handleValidation(e.target.value, config.validations);
		if (error) {
			errors[name] = error;
		} else {
			errors[name] = null;
		}
		// console.log(errors);
		callback(e);
	});
	return input;
};

const createButton = (type, text, className, callback) => {
	const button = document.createElement("button");
	button.value = text;
	button.type = type;
	className.forEach((name) => {
		button.classList.add(name);
	});
	button.textContent = text;
	button.classList.add(...className);
	callback && button.addEventListener("click", (e) => callback(e));
	return button;
};

export { createInput, createLabel, createButton, inputConfig };
