import { useState } from "react";

export default function useCart() {
    const [cartObj, setCartObj] = useState(new Map());

    function addItemToCart(itemId, amount) {
        const newCart = structuredClone(cartObj);
        newCart.set(itemId, (newCart.get(itemId) || 0) + amount);
        setCartObj(newCart);
    }

    function setSpecificAmount(itemId, amount) {
        if (amount < 1) return;
        const newCart = structuredClone(cartObj);
        newCart.set(itemId, amount);
        setCartObj(newCart);
    }

    function incrementItem(itemId) {
        addItemToCart(itemId, 1);
    }

    function decrementItem(itemId) {
        if (cartObj.get(itemId) <= 1) return;
        addItemToCart(itemId, -1);
    }

    function removeItemFromCart(itemId) {
        const newCart = structuredClone(cartObj);
        if (!newCart.delete(itemId)) return;
        setCartObj(newCart);
    }

    return {
        cartObj,
        addItemToCart,
        setSpecificAmount,
        incrementItem,
        decrementItem,
        removeItemFromCart
    }
}