import React, { useContext } from "react";
import CheckoutForm from "./CheckoutForm";
import OrderSummury from "../../shared components/OrderSummury";
import { CartContext } from "../cart/CartProvider";

function Checkout() {
  let { cartItems, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);

  return (
    <section className="max-w-full px-5 lg:max-w-[1140px] lg:mx-auto py-10 lg:py-20">
      <p className="mb-5">
        Home {">"} Cart {">"} Checkout
      </p>
      <h2 className="font-bold text-3xl lg:text-4xl">Checkout</h2>

      <div className="grid grid-cols-3 gap-5 lg:gap-10 w-full">
        <div className="col-span-3 lg:col-span-2 border border-black/10 py-10 px-5 rounded-[20px] mt-5">
          <CheckoutForm />
        </div>
        <div className="col-span-3 lg:col-span-1 border border-black/10 py-10 px-5 rounded-[20px] mt-5">
          <OrderSummury />
          <div>
            <h4 className="font-bold text-xl lg:text-2xl">Products</h4>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
