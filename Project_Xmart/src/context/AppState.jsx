import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppState = (props) => {

    // const url = "http://localhost:5000/api";
    const API_BASE_URL = "https://xmart-1.onrender.com/api";


    const [products, setProducts] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))
    const [filteredData, setFilteredData] = useState([])
    const [user, setUser] = useState(null)
    const [cart, setCart] = useState([])
    const [reload, setReload] = useState(false)
    const [userAddress, setUserAddress] = useState()
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser && typeof parsedUser === "object") {
                setUser(parsedUser);
            }
        } catch (err) {
            localStorage.removeItem("user");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            const api = await axios.get(`${API_BASE_URL}/product/all`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            setProducts(api.data.products)
            setFilteredData(api.data.products)
            userProfile()
        };
        fetchProduct();
        userCart()
        getAddress()
    }, [token, reload]);

    useEffect(() => {
        const lstoken = localStorage.getItem('token');
        if (lstoken) {
            setToken(lstoken);
            setIsAuthenticated(true);
        }
    }, []);







    //register user
    const register = async (name, email, password, role) => {
        const api = await axios.post(`${API_BASE_URL}/user/register`, {
            name, email, password, role
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        // alert(api.data.message)
        toast(api.data.message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
        return api.data;
        // console.log("user register",api);
    };

    //login user
    const login = async (email, password) => {
        try {
            const api = await axios.post(`${API_BASE_URL}/user/login`, {
                email, password
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (api.data.success) {
                toast(api.data.message, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
                setUser(api.data.user);
                localStorage.setItem('user', JSON.stringify(api.data.user));
                setToken(api.data.token);
                localStorage.setItem('token', api.data.token);
                setIsAuthenticated(true);
            } else {
                toast(api.data.message, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            }
            return api.data;
        } catch (error) {
            toast("An error occurred. Please try again.", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            });
            setIsAuthenticated(false);
            localStorage.removeItem('token');
        }
    };




    //logout user
    const logout = () => {
        setIsAuthenticated(false)
        setToken(" ")
        localStorage.removeItem('token')
        localStorage.removeItem('user');
        toast("logout Successfully....", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
    }

    // user profile
    const userProfile = async () => {
        const api = await axios.get(`${API_BASE_URL}/user/profile`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            withCredentials: true,
        });
        // console.log("user profile", api.data);
        setUser(api.data.user)
        localStorage.setItem('user', JSON.stringify(api.data.user));
    };

    // Add to cart
    const addToCart = async (productId, title, price, qty, imgSrc) => {
        const api = await axios.post(`${API_BASE_URL}/cart/add`,
            { productId, title, price, qty, imgSrc }, {
            headers: {
                "Content-Type": "Application/json",
                "Authorization": token
            },
            withCredentials: true,
        });
        setReload(!reload)
        // console.log("my cart",api);
        toast(api.data.message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });

    };

    // User Cart
    const userCart = async () => {
        const api = await axios.get(`${API_BASE_URL}/cart/user`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            withCredentials: true,
        });
        // console.log("user cart", api.data.cart);
        setCart(api.data.cart)
        // setUser("user cart",api)
    };

    // dec qty
    const decreaseQty = async (productId, qty) => {
        const api = await axios.post(`${API_BASE_URL}/cart/--qty`, { productId, qty }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            withCredentials: true,
        });
        setReload(!reload)
        toast(api.data.message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
        // console.log("decreasr cart qty", api);
        // setCart(api.data.cart)
        // setUser("user cart",api)
    };

    // remove Item from Cart
    const removeFromCart = async (productId, qty) => {
        const api = await axios.delete(`${API_BASE_URL}/cart/remove/${productId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            withCredentials: true,
        });
        setReload(!reload)
        toast("remove item from cart", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
        // console.log("decreasr cart qty", api);
        // setCart(api.data.cart)
        // setUser("user cart",api)
    };

    // clear cart
    const clearCart = async () => {
        const api = await axios.delete(`${API_BASE_URL}/cart/clear`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            withCredentials: true,
        });
        setReload(!reload)
        toast("Clear Cart", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
        // console.log("decreasr cart qty", api);
        // setCart(api.data.cart)
        // setUser("user cart",api)
    };


    // Add Shipping Address
    const shippingAddress = async (fullName, address, city, state, country, pincode, phoneNumber) => {
        const api = await axios.post(`${API_BASE_URL}/address/add`, { fullName, address, city, state, country, pincode, phoneNumber }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            withCredentials: true,
        });
        setReload(!reload)
        toast("Address Added", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
        return api.data
        // console.log("decreasr cart qty", api);
        // setCart(api.data.cart)
        // setUser("user cart",api)
    };

    // Get user latest address
    const getAddress = async () => {
        const api = await axios.get(`${API_BASE_URL}/address/get`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            withCredentials: true,
        });
        setUserAddress(api.data.userAddress)
    };

    // Admin Dashboard Data
    const adminDashboard = async () => {
        try {
            const api = await axios.get(`${API_BASE_URL}/admin/dashboard`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                withCredentials: true,
            });
            // console.log("Admin Dashboard Data", api.data);
            return api.data; // return to use in component
        } catch (error) {
            console.error("Error fetching admin dashboard", error);
            toast("Failed to fetch admin dashboard data.", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            });
            return null;
        }
    };
    // Create Product
    const addProduct = async (newProduct) => {
        try {
            const { data } = await axios.post(`${API_BASE_URL}/product/add`, newProduct, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                withCredentials: true,
            });
            toast("Product created successfully", {
                position: "top-center", autoClose: 1500, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: true, draggable: true,
                progress: undefined, theme: "dark", transition: Slide,
            });
            setReload(prev => !prev); // refresh products
            return data;
        } catch (err) {
            console.error("Create product failed", err);
            toast("Failed to create product", {
                position: "top-center", autoClose: 1500, hideProgressBar: true,
                theme: "dark", transition: Slide,
            });
            return null;
        }
    };

    // Update Product
    const updateProductsById = async (productId, updatedFields) => {
        try {
            const { data } = await axios.put(`${API_BASE_URL}/product/${id}`, updatedFields, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                withCredentials: true,
            });
            toast("Product updated successfully", {
                position: "top-center", autoClose: 1500, hideProgressBar: true,
                theme: "dark", transition: Slide,
            });
            setReload(prev => !prev);
            return data;
        } catch (err) {
            console.error("Update product failed", err);
            toast("Failed to update product", {
                position: "top-center", autoClose: 1500, hideProgressBar: true,
                theme: "dark", transition: Slide,
            });
            return null;
        }
    };


    // Delete Product
    const deleteProductsById = async (productId) => {
        try {
            const { data } = await axios.delete(`${API_BASE_URL}/product/${id}`, {
                headers: {
                    "Authorization": token
                },
                withCredentials: true,
            });
            toast("Product deleted", {
                position: "top-center", autoClose: 1500, hideProgressBar: true,
                theme: "dark", transition: Slide,
            });
            setReload(prev => !prev);
            return data;
        } catch (err) {
            console.error("Delete product failed", err);
            toast("Failed to delete product", {
                position: "top-center", autoClose: 1500, hideProgressBar: true,
                theme: "dark", transition: Slide,
            });
            return null;
        }
    };




    // update role
    // const updateRole = async (newRole) => {
    //         const api = await axios.patch(`${API_BASE_URL}/user/role`, { role: newRole }, {
    //             headers: { "Content-Type": "application/json", "Authorization": token },
    //             withCredentials: true,
    //         });
    //         notify(api.data.message, api.data.success ? 'success' : 'error');
    //         setRole(newRole);
    //         return api.data;
    // };
    return (
        <AppContext.Provider value={{
            products, register, login, url, token, setIsAuthenticated, isAuthenticated, setFilteredData, filteredData, logout, user, loading, addToCart, cart, decreaseQty, removeFromCart, clearCart, shippingAddress, userAddress, getAddress, setUser, adminDashboard, addProduct, updateProductsById, deleteProductsById, setProducts
        }}>{props.children}</AppContext.Provider>
    );
}
export default AppState