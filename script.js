import router from "./router.js";

const getParams = (search) => {
	const params = {};
	const URLParams = new URLSearchParams(search.split("?")[1]);
	for (const [key, value] of URLParams.entries()) {
		params[key] = value;
	}
	return params;
};

const navigate = (path, element) => {
	let content = null;
	if (path === "index") {
		const search = window.location.search;
		const params = getParams(search);
		content = router[path](params);
		element.replaceChildren(content);
		return;
	}
	const pageName = path.split("?")[0].slice(1);
	const params = getParams(path);
	content = router[pageName](params);
	element.replaceChildren(content);
};

window.addEventListener("DOMContentLoaded", () => {
	const hash = window.location.hash;
	if (hash) {
		navigate(hash, root);
	} else {
		navigate("index", root);
	}
});

window.addEventListener("popstate", () => {
	const hash = window.location.hash;
	if (hash) {
		navigate(hash, root);
	} else {
		navigate("index", root);
	}
});

window.addEventListener("pushstate", () => {
	const hash = window.location.hash;
	if (hash) {
		navigate(hash, root);
	} else {
		navigate("index", root);
	}
});
