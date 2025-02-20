// const createLabel = (name) => {
// 	const label = document.createElement("label");
// 	label.textContent = name;
// 	label.setAttribute("for", name);
// 	return label;
// };
import router from "../router.js";

const getParams = (search) => {
	const params = {};
	const URLParams = new URLSearchParams(search.split("?")[1]);
	for (const [key, value] of URLParams.entries()) {
		params[key] = value;
	}
	return params;
};

const navigate = (path, element) => {
	let content = null;
	if (path === "index") {
		const search = window.location.search;
		const params = getParams(search);
		content = router[path](params);
		element.replaceChildren(content);
		return;
	}

	const pageName = path.split("?")[0].slice(1);
	const params = getParams(path);
	content = router[pageName](params);
	element.replaceChildren(content);
};

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
	const hash = window.location.hash;
	if (hash) {
		navigate(hash, root);
	} else {
		navigate("index", root);
	}
	// window.location.reload();
	// window.dispatchEvent(new Event("pushstate"));
	// navigator();
};

export { showErrors, redirectBack, handleValidation, navigate };
