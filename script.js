import { navigate } from "./Utils/utils.js";

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

// VM37:1 Uncaught SecurityError: Failed to execute 'replaceState' on 'History': A history state object with URL 'https://codesandbox.io/' cannot be created in a document with origin 'https://2r8z9j.csb.app' and URL 'https://2r8z9j.csb.app/'.
//     at History.pushState (eval at Ld (preview-protocol.js:73:63), <anonymous>:1:855)
//     at redirectBack (utils.js:54:10)
//     at handleSubmit (modal.js:41:5)
//     at HTMLFormElement.<anonymous> (modal.js:127:4)
