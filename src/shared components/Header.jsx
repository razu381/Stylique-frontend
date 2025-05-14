import React, { useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CartContext } from "../pages/cart/CartProvider";

function Header() {
  let { cartItems, cartTotal, numOfItems } = useContext(CartContext);
  let li = (
    <>
      <li className="font-medium">Home</li>
      <li className="font-medium">Men</li>
      <li className="font-medium">Women</li>
      <li className="font-medium">Popular</li>
      <li className="font-medium">All Prouducts</li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {li}
          </ul>
        </div>
        <Link to="/" className="font-bold text-3xl font-heading uppercase">
          Stylique
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5">{li}</ul>
      </div>
      <div className="navbar-end space-x-5">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />{" "}
              </svg>
              <span className="badge badge-sm indicator-item bg-black text-white">
                {numOfItems}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div className="card-body ">
              <span className="text-lg font-bold font-heading">
                {numOfItems} Items
              </span>
              <span className="font-medium font-body">
                <b>Subtotal:</b> $ {cartTotal}
              </span>
              <div className="card-actions ">
                <Link
                  to="/cart"
                  className="btn font-body bg-black rounded-full text-white btn-block"
                >
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        <FaRegUserCircle size={25} />
      </div>
    </div>
  );
}

export default Header;
