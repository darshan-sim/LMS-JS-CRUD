import product from "../Model/product.js";
import dataField from "./dataField.js";
import { renderImages } from "./renderImages.js";

export default (id, root) => {
	const myProduct = product.getProduct(id);
	const popup =
		document.getElementById("popup") || document.createElement("div");
	popup.id = "popup";
	popup.classList.add("popup");

	popup.innerHTML = "";

	Object.keys(myProduct).forEach((key) => {
		const field = dataField(key, myProduct[key], false);
		console.log(field);
		popup.append(field);
	});

	root.append(popup);
};
