import styles from './StorePage.module.css';
import ProductCard from '../productCard/ProductCard';
import { sampleData } from './sampleData';

const StorePage = ({ addToCartFunc }) => {
    const itemData = sampleData;

    const itemCards = itemData.map(item =>
        <ProductCard
            key={item.id}
            itemId={item.id}
            itemName={item.name}
            itemImgUrl={item.url}
            itemPrice={item.price}
            addToCartFunc={addToCartFunc}
        />
    );

    return (
        <div className={styles.store}>
            {itemCards}
        </div>
    );
}

export default StorePage;