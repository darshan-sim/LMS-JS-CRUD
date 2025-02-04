import table from "../Components/table.js";

const product = (() => {
	let products = [];

	try {
		products = JSON.parse(localStorage.getItem("products"));
	} catch (e) {}

	let n = localStorage.getItem("id") || 100;

	const product = {
		id: "",
		name: "",
		description: "",
		price: "",
		images: []
	};

	const populateObject = (values) => {
		const newProduct = { ...product };
		for (const key in newProduct) {
			product[key] = values[key];
		}
		return newProduct;
	};

	const updateId = () => {
		localStorage.setItem("id", n);
	};

	const pushProduct = (product) => {
		products.push({ ...product, id: n++ });
		const productContainer = document.querySelector(
			"[data-table-container='product']"
		);
		if (productContainer) {
			const productsListElement = table(returnAllProducts());
			productContainer.replaceChildren(productsListElement);
			storeAllToLocalStorage();
			updateId();
		}
	};

	const storeAllToLocalStorage = () => {
		localStorage.setItem("products", JSON.stringify(products));
	};

	const handleDelete = (id) => {
		products = products.filter((product) => product.id !== id);
		storeAllToLocalStorage();
		return products;
	};

	const handleUpdate = (id, newValues) => {
		const oldProduct = products.find((product) => product.id === id);
		if (!oldProduct || oldProduct == null) {
			return false;
		}
		for (let key in oldProduct) {
			if (oldProduct[key] != null) {
				oldProduct[key] = newValues[key];
			}
		}
		return true;
	};

	const handleOrder = (a, b, key, direction) => {
		console.log({ a });
		console.log({ b });
		console.log({ key });
		console.log({ direction });
	};

	const returnAllProducts = (params) => {
		console.log(params);
		let filteredProduct = [...products];
		for (let key in params) {
			if (key === "images") continue;
			if (key === "orderBy") continue;
			if (key === "direction") continue;
			filteredProduct = filteredProduct.filter((product) => {
				if (product[key] === undefined) return false;
				return (
					product[key].toString().toLowerCase().indexOf(params[key]) !== -1
				);
			});
		}
		if (params?.orderBy) {
			filteredProduct = filteredProduct.sort();
		}
		if (params?.direction === "desc") {
			filteredProduct = filteredProduct.reverse();
		}
		return filteredProduct;
	};

	const returnProduct = (id) => {
		return { ...products.find((product) => product.id == id) };
	};

	return {
		createEmptyProduct: () => {
			return { ...product, images: [] };
		},
		populateProduct: populateObject,
		addProduct: pushProduct,
		getAllProducts: returnAllProducts,
		deleteProduct: handleDelete,
		getProduct: returnProduct,
		updateProduct: handleUpdate
	};
})();

export default product;
