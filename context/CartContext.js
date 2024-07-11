import React, { createContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const totalCartPrice = useMemo(() => {
        const total = cart.reduce((total, item) => {
            console.log('Item totalPrice:', item.totalPrice); // Verificar los valores de totalPrice
            return total + item.totalPrice;
        }, 0);
        console.log('Total Cart Price:', total); // Verificar el total calculado
        return total;
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, setCart, totalCartPrice }}>
            {children}
        </CartContext.Provider>
    );
};


export default CartContext;