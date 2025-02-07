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

const redirectBack = () => {
	const previousUrl =
		document.referrer || `${window.location.origin}/index.html`;
	history.pushState(null, "", previousUrl);
	window.dispatchEvent(new Event("pushstate"));
};

export { showErrors, redirectBack, handleValidation };
