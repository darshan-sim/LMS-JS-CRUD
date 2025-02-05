import product from "../Model/product.js";
import button from "./button.js";
import carousel from "./carousel.js";
import createModal from "./modal.js";
import productPopup from "./productPopup.js";
import table from "./table.js";

export default (productData) => {
	const handleDelete = () => {
		if (confirm("Are you sure?")) {
			const popup = document.getElementById("popup");
			if (popup) {
				popup.parentElement.removeChild(popup);
			}
			const products = product.deleteProduct(productData.id);
			const productContainer = document.querySelector(
				"[data-table-container='product']"
			);
			const updatedTable = table(products);
			productContainer.replaceChildren(updatedTable);
		}
	};

	const handleEdit = () => {
		if (document.querySelector("[data-model='product']")) {
			const modal = document.querySelector("[data-model='product']");
			modal.parentElement.removeChild(modal);
		}
		const modal = createModal.showModal({
			...productData,
			images: [...productData.images]
		});
		if (modal) {
			root.append(modal);
		}
	};

	const handleShow = () => {
		productPopup(productData.id, root);
	};

	const tr = document.createElement("tr");

	for (const key in productData) {
		const td = document.createElement("td");
		const data = productData[key] || null;
		if (key === "images") {
			const images = productData[key];
			td.append(carousel(images, []));
		} else {
			td.textContent = data || `--No ${key}--`;
		}
		if (!data) {
			td.classList.add("empty-data");
		}
		tr.append(td);
	}

	const td = document.createElement("td");
	const div = document.createElement("div");
	td.classList.add("action-buttons");

	const showButton = button("button", "Show", ["btn", "btn-show"], handleShow);
	const editButton = button("button", "Edit", ["btn", "btn-green"], handleEdit);
	const deleteButton = button(
		"button",
		"Delete",
		["btn", "btn-delete"],
		handleDelete
	);
	div.append(showButton);
	div.append(editButton);
	div.append(deleteButton);
	td.append(div);
	tr.append(td);
	return tr;
};
