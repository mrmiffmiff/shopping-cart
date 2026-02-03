import { useState } from 'react';
import styles from './ProductCard.module.css';
import Incrementer from '../incrementer/Incrementer';

const ProductCard = ({ itemId, itemName, itemImgUrl, itemPrice, addToCartFunc }) => {
    const [amount, setAmount] = useState(1);

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(itemPrice);

    return (
        <div>
            <img src={itemImgUrl || '../../assets/images/Placeholder.png'} alt="" /> {/*Empty alt because this is presentational. Blind user doesn't need a description, name is sufficient.*/}
            <h3>{itemName}</h3>
            <h4>{formattedPrice}</h4>
            <button type='button' onClick={() => addToCartFunc(itemId, amount)}>Add to Cart</button>
            <Incrementer
                currentValue={amount}
                updateFn={setAmount}
            />
        </div>
    )
}

export default ProductCard;