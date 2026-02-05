import { useState, useEffect } from "react";

export default function useFakeStoreItems() {
    const [itemData, setItemData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchStoreData() {
            try {
                const response = await fetch('https://fakestoreapi.com/products', {
                    signal: controller.signal,
                });
                if (!response.ok) {
                    throw new Error(`HTTP error with status: ${response.status}`);
                }
                const storeData = await response.json();
                const formattedStoreItems = storeData.map((dataItem) => {
                    return {
                        "id": dataItem["id"],
                        "name": dataItem["title"],
                        "url": dataItem["image"],
                        "price": dataItem["price"],
                    }
                });
                setItemData(formattedStoreItems);
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

        fetchStoreData();

        return () => controller.abort();
    }, []);

    return { itemData, loading, error }
}