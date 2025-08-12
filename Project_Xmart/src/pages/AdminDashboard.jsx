'use client';

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';
import { toast, Bounce } from 'react-toastify';

const AdminDashboard = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const { products, setProducts } = useContext(AppContext);

  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    imgSrc: [''],
    category: '',
    qty: ''
  });

  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/product`);
      setProducts(data.products || []);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      price: '',
      description: '',
      imgSrc: [''],
      category: '',
      qty: ''
    });
    setEditingId(null);
  };

  const handleCreate = async () => {
    if (!window.confirm('Are you sure you want to create this product?')) return;

    const newProduct = { ...form, price: Number(form.price), qty: Number(form.qty) };

    try {
      const { data } = await axios.post(`${API_BASE_URL}/product/add`, newProduct, {
        headers: { Authorization: token }
      });

      setProducts(prev => [...prev, data.product]); // optimistic update
      toast.success('Product Created successfully ✔', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        theme: "dark",
        transition: Bounce,
      });
      resetForm();
    } catch (error) {
      console.error('Create error:', error);
    }
  };

  const handleEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
      imgSrc: product.imgSrc,
      category: product.category,
      qty: product.qty
    });
    setEditingId(product._id);
  };

  const handleUpdate = async (id) => {
    if (!window.confirm('Save changes to this product?')) return;

    const updatedProduct = { ...form, price: Number(form.price), qty: Number(form.qty) };

    try {
      const { data } = await axios.put(`${API_BASE_URL}/product/${id}`, updatedProduct, {
        headers: { Authorization: token }
      });

      setProducts(prev =>
        prev.map(p => (p._id === id ? data.product : p)) // optimistic update
      );

      toast.success('Product Updated successfully ✔', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        theme: "dark",
        transition: Bounce,
      });
      resetForm();
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/product/${id}`, {
        headers: { Authorization: token }
      });

      setProducts(prev => prev.filter(p => p._id !== id)); // optimistic update

      toast.success('Product Deleted successfully ✔', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Panel - Manage Products</h2>

      {/* FORM */}
      <div className='border p-4'>
        <h2 className='text-xl p-3 font-semibold font-sans'>Create/Update products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-black">
          <input
            className="border p-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="border p-2"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            className="border p-2"
            placeholder="Quantity"
            type="number"
            value={form.qty}
            onChange={(e) => setForm({ ...form, qty: e.target.value })}
          />
          <textarea
            className="border p-2"
            placeholder="Image URLs (comma separated)"
            value={form.imgSrc.join(", ")}
            onChange={(e) => setForm({ ...form, imgSrc: e.target.value.split(",").map(url => url.trim()) })}
          />

          <input
            className="border p-2"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <textarea
            className="border p-2 col-span-full"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {editingId ? (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => handleUpdate(editingId)}
          >
            Save Update
          </button>
        ) : (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleCreate}
          >
            Create Product
          </button>
        )}
      </div>

      {/* PRODUCT LIST */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">All Products</h3>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid lg:grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded p-4 flex flex-col md:flex-row justify-between items-start gap-4"
              >
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-sm md:text-base">{product.title}</h4>
                  <p>₹ {product.price}</p>
                  <p>Qty: {product.qty}</p>
                  <p className="text-sm text-gray-500">
                    Category: {product.category}
                  </p>
                  <p className="text-sm">{product.description}</p>
                  {product.imgSrc?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.imgSrc.map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          alt={`${product.title} - ${idx + 1}`}
                          className="w-[70px] h-[70px] object-cover rounded"
                        />
                      ))}
                    </div>
                  )}

                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
