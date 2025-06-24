import React, { createContext, useEffect, useState } from 'react'
import { updateStock } from '../api/product/updateStock';
import { getProductById2 } from "../api/product/getProductById";
import { deleteProduct } from '../api/product/deleteProduct';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const cartSaved = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartSaved);
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]);

    //Add to cart
    const handleAddToCart = (product, stockAvaiable) => {
        if (stockAvaiable > 0) {
            if (cart.find(p => p.product._id === product._id)) {
                const newCart = cart.map((item) =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                setCart(newCart);
            } else {
                const item = {
                    product,
                    quantity: 1
                }
                setCart([...cart, item]);
            }
        }
    }


    //Remove cart
    const handleRemoveInCart = (id) => {
        const newCart = cart.filter((item) => item.product._id !== id);
        setCart(newCart);
    }

    //update quantity
    const handleUpdateQuantity = (id, quantity) => {
        const newCart = cart.map((item) =>
            item.product._id === id ? { ...item, quantity } : item
        )
        setCart(newCart);
    }

    //Empty cart
    const handleClearCart = () => {
		localStorage.removeItem('cart');
        setCart([]);
    }

    //update stock
    const handleUpdateStock = async () => {
        for (const item of cart) {
            await updateStock(item.product._id, item.product.stock - item.quantity);
        }
    }

    //get product by id
    const handleGetProductById = async (id) => {
        try {
            const product = await getProductById2(id);
            return product;
        } catch (error) {
            return null;
        }
    }

    //delete product
    const handleDeleteProduct = async (id) => {
        await deleteProduct(id);
    }


    const data = {
        cart,
        handleUpdateQuantity,
        handleAddToCart,
        handleRemoveInCart,
        handleClearCart,
        handleUpdateStock,
        handleGetProductById,
        handleDeleteProduct
    };

    return <ProductContext.Provider value={data}>{children}</ProductContext.Provider>;
}