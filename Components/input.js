import { showErrors, handleValidation } from "../Utils/utils.js";
import button from "./button.js";
import { renderImages } from "./renderImages.js";

export default (name, value, config, callback, errors, uploadFiles) => {
	const inputEle = document.createElement("input");
	let fileContainer = null;

	if (value && typeof value != "object") {
		inputEle.value = value;
	}

	const handleDelete = (index) => {
		uploadFiles.splice(index, 1);
		renderImages(uploadFiles, fileContainer, true, handleDelete);
		handleFileErrors();
	};

	if (value.length > 0 && typeof value == "object") {
		fileContainer = document.createElement("div");
		fileContainer.classList.add("file-container");
		renderImages(uploadFiles, fileContainer, true, handleDelete);
		inputEle.parentElement.appendChild(fileContainer);
	}

	inputEle.classList.add("product-info");
	inputEle.type = config.type;
	inputEle.id = name;
	if (config.hidden) {
		inputEle.hidden = true;
		return inputEle;
	}
	inputEle.placeholder = config.placeholder;

	const validations = config?.validations;
	if (validations?.required?.value && (!value || value.length <= 0)) {
		errors[name] = validations?.required?.message;
	}

	const handleFileErrors = () => {
		if (validations?.required.value && uploadFiles.length <= 0) {
			const error = validations?.required.message;
			errors[name] = error;
			showErrors(name, error);
		}
	};

	const handleDeleteWithIndex = (index, element) => {
		let diff = uploadFiles.length - 1 - index;
		let actualIndex = uploadFiles.length - 1 - diff;
		uploadFiles.splice(actualIndex, 1);
		element.parentElement.removeChild(element);
		handleFileErrors();
	};

	inputEle.addEventListener("input", (e) => {
		let error = handleValidation(e.target, config.validations);
		if (error) {
			errors[name] = error;
			if (config.type === "file") inputEle.value = null;
		} else {
			errors[name] = null;
		}

		if (config.type === "file" && !error) {
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onloadend = () => {
				const imgSrc = reader.result;

				if (!fileContainer) {
					fileContainer = document.createElement("div");
					fileContainer.classList.add("image-container");
					inputEle.parentElement.appendChild(fileContainer);
				}

				if (imgSrc) {
					uploadFiles.push(imgSrc);
					renderImages(uploadFiles, fileContainer, true, handleDelete);
					inputEle.value = "";
				}
			};
			if (file) {
				reader.readAsDataURL(file);
			}
		}
		showErrors(name, error);
		callback(e);
	});
	return inputEle;
};
