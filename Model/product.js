import table from "../Components/table.js";

const product = (() => {
	let products = [];

	try {
		products = JSON.parse(localStorage.getItem("products")) || [];
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
		try {
			products.push({ ...product, id: n++ });
			console.log({ n });
			updateId();
			storeAllToLocalStorage();
			return true;
		} catch (e) {
			return false;
		}
	};
	console.log({ n });

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
		storeAllToLocalStorage();
		return true;
	};

	const returnAllProducts = (params) => {
		if (!products || products.length <= 0) {
			return [];
		}
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
			filteredProduct = filteredProduct.sort((a, b) => {
				if (a[params.orderBy] < b[params.orderBy]) {
					return -1;
				}
				if (a[params.orderBy] > b[params.orderBy]) {
					return 1;
				}
				return 0;
			});
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
