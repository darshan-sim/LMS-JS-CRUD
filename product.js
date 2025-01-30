import populateProducts from "./populateProducts.js";

const product = (() => {
	let products = JSON.parse(localStorage.getItem("products")) || [];

	let n = localStorage.getItem("id") || 100;

	const product = {
		id: "",
		name: "",
		description: "",
		price: "",
		images: ""
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
		const productContainer = document.querySelector("[data-table='product']");

		const productsListElement = populateProducts.listAll(returnAllProducts());
		productContainer.replaceChildren(productsListElement);
		storeAllToLocalStorage();
		updateId();
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

	return {
		createEmptyProduct: () => {
			return { ...product };
		},
		populateProduct: populateObject,
		addProduct: pushProduct,
		getAllProducts: returnAllProducts,
		deleteProduct: handleDelete
	};
})();

export default product;
