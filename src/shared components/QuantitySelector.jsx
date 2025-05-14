import React from "react";

function QuantitySelector() {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={handleDecrease}
        type="button"
        className="size-10 leading-10 text-black text-xl font-bold transition hover:opacity-75"
      >
        -
      </button>

      <input
        type="number"
        id="Quantity"
        value={itemAmount}
        className="h-10 w-16 rounded-sm border border-black text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
      />

      <button
        onClick={handleIncrease}
        type="button"
        className="size-10 leading-10 text-black text-xl font-bold transition hover:opacity-75"
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
