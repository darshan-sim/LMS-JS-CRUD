import button from "./button.js";
import dataField from "./dataField.js";
import { inputConfig } from "../config.js";
import product from "../Model/product.js";
import { redirectBack, showErrors } from "../Utils/utils.js";

const createModal = (function () {
	let form = null;
	const handleInput = (e) => {};

	const handleSubmit = (e, errors, object, update) => {
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
			object[key] = form[key].value;
		}

		if (!update) {
			product.addProduct(object);
			form.parentElement.removeChild(form);
			console.log({ update: !update });
		} else {
			redirectBack();
		}
	};

	const checkErrors = (errors) => {
		return Object.values(errors).filter(Boolean).length > 0;
	};

	const closeModal = () => {
		const form = document.querySelector("[data-model]");
		if (form) {
			form.parentElement.removeChild(form);
		}
	};

	const showModel = (myProduct) => {
		const isEmpty = Object.values(myProduct).filter(Boolean).length > 0;
		form = document.createElement("form");
		form.setAttribute("data-model", "product");
		form.method = "post";
		form.enctype = "multipart/form-data";
		form.classList.add("form", "form-modal");
		let errors = {};
		let files = {};

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
				(files[key] = [])
			);

			form.append(field);
			return field;
		});

		const div = document.createElement("div");
		div.classList.add("action-buttons");

		const submit = button("submit", `${isEmpty ? "Update" : "Create"}`, [
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
