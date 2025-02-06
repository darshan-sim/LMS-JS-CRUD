export default (name) => {
	const label = document.createElement("label");
	label.textContent = name.slice(0, 1).toUpperCase() + name.slice(1);
	label.setAttribute("for", name);
	return label;
};
