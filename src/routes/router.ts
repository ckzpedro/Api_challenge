import { Router } from "express";
import ProductsController from "../controllers/products/ProductsController";

const router: Router = Router()

router.get('/products', ProductsController.getProducts)

router.post('/create_product', ProductsController.createProduct)

export { router };