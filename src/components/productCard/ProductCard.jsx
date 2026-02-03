import { useState } from 'react';
import styles from './ProductCard.modules.css';
import Incrementer from '../incrementer/Incrementer';

const ProductCard = ({ itemId, itemName, itemImgUrl, addToCartFunc }) => {
    const [amount, setAmount] = useState(1);

    return (
        <div>
            <img src={itemImgUrl ? itemImgUrl : '../../assets/images/Placeholder.png'} alt="Item Image" />
            <h3>{itemName}</h3>
            <button type='button' onClick={() => addToCartFunc(itemId, amount)}>Add to Cart</button>
            <Incrementer
                currentValue={amount}
                updateFn={setAmount}
            />
        </div>
    )
}

export default ProductCard;