import { useState, useEffect } from "react";

export default function useCartExpandedItems(cart) {
    const [itemData, setItemData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCartData() {
            try {
                const expandedCart = await Promise.all(
                    [...cart.entries()].map(async ([key, value]) => {
                        const response = await fetch(`https://fakestoreapi.com/products/${key}`, {
                            signal: controller.signal,
                        });
                        if (!response.ok) {
                            throw new Error(`HTTP error with status: ${response.status}`);
                        }
                        const cartItemData = await response.json();
                        const formattedcartItemData = {
                            "id": key,
                            "name": cartItemData["title"],
                            "url": cartItemData["image"],
                            "price": cartItemData["price"],
                            "amount": value,
                        };
                        return formattedcartItemData;
                    })
                );
                setItemData(expandedCart);
            }
            catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err);
                    setItemData(null);
                }
            }
            finally {
                setLoading(false);
            }
        }

        fetchCartData();

        return () => controller.abort();
    }, [cart]);

    return { itemData, loading, error };
}