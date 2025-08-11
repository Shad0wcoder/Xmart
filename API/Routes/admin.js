import express from 'express';
import { addProduct, updateProductsById, deleteProductsById, getProducts } from '../Controllers/product.js';

const router = express.Router();

router.get('/admin/product', getProducts);
router.post('/admin/product', addProduct);
router.put('/admin/product/:id', updateProductsById);
router.delete('/admin/product/:id', deleteProductsById);

export default router;
