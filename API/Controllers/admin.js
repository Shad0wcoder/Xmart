import { Products } from "../Models/Product.js";

// Add product
export const addProduct = async (req, res) => {
    const { title, description, price, category, qty, imgSrc } = req.body;
    try {
        const product = await Products.create({ title, description, price, category, qty, imgSrc });
        res.json({ message: 'Product added successfully!', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Products.find().sort({ createdAt: -1 });
        res.json({ message: 'All products', products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get product by ID
export const getProductsById = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Invalid Id' });
        res.json({ message: 'Specific product', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product by ID
export const updateProductsById = async (req, res) => {
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Invalid Id' });
        res.json({ message: 'Product has been updated', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete product by ID
export const deleteProductsById = async (req, res) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Invalid Id' });
        res.json({ message: 'Product has been deleted', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
