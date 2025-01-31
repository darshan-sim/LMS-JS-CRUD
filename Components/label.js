export default (name) => {
	const label = document.createElement("label");
	label.textContent = name;
	label.setAttribute("for", name);
	return label;
};
