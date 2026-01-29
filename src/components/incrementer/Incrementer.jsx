const Incrementer = ({ currentValue, updateFn }) => {
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
        <div>
            <button type="button" aria-label="Decrement Quantity" onClick={() => handleChange(Number(currentValue - 1))}>-</button>
            <input type="text" inputMode="numeric" pattern="^$|^[1-9]\d*$" value={currentValue} onChange={(e) => handleChange(e.target.value)} onKeyDown={handleKeyDown} aria-label="Quantity" />
            <button type="button" aria-label="Increment Quantity" onClick={() => handleChange(Number(currentValue + 1))}>+</button>
        </div>
    )
}

export default Incrementer