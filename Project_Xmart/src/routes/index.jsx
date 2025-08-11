import { createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import ProductDetail from "../components/product/ProductDetail";
import SearchProduct from "../components/product/SearchProduct";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Address from "../pages/Address";
import Checkout from "../pages/Checkout";
import CategoryPage from "../components/product/CategoryPage";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import FAQ from "../pages/FAQ";
import ProtectedRoute from "../pages/ProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";
import Unauthorized from "../pages/Unauthorized";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "signup",
                element: <SignUp />
            },
            {
                path: "/product/:id",
                element: <ProductDetail />
            },
            {
                path: "/product/search/:term",
                element: <SearchProduct />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/shipping",
                element: <Address />
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/category/:category",
                element: <CategoryPage />
            },
            {
                path: "/about",
                element: <AboutUs />
            },
            {
                path: "/contact",
                element: <ContactUs />
            },
            {
                path: "/faq",
                element: <FAQ />
            },
            {
                path: "/admin/dashboard",
                element: (
                    <ProtectedRoute roles={['admin']}>
                        <AdminDashboard />
                    </ProtectedRoute>
                )
            },
            {
                path: "/unauthorized",
                element: <Unauthorized /> // Optional, redirect here if role check fails
            }

        ]
    }
])

export default router;