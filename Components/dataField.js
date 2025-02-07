import carousel from "./carousel.js";
import input from "./input.js";
import label from "./label.js";

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
	} else {
		const nameEle = document.createElement("div");
		nameEle.classList.add("field-title");
		const valueEle = document.createElement("div");
		valueEle.classList.add("product-info");
		if (name === "price") {
			value = "₹ " + value;
		}
		nameEle.textContent = label.textContent =
			name.slice(0, 1).toUpperCase() + name.slice(1);
		if (name === "images") {
			valueEle.append(carousel(value, ["big-carousel"]));
		} else {
			valueEle.textContent = value;
		}

		div.append(nameEle);
		div.append(valueEle);
	}
	return div;
};
