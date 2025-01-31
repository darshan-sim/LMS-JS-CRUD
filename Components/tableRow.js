import product from "../Model/product.js";
import button from "./button.js";

export default (productData) => {
	const handleDelete = () => {
		const products = product.deleteProduct(productData.id);
		const productContainer = document.querySelector(
			"[data-table-container='product']"
		);
		const table = createTable(products);
		productContainer.replaceChildren(table);
	};

	const handleShow = () => {
		history.pushState(
			null,
			"",
			`${window.location.origin}/index.html#product?id=${productData.id}`
		);
		window.dispatchEvent(new Event("pushstate"));
	};

	const tr = document.createElement("tr");

	for (const key in productData) {
		const td = document.createElement("td");
		const data = productData[key] || null;
		if (key === "images") {
			const imageDiv = document.createElement("div");
			const image = document.createElement("img");
			image.src = productData[key];
			imageDiv.append(image);
			td.append(imageDiv);
		} else {
			td.textContent = data || `--No ${key}--`;
		}
		if (!data) {
			td.classList.add("null-data");
		}
		tr.append(td);
	}

	const td = document.createElement("td");

	const showButton = button("button", "show", ["btn", "btn-show"], handleShow);
	td.append(showButton);
	tr.append(td);
	return tr;
};
