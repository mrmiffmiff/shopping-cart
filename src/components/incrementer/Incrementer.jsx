import styles from './Incrementer.module.css';
import { Plus, Minus } from 'lucide-react';

const Incrementer = ({ currentValue, updateFn, itemName, onBlur }) => {
    function handleChange(newVal) {
        if (typeof newVal !== "number") {
            if (newVal === "") {
                updateFn(newVal);
                return;
            }
        }
        const numVal = Number(newVal)
        if (numVal >= 1) {
            updateFn(numVal)
        }
    }

    function handleKeyDown(event) {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            const numericValue = currentValue === "" ? 0 : Number(currentValue);
            handleChange(numericValue + 1);
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            const numericValue = currentValue === "" ? 0 : Number(currentValue);
            handleChange(numericValue - 1);
        }
    }

    return (
        <div className={styles.incrementer}>
            <button className={styles.incrementerButton} type="button" aria-label={itemName ? `Decrement ${itemName} Quantity` : "Decrement Quantity"} onClick={() => handleChange(Number(currentValue - 1))} disabled={currentValue <= 1 || currentValue === ""}><Minus color='white' /></button>
            <input className={styles.incrementerField} type="text" inputMode="numeric" pattern="^$|^[1-9]\d*$" value={currentValue} onChange={(e) => handleChange(e.target.value)} onKeyDown={handleKeyDown} onBlur={onBlur} aria-label={itemName ? `${itemName} Quantity` : "Quantity"} />
            <button className={styles.incrementerButton} type="button" aria-label={itemName ? `Increment ${itemName} Quantity` : "Increment Quantity"} onClick={() => handleChange(Number(currentValue + 1))}><Plus color='white' /></button>
        </div >
    )
}

export default Incrementer