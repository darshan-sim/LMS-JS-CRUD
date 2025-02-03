import button from "../Components/button.js";
import dataField from "../Components/dataField.js";
import createModal from "../Components/modal.js";
import table from "../Components/table.js";
import product from "../Model/product.js";
import { redirectBack } from "../Utils/utils.js";

const getProducts = (params) => {
	const displayModal = () => {
		if (document.querySelector("[data-model='product']")) {
			return;
		}
		const modal = createModal.showModel(product.createEmptyProduct());
		if (modal) {
			root.append(modal);
		}
	};

	const products = product.getAllProducts();
	const productTable = table(products);
	const productContainer = document.createElement("div");
	productContainer.setAttribute("data-table-container", "product");
	if (productTable) {
		productContainer.append(productTable);
	}
	const div = document.createElement("div");
	const buttonEl = button(
		"button",
		"Create Product",
		["btn", "create"],
		displayModal
	);
	div.append(buttonEl);
	div.append(productContainer);
	return div;
};

const editProduct = (params) => {
	const myProduct = product.getProduct(params.id);
	if (myProduct == null) {
		const notFound = document.createElement("h2");
		notFound.textContent = "No product found!";
		notFound.classList.add("product-not-found");
		return notFound;
	}
	const productDiv = createModal.showModel(myProduct);
	return productDiv;
};

const getProduct = (params) => {
	const myProduct = product.getProduct(params.id);
	const handleEdit = () => {
		history.pushState(
			null,
			"",
			`${window.location.origin}/index.html#edit?id=${params.id}`
		);
		window.dispatchEvent(new Event("pushstate"));
	};
	const handleDelete = () => {
		if (confirm(`Do you Want to delete ${myProduct.name}?`)) {
			product.deleteProduct(myProduct.id);
			redirectBack();
		}
	};
	if (myProduct == null) {
		const notFound = document.createElement("h2");
		notFound.textContent = "No product found!";
		notFound.classList.add("product-not-found");
		return notFound;
	}
	const productDiv = document.createElement("div");
	productDiv.classList.add("product", "form-modal", "form");
	for (const key in myProduct) {
		productDiv.append(dataField(key, myProduct[key]));
	}
	const actionButtons = document.createElement("div");
	actionButtons.classList.add("action-buttons");
	const editBtn = button("button", "Edit", ["btn", "btn-edit"], handleEdit);
	const deleteBtn = button(
		"button",
		"Delete",
		["btn", "btn-delete"],
		handleDelete
	);
	const backBtn = button("button", "Back", ["btn"], redirectBack);
	actionButtons.append(editBtn);
	actionButtons.append(deleteBtn);
	actionButtons.append(backBtn);
	productDiv.append(actionButtons);
	return productDiv;
};

export { getProducts, getProduct, editProduct };
