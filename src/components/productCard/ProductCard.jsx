import { useState } from 'react';
import styles from './ProductCard.module.css';
import Incrementer from '../incrementer/Incrementer';
import Placeholder from '../../assets/images/Placeholder.png'

const ProductCard = ({ itemId, itemName, itemImgUrl, itemPrice, addToCartFunc }) => {
    const [amount, setAmount] = useState(1);

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(itemPrice);

    return (
        <div className={styles.card}>
            <img src={itemImgUrl || Placeholder} alt="" className={styles.picture} /> {/*Empty alt because this is presentational. Blind user doesn't need a description, name is sufficient.*/}
            <h3 className={styles.name}>{itemName}</h3>
            <h4 className={styles.price}>{formattedPrice}</h4>
            <div className={styles.interactionManager}>
                <button type='button' onClick={() => addToCartFunc(itemId, amount)} className={styles.addButton}>Add to Cart</button>
                <Incrementer
                    currentValue={amount}
                    updateFn={setAmount}
                />
            </div>
        </div>
    )
}

export default ProductCard;