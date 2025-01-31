export default (type, text, className, callback) => {
	const _button = document.createElement("button");
	_button.value = text;
	_button.type = type;
	className.forEach((name) => {
		_button.classList.add(name);
	});
	_button.textContent = text;
	_button.classList.add(...className);
	callback && _button.addEventListener("click", callback);
	return _button;
};
