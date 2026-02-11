import { useState } from 'react';
import styles from './CartItem.module.css';
import Incrementer from '../incrementer/Incrementer';
import Placeholder from '../../assets/images/Placeholder.png';
import { X } from 'lucide-react';

const CartItem = ({ item, quantity, setSpecificAmount, removeItemFromCart }) => {
    const [displayValue, setDisplayValue] = useState(null);
    const [imgError, setImgError] = useState(false);

    const visibleValue = displayValue !== null ? displayValue : quantity;

    const itemTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(item.price * quantity);

    const nameId = `cart-item-name-${item.id}`;

    function handleUpdateValue(newValue) {
        if (newValue === "") {
            setDisplayValue("");
        } else {
            setSpecificAmount(item.id, newValue);
            setDisplayValue(null);
        }
    }

    function handleBlur() {
        setDisplayValue(null);
    }

    return (
        <article className={styles.cartItem} aria-labelledby={nameId}>
            <img
                src={imgError ? Placeholder : (item.url || Placeholder)}
                alt=""
                className={styles.thumbnail}
                onError={() => setImgError(true)}
            />
            <h3 id={nameId} className={styles.itemName}>{item.name}</h3>
            <div className={styles.itemControls}>
                <Incrementer
                    currentValue={visibleValue}
                    updateFn={handleUpdateValue}
                    itemName={item.name}
                    onBlur={handleBlur}
                />
                <button
                    className={styles.removeButton}
                    onClick={() => removeItemFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    type="button"
                >
                    <X color="white" size={20} />
                </button>
                <span className={styles.itemPrice} aria-label={`Item total: ${itemTotal}`}>
                    {itemTotal}
                </span>
            </div>
        </article>
    );
};

export default CartItem;
