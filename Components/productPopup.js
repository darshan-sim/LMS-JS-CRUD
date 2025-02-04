import product from "../Model/product.js";
import button from "./button.js";
import dataField from "./dataField.js";
import { renderImages } from "./renderImages.js";

export default (id, root) => {
	const myProduct = product.getProduct(id);
	const popup =
		document.getElementById("popup") || document.createElement("div");
	popup.id = "popup";
	popup.classList.add("popup");
	if (popup.classList.contains("hidden")) {
		popup.classList.remove("hidden");
	}
	popup.innerHTML = "";

	const closePopup = () => {
		popup.classList.add("hidden");
	};

	const closeButton = button(
		"button",
		"X",
		["btn", "btn-pop-close"],
		closePopup
	);
	popup.append(closeButton);

	Object.keys(myProduct).forEach((key) => {
		const field = dataField(key, myProduct[key], false);
		popup.append(field);
	});

	root.append(popup);
};
