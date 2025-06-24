import { createBrowserRouter } from "react-router-dom";
import MainScreen from "../pages/MainScreen";
import Layout from "../layout/Layout";
import SellPage from "../pages/Product/SellPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import UserPage from "../pages/User/UserPage";
import UpdatePasswordPage from "../pages/User/updatePasswordPage";
import { getRandomProducts } from "../api/product/getRandomProducts";
import SearchPage from "../pages/Product/SearchPage";
import { getProductByName } from "../api/product/getProductByName";
import CategoriesPage from "../pages/Product/CategoriesPage";
import CategoryPage from "../pages/Product/CategoryPage";
import { getProductsByCategory } from "../api/product/getProductsByCategory";
import { getProductById } from "../api/product/getProductById";
import ProductDetailsPage from "../pages/Product/ProductDetailsPage";
import AnotherUserPage from "../pages/User/AnotherUserPage";
import { getUserById } from "../api/user/getUserById";
import CartPage from "../pages/Product/CartPage";
import FavoritesPage from "../pages/User/FavoritesPage";
import { getMyProducts } from "../api/user/getMyProducts";
import MyProductsPage from "../pages/User/MyProductsPage";
import UpdateProductPage from "../pages/Product/UpdateProductPage";


export const router = createBrowserRouter([
    //PUBLIC ROUTES
    {
        element: <PublicRoutes />,
        children: [
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/register',
                element: <RegisterPage />,
            },
        ]
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <MainScreen />,
                loader: getRandomProducts
            },
            {
                path: '/product',
                element: <SearchPage />,
                loader: getProductByName
            },
            {
                path: '/product/:id',
                element: <ProductDetailsPage />,
                loader: getProductById
            },
            {
                path: '/categories',
                element: <CategoriesPage />,
            },
            {
                path: '/category',
                element: <CategoryPage />,
                loader: getProductsByCategory
            },
            {
                path: '/user/:id',
                element: <AnotherUserPage />,
                loader: getUserById
            },
        ]

    },


    //PRIVATE ROUTES
    {
        element: <PrivateRoutes />,
        children: [
            {
                path: '/',
                element: <Layout />,
                children: [
                    {
                        path: '/product/sell',
                        element: <SellPage />,
                    },
                    {
                        path: '/user/me',
                        element: <UserPage />,
                    },
                    {
                        path: '/user/password',
                        element: <UpdatePasswordPage />,
                    },
                    {
                        path: '/user/favorites',
                        element: <FavoritesPage />,
                    },
                    {
                        path: '/user/products',
                        element: <MyProductsPage />,
                        loader: getMyProducts
                    },
                    {
                        path: '/user/product/update/:id',
                        element: <UpdateProductPage />,
                        loader: getProductById
                    },
                    {
                        path: '/cart',
                        element: <CartPage />,
                    }
                ]
            }
        ]
    }
])