import { getProducts, getPage } from "./Pages/product.js";

const router = {
	index: getProducts,
	page: getPage
};
export default router;
