import button from "./button.js";
import dataField from "./dataField.js";
import { inputConfig } from "../config.js";
import product from "../Model/product.js";
import { redirectBack, showErrors } from "../Utils/utils.js";

const createModal = (function () {
	let form = null;
	let errors = {};
	let files = {};

	const handleSubmit = (e, errors, object, isNewProduct) => {
		e.preventDefault();
		if (!form) {
			form.parentElement.removeChild(form);
			return;
		}

		if (checkErrors(errors)) {
			for (const key in errors) {
				showErrors(key, errors[key]);
			}
			return;
		}
		for (const key in object) {
			if (key === "id") continue;
			console.log({ [key]: typeof object[key] });
			if (typeof object[key] == "object") {
				object[key] = files[key];
				console.log({ [key]: files[key] });
				continue;
			}
			object[key] = form[key].value;
		}

		if (isNewProduct) {
			product.addProduct(object);
			errors = {};
			files = {};
			form.parentElement.removeChild(form);
			console.log({ isNewProduct: isNewProduct });
		} else {
			console.log("update");
			redirectBack();
		}
	};

	const handleInput = () => {};

	const checkErrors = (errors) => {
		return Object.values(errors).filter(Boolean).length > 0;
	};

	const closeModal = () => {
		const form = document.querySelector("[data-model]");
		if (form) {
			form.parentElement.removeChild(form);
		}
	};

	function checkIsEmpty(object) {
		return Object.values(object).find((value) => value.length > 0)
			? false
			: true;
	}

	const showModel = (myProduct) => {
		const isEmpty = checkIsEmpty(myProduct);
		console.log(myProduct);
		console.log(isEmpty);
		form = document.createElement("form");
		form.setAttribute("data-model", "product");
		form.method = "post";
		form.enctype = "multipart/form-data";
		form.classList.add("form", "form-modal");

		Object.keys(myProduct).map((key) => {
			const inputRules = inputConfig[key];
			if (!inputRules) {
				return null;
			}

			const inputObject = {
				config: inputRules,
				callback: handleInput,
				errors: errors
			};

			const field = dataField(
				key,
				myProduct[key],
				true,
				inputObject,
				(files[key] = myProduct[key])
			);
			form.append(field);
			return field;
		});

		const div = document.createElement("div");
		div.classList.add("action-buttons");

		const submit = button("submit", `${isEmpty ? "Create" : "Update"}`, [
			"btn",
			"btn-submit"
		]);

		const closeCallback = isEmpty ? redirectBack : closeModal;
		const close = button(
			"button",
			`${isEmpty ? "Back" : "Close"}`,
			["btn"],
			closeCallback
		);

		div.append(close);
		div.append(submit);
		form.append(div);
		form.addEventListener("submit", (e) => {
			handleSubmit(e, errors, myProduct, isEmpty);
		});

		return form;
	};
	// createForm();
	return {
		showModel
	};
})();

export default createModal;
