import { useOutletContext } from 'react-router';
import styles from './CartPage.module.css';
import useCartExpandedItems from '../../hooks/useCartExpandedItems';
import CartItem from '../cartItem/CartItem';

const CartPage = () => {
    const { cartObj, setSpecificAmount, removeItemFromCart } = useOutletContext();
    const { itemData, loading, error } = useCartExpandedItems(cartObj);

    if (loading) return <p>Loading cart...</p>;
    if (error) return <p>Error loading cart items.</p>;
    if (cartObj.size === 0) return <p className={styles.empty}>Your cart is empty.</p>;

    const activeItems = itemData.filter(item => cartObj.has(item.id));

    const total = activeItems.reduce(
        (sum, item) => sum + item.price * cartObj.get(item.id),
        0
    );
    const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(total);

    return (
        <div className={styles.cartPage}>
            <div className={styles.cartContainer}>
                <h2 className={styles.heading}>Shopping Cart</h2>
                <div className={styles.itemList}>
                    {activeItems.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            quantity={cartObj.get(item.id)}
                            setSpecificAmount={setSpecificAmount}
                            removeItemFromCart={removeItemFromCart}
                        />
                    ))}
                </div>
                <div className={styles.totalSection}>
                    <span>Total:</span>
                    <span className={styles.totalPrice}>{formattedTotal}</span>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
