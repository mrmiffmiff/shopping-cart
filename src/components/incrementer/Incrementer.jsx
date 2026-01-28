const Incrementer = ({ currentValue, updateFn }) => {
    function handleChange(newVal) {
        if (newVal >= 1) {
            updateFn(newVal)
        }
    }

    return (
        <div>
            <button type="button" aria-label="Decrement Quantity" onClick={() => handleChange(Number(currentValue - 1))}>-</button>
            <input type="number" min="1" value={currentValue} onChange={(e) => handleChange(Number(e.target.value))} aria-label="Quantity" />
            <button type="button" aria-label="Increment Quantity" onClick={() => handleChange(Number(currentValue + 1))}>+</button>
        </div>
    )
}

export default Incrementer