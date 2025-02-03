import { showErrors, handleValidation } from "../Utils/utils.js";
import button from "./button.js";

const renderImages = (source, element, deleteImage) => {
  const imageContainer = document.createElement("div");
  source.forEach((image, index) => {
    const imgPreview = document.createElement("img");
    imgPreview.src = image;
    imgPreview.width = 100;
    imageContainer.append(imgPreview);

    const imgRemove = button("button", "REMOVE", ["btn"], () =>
      deleteImage(index)
    );
    imageContainer.append(imgRemove);
  });
  element.innerHTML = "";
  element.appendChild(imageContainer);
};

export default (name, value, config, callback, errors, uploadFiles) => {
  const inputEle = document.createElement("input");
  let fileContainer = null;

  if (value && name != "images") {
    inputEle.value = value;
  }

  if (value && name == "images") {
    fileContainer = document.createElement("div");
    inputEle.parentElement.appendChild(fileContainer);
    renderImages();
  }

  inputEle.classList.add("product-info");
  inputEle.type = config.type;
  inputEle.id = name;
  if (config.hidden) {
    inputEle.hidden = true;
    return inputEle;
  }
  inputEle.placeholder = config.placeholder;

  const validations = config?.validations;
  if (validations?.required?.value && !value) {
    errors[name] = validations?.required?.message;
  }
  const handleDelete = (index) => {
    uploadFiles.splice(index, 1);
    renderImages(uploadFiles, fileContainer, handleDelete);
    if (validations?.required.value && uploadFiles.length <= 0) {
      const error = validations?.required.message;
      errors[name] = error;
      showErrors(name, error);
    }
  };
  inputEle.addEventListener("input", (e) => {
    let error = handleValidation(e.target, config.validations);
    if (error) {
      errors[name] = error;
      if (config.type === "file") inputEle.value = null;
    } else {
      errors[name] = null;
    }

    if (config.type === "file" && !error) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const imgSrc = reader.result;

        if (!fileContainer) {
          fileContainer = document.createElement("div");
          fileContainer.id = "image-container";
          inputEle.parentElement.appendChild(fileContainer);
        }

        if (imgSrc) {
          uploadFiles.push(imgSrc);
          renderImages(uploadFiles, fileContainer, handleDelete);
          inputEle.value = "";
        }
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
    showErrors(name, error);
    callback(e);
  });
  return inputEle;
};
