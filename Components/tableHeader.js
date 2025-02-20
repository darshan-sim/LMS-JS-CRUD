export default (headers, classes) => {
	let direction = true;
	const handleOrder = (header) => {
		const url = new URL(window.location);
		const params = new URLSearchParams(url.search);
		params.set("orderBy", header);
		if (params.get("direction") === "asc") {
			params.set("direction", "desc");
		} else {
			params.set("direction", "asc");
		}
		direction = !direction;
		url.search = params.toString();
		history.pushState(null, "", url.toString());
		// window.dispatchEvent(new Event("pushstate"));
	};

	const thead = document.createElement("thead");
	const tr = document.createElement("tr");
	tr.classList.add(...classes);

	const getCorrectIndicator = (header) => {
		const url = new URL(window.location);
		const params = new URLSearchParams(url.search);
		const direction = params.get("direction");
		const orderBy = params.get("orderBy");
		if (header === orderBy && direction === "desc") {
			return `<i class="fa-solid fa-sort-down"></i>`;
		} else {
			return `<i class="fa-solid fa-sort-up"></i>`;
		}
	};
	headers.forEach((header) => {
		const th = document.createElement("th");
		if (header === "id" || header === "name" || header === "price") {
			th.innerHTML = header.toUpperCase() + " " + getCorrectIndicator(header);
		} else {
			th.textContent = header.toUpperCase();
		}
		if (header !== "images" && header !== "description") {
			th.addEventListener("click", () => handleOrder(header));
		}
		tr.append(th);
	});
	const th = document.createElement("th");
	th.textContent = "Action";
	tr.append(th);
	thead.append(tr);
	return thead;
};
