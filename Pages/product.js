import button from "../Components/button.js";
import input from "../Components/input.js";
import createModal from "../Components/modal.js";
import table from "../Components/table.js";
import product from "../Model/product.js";

const getProducts = (params) => {
	const displayModal = () => {
		if (document.querySelector("[data-model='product']")) {
			return;
		}
		const modal = createModal.showModal(product.createEmptyProduct());
		if (modal) {
			root.append(modal);
		}
	};

	const handleSearch = () => {
		const value = search.value;
		const url = new URL(window.location);
		const params = new URLSearchParams(url.search);
		params.set("name", value);
		url.search = params.toString();
		history.pushState(null, "", url.toString());
		const paramsObject = {};
		params.forEach((value, key) => {
			paramsObject[key] = value;
		});
		const newProducts = product.getAllProducts(paramsObject);

		//handle received data
		if (!newProducts || newProducts.length <= 0) {
			if (productTable) {
				productTable.classList.add("hidden");
			}
			if (noData) {
				noData.classList.remove("hidden");
			}
		} else {
			if (productTable) {
				productContainer.removeChild(productTable);
				productTable = table(newProducts);
				productContainer.append(productTable);
			}
			if (noData) {
				noData.classList.add("hidden");
			}
		}
	};
	const callSearch = function (callback, delay) {
		let timeout;
		return function () {
			let context = this,
				args = arguments;

			clearTimeout(timeout);
			timeout = setTimeout(function () {
				callback.apply(context, args);
			}, delay);
		};
	};

	let products = product.getAllProducts(params);
	const productContainer = document.createElement("div");
	let productTable = null;
	let noData = document.createElement("img");
	productContainer.append(noData);
	noData.src = "./Images/no-data-to-display.svg";
	noData.classList.add("hidden", "no-data");
	if (!products || products.length <= 0) {
		noData.classList.remove("hidden");
		if (productTable) {
			productTable.classList.add("hidden");
		}
	} else {
		productTable = table(products);
	}
	productContainer.classList.add("table-container");
	productContainer.setAttribute("data-table-container", "product");
	if (productTable) {
		productContainer.append(productTable);
	}
	const div = document.createElement("div");
	const buttonEl = button(
		"button",
		"Create Product",
		["btn", "btn-create-product"],
		displayModal
	);
	const search = input(
		"text",
		"",
		{ placeholder: "search" },
		callSearch(handleSearch, 1000)
	);
	search.classList.add("search");
	div.append(buttonEl);
	productContainer.append(search);
	div.append(productContainer);
	return div;
};

const getPage = (params) => {
	return null;
};

export { getProducts, getPage };
