import styles from './StorePage.module.css';
import ProductCard from '../productCard/ProductCard';
import useFakeStoreItems from '../../hooks/useFakeStoreItems';
import { useOutletContext } from 'react-router';

const StorePage = () => {
    const { addItemToCart } = useOutletContext();
    const { itemData, loading, error } = useFakeStoreItems();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading store items.</p>;

    const itemCards = itemData.map(item =>
        <ProductCard
            key={item.id}
            itemId={item.id}
            itemName={item.name}
            itemImgUrl={item.url}
            itemPrice={item.price}
            addToCartFunc={addItemToCart}
        />
    );

    return (
        <div className={styles.store}>
            {itemCards}
        </div>
    );
}

export default StorePage;