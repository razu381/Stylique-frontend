import React, { useContext, useEffect } from "react";
import { CartContext } from "./CartProvider";
import { MdDelete } from "react-icons/md";
import { HiH3 } from "react-icons/hi2";
import OrderSummury from "../../shared components/OrderSummury";
import { Link } from "react-router-dom";

function Cart() {
  let { cartItems, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);

  return (
    <section className="max-w-full px-5 lg:max-w-[1140px] lg:mx-auto py-10 lg:py-20">
      <p className="mb-5">Home {">"} cart</p>
      <h2 className="font-bold text-3xl lg:text-4xl">Your Cart</h2>

      {cartItems.length != 0 ? (
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-3 lg:col-span-2 border border-black/10 py-2 px-3 rounded-[20px] mt-5">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr>
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-w-[98px] lg:max-w[124px] rounded-xl"
                        />
                      </td>
                      <td className="space-y-1">
                        <p className="font-bold lg:text-xl">{item.name}</p>
                        <p className="text-black/60">
                          <b>Rating: </b> {item.rating}
                        </p>
                        <p className="text-black/60">
                          <b>Category: </b> {item.category}
                        </p>
                        <p className="font-bold text-lg lg:text-lg">
                          $ {item.price}
                        </p>
                      </td>
                      <td>
                        <MdDelete
                          onClick={() => removeFromCart(item.cartItemId)}
                          size={30}
                          color="red"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-span-3 lg:col-span-1 border border-black/10 py-10 px-5 rounded-[20px] mt-5">
            <OrderSummury className="py-5" />
            <Link
              to="/checkout"
              className="block text-center bg-black text-white py-2  rounded-full mt-5 cursor-pointer"
            >
              Checkout
            </Link>
          </div>
        </div>
      ) : (
        <p className="font-bold py-10">You don't have any item in cart</p>
      )}
    </section>
  );
}
export default Cart;
