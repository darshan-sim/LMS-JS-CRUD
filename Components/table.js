import tableHeader from "./tableHeader.js";
import tableRow from "./tableRow.js";

export default (model) => {
	if (!model.length > 0) return null;
	const table = document.createElement("table");
	const headers = Object.keys(model[0]);
	const th = tableHeader(headers, ["table-header"]);
	table.append(th);
	const tbody = document.createElement("tbody");
	model.forEach((row) => {
		const tr = tableRow(row);
		tbody.append(tr);
	});
	table.append(tbody);
	return table;
};

// const populateProducts = (function () {
// 	// const createHeaders = (headers, classes) => {
// 	// 	const thead = document.createElement("thead");
// 	// 	const tr = document.createElement("tr");
// 	// 	tr.classList.add(...classes);
// 	// 	headers.forEach((header) => {
// 	// 		const th = document.createElement("th");
// 	// 		th.textContent = header;
// 	// 		tr.append(th);
// 	// 	});
// 	// 	const th = document.createElement("th");
// 	// 	th.textContent = "Action";
// 	// 	tr.append(th);
// 	// 	thead.append(tr);
// 	// 	return thead;
// 	// };

// 	// const createRow = (productData) => {
// 	// 	const handleDelete = () => {
// 	// 		const products = product.deleteProduct(productData.id);
// 	// 		const productContainer = document.querySelector("[data-table='product']");
// 	// 		const table = createTable(products);
// 	// 		productContainer.replaceChildren(table);
// 	// 	};

// 	// 	const handleShow = () => {
// 	// 		history.pushState(
// 	// 			null,
// 	// 			"",
// 	// 			`${window.location.origin}/index.html#product?id=${productData.id}`
// 	// 		);
// 	// 		window.dispatchEvent(new Event("pushstate"));
// 	// 	};

// 	// 	const tr = document.createElement("tr");

// 	// 	for (const key in productData) {
// 	// 		const td = document.createElement("td");
// 	// 		const data = productData[key] || null;
// 	// 		if (key === "images") {
// 	// 			const imageDiv = document.createElement("div");
// 	// 			const image = document.createElement("img");
// 	// 			image.src = productData[key];
// 	// 			imageDiv.append(image);
// 	// 			td.append(imageDiv);
// 	// 		} else {
// 	// 			td.textContent = data || `--No ${key}--`;
// 	// 		}
// 	// 		if (!data) {
// 	// 			td.classList.add("null-data");
// 	// 		}
// 	// 		tr.append(td);
// 	// 		// } else {
// 	// 		// 	const td = document.createElement("td");
// 	// 		// 	tr.append(td);
// 	// 		// }
// 	// 	}
// 	// 	const td = document.createElement("td");

// 	// 	const showButton = createButton(
// 	// 		"button",
// 	// 		"show",
// 	// 		["btn", "btn-show"],
// 	// 		handleShow
// 	// 	);
// 	// 	td.append(showButton);
// 	// 	tr.append(td);
// 	// 	return tr;
// 	// };

// 	const createTable = (products) => {
// 		if (!products.length > 0) return null;

// 		const table = document.createElement("table");
// 		// console.log(products);
// 		const headers = Object.keys(products[0]);
// 		const th = createHeaders(headers, ["table-header"]);
// 		table.append(th);
// 		const tbody = document.createElement("tbody");
// 		products.forEach((product) => {
// 			const tr = createRow(product);
// 			tbody.append(tr);
// 		});
// 		table.append(tbody);
// 		return table;
// 	};

// 	return {
// 		listAll: createTable
// 	};
// })();

// export default populateProducts;
