import createModal from "./createModal.js";
import populateProducts from "./populateProducts.js";
import product from "./product.js";
import { createButton } from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
	const button = createButton(
		"button",
		"Create Product",
		["btn", "create"],
		createModal.showCreateModel
	);
	const products = product.getAllProducts();
	const productsListElement = populateProducts.listAll(products);
	const productContainer = document.createElement("div");
	productContainer.setAttribute("data-table", "product");
	if (productsListElement) {
		productContainer.append(productsListElement);
	}
	root.append(productContainer);
	root.append(button);
});
