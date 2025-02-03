const displayImg = (image, element, animation) => {
	// console.log(image);
	const imgPreview = document.createElement("img");
	if (animation) {
		imgPreview.classList.add(animation);
	}
	imgPreview.src = image;
	element.innerHTML = "";
	element.append(imgPreview);
};

const removeIndicator = (parent, child) => {
	parent.removeChild(child);
};

const previousIndicator = (parent, callback) => {
	const previous = document.createElement("div");
	previous.classList.add("previous", "indicator");
	previous.textContent = "<";
	previous.addEventListener("click", callback);
	parent.append(previous);
	return previous;
};

const nextIndicator = (parent, callback) => {
	const next = document.createElement("div");
	next.classList.add("next", "indicator");
	next.textContent = ">";
	next.addEventListener("click", callback);
	parent.append(next);
	return next;
};

const displayPosition = (length, index) => {
	const positions = document.createElement("div");
	for (let i = 0; i <= length; i++) {}
};

export default (images, classes) => {
	let index = 0;
	let previous = null;
	let next = null;

	const updateIndicator = () => {
		if (images.length > 1) {
			if (index <= 0) {
				previous.classList.add("disable");
			} else {
				previous.classList.remove("disable");
			}
			if (index >= images.length - 1) {
				next.classList.add("disable");
			} else {
				next.classList.remove("disable");
			}
		}
	};

	const scrollForward = () => {
		if (index >= images.length - 1) {
			return;
		}
		index++;
		displayImg(images[index], imgHolder, "slider-animation-left");
		updateIndicator();
	};

	const scrollBackward = () => {
		if (index <= 0) {
			return;
		}
		index--;
		displayImg(images[index], imgHolder, "slider-animation-right");
		updateIndicator();
	};

	const carousel = document.createElement("div");
	carousel.classList.add("carousel");
	carousel.classList.add(...classes);
	if (images.length > 1) {
		next = nextIndicator(carousel, scrollForward, "");
		previous = previousIndicator(carousel, scrollBackward, "");
		updateIndicator();
	}

	const imgHolder = document.createElement("div");
	displayImg(images[index], imgHolder, "");

	carousel.append(imgHolder);

	return carousel;
};
