// const createLabel = (name) => {
// 	const label = document.createElement("label");
// 	label.textContent = name;
// 	label.setAttribute("for", name);
// 	return label;
// };

const showErrors = (name, error) => {
	const errorsPlaceholder = document.querySelector(`[data-error=${name}]`);
	if (error && errorsPlaceholder) {
		errorsPlaceholder.classList.add("error-indicator");
		errorsPlaceholder.setAttribute("data-before", error);
	} else {
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

// const createInput = (name, value, config, callback, errors) => {
// 	const input = document.createElement("input");
// 	if (value && name != "image") {
// 		input.value = value;
// 	}
// 	input.classList.add("product-info");
// 	input.type = config.type;
// 	input.id = name;
// 	if (config.hidden) {
// 		input.hidden = true;
// 		return input;
// 	}
// 	input.placeholder = config.placeholder;
// 	const validations = config?.validations;
// 	if (validations?.required?.value && !value) {
// 		errors[name] = validations?.required?.message;
// 	}
// 	input.addEventListener("input", (e) => {
// 		const error = handleValidation(e.target, config.validations);
// 		if (error) {
// 			errors[name] = error;
// 		} else {
// 			errors[name] = null;
// 		}

// 		showErrors(name, error);

// 		if (config.type === "file" && !error) {
// 			const file = e.target.files[0];
// 			console.log(input.result);
// 			const reader = new FileReader();
// 			reader.onloadend = () => {
// 				const previewImg = document.createElement("img");
// 				const imgSrc = reader.result;
// 				previewImg.src = imgSrc;
// 				previewImg.width = 100;
// 				input.parentElement.appendChild(previewImg);
// 				console.log(imgSrc);
// 			};
// 			if (file) {
// 				reader.readAsDataURL(file);
// 			}
// 		}
// 		callback(e);
// 	});
// 	// 	input.addEventListener("change", (e) => {
// 	// 		const file = e.target.files[0];
// 	// 		console.log(input.result);
// 	// 		if (file) {
// 	// 			console.log("Selected file:", file);
// 	// 			console.log("File name:", file.name);
// 	// 			console.log("File path:", file.webkitRelativePath || file.name);
// 	// 		}
// 	// 		const reader = new FileReader();
// 	// 		reader.onloadend = () => {
// 	// 			const previewImg = document.createElement("img");
// 	// 			previewImg.src = reader.result;
// 	// 			previewImg.width = 100;
// 	// 			input.parentElement.appendChild(previewImg);
// 	// 		};
// 	// 		if (file) {
// 	// 			const imgFile = reader.readAsDataURL(file);
// 	// 			console.log({ image: imgFile.result });
// 	// 		}
// 	// 	});
// 	// }
// 	return input;
// };

// const createButton = (type, text, className, callback) => {
// 	const button = document.createElement("button");
// 	button.value = text;
// 	button.type = type;
// 	className.forEach((name) => {
// 		button.classList.add(name);
// 	});
// 	button.textContent = text;
// 	button.classList.add(...className);
// 	callback && button.addEventListener("click", callback);
// 	return button;
// };

// const createFormField = (name, value, input, inputInfo) => {
// 	const div = document.createElement("div");
// 	div.classList.add("field");
// 	if (input) {
// 		const input = createInput(
// 			name,
// 			value,
// 			inputInfo.config,
// 			inputInfo.callback,
// 			inputInfo.errors
// 		);
// 		if (name === "id") {
// 			return input;
// 		}

// 		const label = createLabel(name);
// 		div.append(label);

// 		const inputDiv = document.createElement("div");
// 		inputDiv.append(input);
// 		inputDiv.setAttribute(`data-error`, name);
// 		div.append(inputDiv);
// 		return div;
// 	}
// 	const nameEle = document.createElement("div");
// 	const valueEle = document.createElement("div");
// 	valueEle.classList.add("product-info");
// 	nameEle.textContent = name;
// 	valueEle.textContent = value;

// 	div.append(nameEle);
// 	div.append(valueEle);
// 	return div;
// };

const redirectBack = () => {
	const previousUrl =
		document.referrer || `${window.location.origin}/index.html`;
	history.pushState(null, "", previousUrl);
	window.dispatchEvent(new Event("pushstate"));
};

export { showErrors, redirectBack, handleValidation };
