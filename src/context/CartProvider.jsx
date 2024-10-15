import { createContext, useState, useEffect } from 'react';

// Crea el contexto
export const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const addToCart = (product) => {
        let newCart = [...cartItems];
        const existingProduct = newCart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            newCart.push({ ...product, quantity: 1 });
        }

        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    // Eliminar un artículo del carrito
    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartItemsCount }}>
            {children}
        </CartContext.Provider>
    );
};
