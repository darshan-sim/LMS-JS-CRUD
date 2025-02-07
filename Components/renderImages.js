import button from "./button.js";

const renderImages = (source, element, isEdit, deleteImage) => {
	element.innerHTML = "";
	source.forEach((image, index) => {
		const imageContainer = document.createElement("div");
		imageContainer.classList.add("img-preview-container");
		const imgPreview = document.createElement("img");
		imgPreview.src = image;
		imgPreview.width = 100;
		imageContainer.append(imgPreview);

		if (isEdit) {
			const imgRemove = button("button", "X", ["btn"], () =>
				deleteImage(index)
			);
			imgRemove.classList.add("btn-img-remove");
			imageContainer.append(imgRemove);
		}
		element.appendChild(imageContainer);
	});
};

export { renderImages };
