export default (headers, classes) => {
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
