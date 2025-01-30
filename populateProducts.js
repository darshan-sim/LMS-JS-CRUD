import product from "./product.js";
import { createButton } from "./utils.js";

const populateProducts = (function () {
	const createHeaders = (headers, classes) => {
		const thead = document.createElement("thead");
		const tr = document.createElement("tr");
		tr.classList.add(...classes);
		headers.forEach((header) => {
			const th = document.createElement("th");
			th.textContent = header;
			tr.append(th);
		});
		const th = document.createElement("th");
		th.textContent = "Action";
		tr.append(th);
		thead.append(tr);
		return thead;
	};

	const createRow = (productData) => {
		const handleDelete = () => {
			const products = product.deleteProduct(productData.id);
			const productContainer = document.querySelector("[data-table='product']");
			const table = createTable(products);
			productContainer.replaceChildren(table);
		};
		const tr = document.createElement("tr");
		for (const key in productData) {
			if (productData[key]) {
				const td = document.createElement("td");
				td.textContent = productData[key];
				tr.append(td);
			}
		}
		const td = document.createElement("td");

		const editButton = createButton("button", "edit", ["btn", "btn-edit"]);
		const deleteButton = createButton(
			"button",
			"Delete",
			["btn", "btn-delete"],
			handleDelete
		);
		td.append(editButton);
		td.append(deleteButton);
		tr.append(td);
		return tr;
	};

	const createTable = (products) => {
		if (!products.length > 0) return null;
		const table = document.createElement("table");
		console.log(products);
		const headers = Object.keys(products[0]);
		const th = createHeaders(headers, ["table-header"]);
		table.append(th);
		const tbody = document.createElement("tbody");
		products.forEach((product) => {
			const tr = createRow(product);
			tbody.append(tr);
		});
		table.append(tbody);
		return table;
	};

	return {
		listAll: createTable
	};
})();

export default populateProducts;
