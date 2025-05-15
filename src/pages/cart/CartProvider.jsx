import React, { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  let [cartItems, setCartItems] = useState(() => {
    try {
      //there could be  corrupt  data, thats why checking
      let data = sessionStorage.getItem("cartDetails");
      return data ? JSON.parse(data) : [];
    } catch {
      sessionStorage.removeItem("cartDetails");
      return [];
    }
  });
  let [cartTotal, setcartTotal] = useState(0);
  let [numOfItems, setNumOfItems] = useState(0);
  let [idempotencyKey, setIdempotencyKey] = useState(() => {
    const existingKey = sessionStorage.getItem("idempotencyKey");
    if (existingKey) return existingKey;

    const newKey = crypto.randomUUID();
    sessionStorage.setItem("idempotencyKey", newKey);
    return newKey;
  });

  useEffect(() => {
    sessionStorage.setItem("cartDetails", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.count;
    });
    setcartTotal(total.toFixed(2));
  }, [cartItems]);

  useEffect(() => {
    let totalCount = 0;
    cartItems.forEach((item) => {
      totalCount += item.count;
    });
    setNumOfItems(totalCount);
  }, [cartItems]);

  function addToCart(item) {
    setCartItems((prevItems) => [...prevItems, item]);
  }

  function removeFromCart(id) {
    console.log("remove request", id);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartItemId != id)
    );
    console.log("Items after removal ", cartItems);
  }

  function clearCart() {
    setCartItems([]);
    resetIdempotencyKey();
  }

  function updateCart(productId, amount) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId
          ? { ...item, count: item.count + amount }
          : item
      )
    );
  }

  function resetIdempotencyKey() {
    const newKey = crypto.randomUUID();
    setIdempotencyKey(newKey);
    sessionStorage.setItem("idempotencyKey", newKey);
  }

  let cartDetails = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateCart,
    cartTotal,
    numOfItems,
    idempotencyKey,
    resetIdempotencyKey,
  };

  return (
    <CartContext.Provider value={cartDetails}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
