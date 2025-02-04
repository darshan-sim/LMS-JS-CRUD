import carousel from "./carousel.js";
import input from "./input.js";
import label from "./label.js";
import { renderImages } from "./renderImages.js";

export default (name, value, isInput, inputInfo, files) => {
	const div = document.createElement("div");
	div.classList.add("field");
	const fileHolder = document.createElement("div");
	fileHolder.classList.add("file-container");

	if (isInput) {
		const inputEle = input(
			name,
			value,
			inputInfo.config,
			inputInfo.callback,
			inputInfo.errors,
			files,
			fileHolder
		);

		if (name === "id") {
			return inputEle;
		}

		const labelEle = label(name);
		div.append(labelEle);

		const inputDiv = document.createElement("div");
		inputDiv.append(inputEle);
		inputDiv.setAttribute(`data-error`, name);
		if (name == "image") {
			const fileContainer = document.createElement("div");
			fileContainer.classList.add("file-container");
			fileContainer.id = "fileContainer";
			div.append(fileContainer);
		}
		inputDiv.append(fileHolder);
		div.append(inputDiv);
		return div;
	}
	const nameEle = document.createElement("div");
	const valueEle = document.createElement("div");
	valueEle.classList.add("product-info");
	nameEle.textContent = name;
	if (name === "images") {
		valueEle.append(carousel(value, ["big-carousel"]));
	} else {
		valueEle.textContent = value;
	}

	div.append(nameEle);
	div.append(valueEle);
	return div;
};
