const inputConfig = {
	id: { type: "hidden", hidden: true },
	name: {
		type: "text",
		placeholder: "Product Name",
		validations: {
			required: { value: true, message: "Please enter name" }
		}
	},
	description: {
		type: "text",
		placeholder: "Product description",
		validations: {
			required: { value: false, message: "Please enter description" }
		}
	},
	price: {
		type: "number",
		placeholder: "900",
		validations: {
			required: { value: true, message: "Please enter price" },
			min: { value: 1, message: "Minimum price should be 1" },
			max: { value: 3000, message: "Maximum price should be 3000" }
		}
	},
	images: {
		type: "file",
		validations: {
			required: { value: true, message: "Please upload an image" },
			fileType: {
				value: ["image/jpeg", "image/png"],
				message: "Only JPEG and PNG files are allowed"
			},
			fileSize: {
				value: 2 * 1024 * 1024,
				message: "File size should be less than 2MB"
			}
		}
	}
};

const createLabel = (name) => {
	const label = document.createElement("label");
	label.textContent = name;
	label.setAttribute("for", name);
	return label;
};

const showErrors = (name, error) => {
	const errorsPlaceholder = document.querySelector(`[data-error=${name}]`);
	if (error && errorsPlaceholder) {
		errorsPlaceholder.classList.add("error-indicator");
		errorsPlaceholder.setAttribute("data-before", error);
	} else {
		console.log("should be removed");
		errorsPlaceholder.classList.remove("error-indicator");
	}
};

const handleValidation = (input, validations) => {
	let errorMessage = "";
	const value = input.type === "file" ? input.files[0] : input.value;
	if (validations) {
		if (validations.required?.value) {
			if (!value || (input.type !== "file" && value.trim().length <= 0)) {
				errorMessage = validations.required?.message;
			}
		}
		if (validations?.min?.value && input.type !== "file") {
			if (value < Number(validations.min?.value)) {
				errorMessage = validations.min?.message;
			}
		}
		if (validations?.max?.value && input.type !== "file") {
			if (Number(value) > Number(validations.max?.value)) {
				errorMessage = validations.max?.message;
			}
		}
		if (validations?.fileType?.value && input.type === "file") {
			if (value && !validations.fileType.value.includes(value.type)) {
				errorMessage = validations.fileType?.message;
			}
		}
		if (validations?.fileSize?.value && input.type === "file") {
			if (value && value.size > validations.fileSize.value) {
				errorMessage = validations.fileSize?.message;
			}
		}
	}
	return errorMessage;
};

const createInput = (name, config, callback, errors) => {
	const input = document.createElement("input");
	input.classList.add("form-input");
	input.type = config.type;
	input.id = name;
	if (config.hidden) {
		input.hidden = true;
		return input;
	}
	input.placeholder = config.placeholder;
	const validations = config?.validations;
	if (validations?.required?.value) {
		errors[name] = validations?.required?.message;
	}
	input.addEventListener("input", (e) => {
		const error = handleValidation(e.target, config.validations);
		if (error) {
			errors[name] = error;
		} else {
			errors[name] = null;
		}
		showErrors(name, error);
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
	callback && button.addEventListener("click", callback);
	return button;
};

export { createInput, createLabel, createButton, inputConfig, showErrors };
