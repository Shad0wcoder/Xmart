import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppState = (props) => {
    const url = "http://localhost:1000/api";

    const [products, setProducts] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))
    const [filteredData, setFilteredData] = useState([])
    const [user, setUser] = useState()
    const [cart, setCart] = useState([])
    const [reload, setReload] = useState(false)
    const [userAddress, setUserAddress] = useState()
    const [role, setRole] = useState('')


    useEffect(() => {
        const fetchProduct = async () => {
            const api = await axios.get(`${url}/product/all`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            console.log(api.data.products);
            setProducts(api.data.products)
            setFilteredData(api.data.products)
            userProfile()
        };
        fetchProduct();
        userCart()
        getAddress()
    }, [token,reload]);

    useEffect(() => {
        let lstoken = localStorage.getItem('token')
        // console.log("lstoken",lstoken);
        if (lstoken) {
            setToken(lstoken)
            setIsAuthenticated(true)
        }
    })

    //register user
    const register = async (name, email, password, role) => {
        const api = await axios.post(`${url}/user/register`, {
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
        const api = await axios.post(`${url}/user/login`, {
            email, password
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
        // console.log("user login",api.data);
        setToken(api.data.token)
        localStorage.setItem('token', api.data.token)
        setIsAuthenticated(true)
        return api.data;
    };


    //logout user
    const logout = () => {
        setIsAuthenticated(false)
        setToken(" ")
        localStorage.removeItem('token')
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
        const api = await axios.get(`${url}/user/profile`, {
            headers: {
                "Content-Type": "application/json",
                "Auth": token
            },
            withCredentials: true,
        });
        console.log("user profile", api.data);
        setUser(api.data.user)
    };

    // Add to cart
    const addToCart = async (productId, title, price, qty, imgSrc) => {
        const api = await axios.post(`${url}/cart/add`,
            {productId, title, price, qty, imgSrc}, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token
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
        const api = await axios.get(`${url}/cart/user`, {
            headers: {
                "Content-Type": "application/json",
                "Auth": token
            },
            withCredentials: true,
        });
        // console.log("user cart", api.data.cart);
        setCart(api.data.cart)
        // setUser("user cart",api)
    };

    // dec qty
    const decreaseQty = async (productId, qty) => {
        const api = await axios.post(`${url}/cart/--qty`, {productId, qty}, {
            headers: {
                "Content-Type": "application/json",
                "Auth": token
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
        const api = await axios.delete(`${url}/cart/remove/${productId}`, {
            headers: {
                "Content-Type": "application/json",
                "Auth": token
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
        const api = await axios.delete(`${url}/cart/clear`, {
            headers: {
                "Content-Type": "application/json",
                "Auth": token
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
        const api = await axios.post(`${url}/address/add`,{fullName, address, city, state, country, pincode, phoneNumber}, {
            headers: {
                "Content-Type": "application/json",
                "Auth": token
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
            const api = await axios.get(`${url}/address/get`, {
                headers: {
                    "Content-Type": "application/json",
                    "Auth":token
                },
                withCredentials: true,
            });
            console.log("user address",api.data.userAddress);
            setUserAddress(api.data.userAddress)
        };
        
        // update role
        // const updateRole = async (newRole) => {
        //         const api = await axios.patch(`${url}/user/role`, { role: newRole }, {
        //             headers: { "Content-Type": "application/json", "Auth": token },
        //             withCredentials: true,
        //         });
        //         notify(api.data.message, api.data.success ? 'success' : 'error');
        //         setRole(newRole);
        //         return api.data;
        // };
    return (
        <AppContext.Provider value={{
            products, register, login, url, token, setIsAuthenticated, isAuthenticated, setFilteredData, filteredData, logout, user, addToCart, cart, decreaseQty, removeFromCart, clearCart, shippingAddress, userAddress, getAddress
        }}>{props.children}</AppContext.Provider>
    );
}
export default AppState