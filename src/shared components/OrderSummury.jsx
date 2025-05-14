import React, { useContext, useState } from "react";
import { CartContext } from "../pages/cart/CartProvider";
import { IoPricetag } from "react-icons/io5";
import { FaTag } from "react-icons/fa6";

function OrderSummury() {
  let { cartItems, cartTotal, numOfItems } = useContext(CartContext);
  let discount = (cartTotal * 0.2).toFixed(2);
  let total = (cartTotal - discount + 5).toFixed(2);
  let [isCouponShown, setIsCouponShown] = useState(true);

  return (
    <div className="">
      <h4 className="font-bold text-xl lg:text-2xl">Order Summury</h4>

      <div className="space-y-2 mt-5">
        <div className="flex justify-between">
          <p>Subtotal: </p>
          <p className="font-bold text-base lg:text-xl">$ {cartTotal}</p>
        </div>
        <div className="flex justify-between">
          <p>Discount[20%]: </p>
          <p className="font-bold text-base lg:text-xl">$ {discount}</p>
        </div>
        <div className="flex justify-between">
          <p>Delivery Fee: </p>
          <p className="font-bold text-base lg:text-xl"> $ 5</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p className="font-bold text-base lg:text-xl">Total: </p>
          <p className="font-bold text-base lg:text-xl">$ {total}</p>
        </div>
      </div>

      <div className="relative mt-5">
        <div
          className={`flex gap-2 items-center pointer-events-none absolute top-2 ml-3 ${
            isCouponShown ? "block" : "hidden"
          }`}
        >
          <FaTag className="text-black/40" />
          <p className="text-black/40">Add promo code</p>
        </div>

        <form action="" className="flex gap-1 justify-between w-full">
          <input
            onClick={() => setIsCouponShown(!isCouponShown)}
            type="text"
            name="coupon"
            id="coupon"
            className="rounded-full bg-offwhite pl-2 py-2 w-full "
          />
          <input
            type="submit"
            value="Apply"
            className="rounded-full px-5 bg-black text-white"
          />
        </form>
      </div>
    </div>
  );
}
export default OrderSummury;
