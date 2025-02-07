import { showErrors, handleValidation } from "../Utils/utils.js";
import { renderImages } from "./renderImages.js";

export default (
	name,
	value,
	config,
	callback,
	errors,
	uploadFiles,
	fileHolder
) => {
	const inputEle = document.createElement("input");
	let fileContainer = null;

	if (value && typeof value != "object") {
		inputEle.value = value;
	}

	const handleDelete = (index) => {
		uploadFiles.splice(index, 1);
		renderImages(uploadFiles, fileHolder, true, handleDelete);
		handleFileErrors();
	};

	if (value.length > 0 && typeof value == "object") {
		renderImages(uploadFiles, fileHolder, true, handleDelete);
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

	inputEle.addEventListener("input", function (e) {
		let error = null;
		if (validations) {
			error = handleValidation(e.target, config?.validations);
			if (error) {
				errors[name] = error;
				if (config?.type === "file") inputEle.value = null;
			} else {
				errors[name] = null;
			}
		}

		if (config.type === "file" && !error) {
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onloadend = () => {
				const imgSrc = reader.result;
				if (imgSrc) {
					uploadFiles.push(imgSrc);
					renderImages(uploadFiles, fileHolder, true, handleDelete);
					inputEle.value = "";
				}
			};
			if (file) {
				reader.readAsDataURL(file);
			}
		}
		if (validations) {
			showErrors(name, error);
		}
		callback(e);
	});
	return inputEle;
};
