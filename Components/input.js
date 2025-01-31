import { showErrors, handleValidation } from "../Utils/utils.js";
import button from "./button.js";
const renderImages = (images, elem, onDelete) => {
	elem.innerHTML = "";
	console.log("images", images);
	images.forEach((image, index) => {
		const previewImg = document.createElement("img");
		previewImg.src = image;
		previewImg.width = 100;
		elem.append(previewImg);
		const removeImgButton = button("button", "remove", [], () =>
			onDelete(index)
		);
		elem.append(removeImgButton);
	});
};

export default (name, value, config, callback, errors, uploadFiles) => {
	const inputEle = document.createElement("input");
	let imageContainer = null;

	if (value && name != "image") {
		inputEle.value = value;
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
	if (validations?.required?.value && !value) {
		errors[name] = validations?.required?.message;
	}

	const handleDelete = (index) => {
		uploadFiles.splice(index, 1);
		renderImages(uploadFiles, imageContainer, handleDelete);
	};

	inputEle.addEventListener("input", (e) => {
		let error = handleValidation(e.target, config.validations);
		if (error) {
			errors[name] = error;
		} else {
			errors[name] = null;
		}

		if (config.type === "file" && !error) {
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onloadend = () => {
				const imgSrc = reader.result;

				if (!imageContainer) {
					imageContainer = document.createElement("div");
					imageContainer.id = "image-container";
					inputEle.parentElement.appendChild(imageContainer);
				}

				if (imgSrc) {
					uploadFiles.push(imgSrc);
					renderImages(uploadFiles, imageContainer, handleDelete);
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
