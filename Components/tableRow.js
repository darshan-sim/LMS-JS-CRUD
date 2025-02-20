import product from "../Model/product.js";
import { redirectBack } from "../Utils/utils.js";
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
			if (!products || products.length <= 0) {
				redirectBack();
			} else {
				redirectBack();
				// const updatedTable = table(products);
				// productContainer.replaceChildren(updatedTable);
			}
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
		const displayData = document.createElement("div");
		displayData.classList.add("text-overflow");

		const data = productData[key] || null;
		if (key === "images") {
			const images = productData[key];
			displayData.append(carousel(images, []));
		} else {
			displayData.textContent = data || `--No ${key}--`;
		}
		if (!data) {
			displayData.classList.add("empty-data");
		}
		if (key === "price" || key === "id") {
			td.style.fontWeight = 600;
		}
		if (key === "price") {
			displayData.textContent = "₹ " + data;
		}
		td.append(displayData);
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
