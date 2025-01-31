import { editProduct, getProduct, getProducts } from "./Pages/product.js";

const router = {
	index: getProducts,
	edit: editProduct,
	product: getProduct
};
export default router;
