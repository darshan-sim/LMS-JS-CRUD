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

	const returnAllProducts = () => products;

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
		getProduct: returnProduct
	};
})();

export default product;
