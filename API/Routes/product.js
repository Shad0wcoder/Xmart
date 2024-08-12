import express from 'express'
import { addProduct, deleteProductsById, getProducts, getProductsById, updateProductsById } from '../Controllers/product.js';

const router = express.Router();

// add product
router.post('/add',addProduct)

// get product
router.get('/all',getProducts)

//get product by id
router.get('/:id',getProductsById)

//update product by Id
router.put('/:id',updateProductsById)

//delete product by Id
router.delete('/:id',deleteProductsById)

export default router