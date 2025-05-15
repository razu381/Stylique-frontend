import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import OrderedProducts from "../checkout/OrderedProducts";

function UserDashboard() {
  let { user } = useContext(AuthContext);

  const {
    isLoading: customerLoading,
    error: customerError,
    data: customer = [],
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      let result = await axios.get(
        `https://stylique-backend.vercel.app/customers/${user?.email}`
      );

      return result.data;
    },
  });

  const {
    isLoading: orderLoading,
    error: ordererError,
    data: orders = [],
  } = useQuery({
    queryKey: ["order", user?.email],
    queryFn: async () => {
      let result = await axios.get(
        `https://stylique-backend.vercel.app/checkout/${user?.email}`
      );

      return result.data;
    },
  });

  console.log(orders);

  return (
    <div className="max-w-full px-5 lg:max-w-[1140px] lg:mx-auto py-10 lg:py-20">
      <p className="mb-5">Home {">"} My account</p>
      <h2 className="font-bold text-3xl lg:text-4xl">My account</h2>
      <div className="flex flex-col md:flex-row gap-5 lg:gap-10 ">
        <div className="flex-1 border border-black/10 py-10  px-5 rounded-[20px] mt-5">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead></thead>
              <tbody className="font-bold">
                <tr>
                  <td>
                    Name: {customer.firstName} {customer.lastName}
                  </td>
                </tr>

                <tr>
                  <td>Email: {customer.email}</td>
                </tr>
                <tr>
                  <td>Phone: {customer.phone}</td>
                </tr>
                <tr>
                  <td>Address: {customer.address}</td>
                </tr>
                <tr>
                  <td>City: {customer.city}</td>
                </tr>
                <tr>
                  <td>State: {customer.state}</td>
                </tr>
                <tr>
                  <td>Zip code: {customer.zipcode}</td>
                </tr>
                <tr>
                  <td>Country: {customer.country}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-1 border border-black/10 py-10 px-5 rounded-[20px] mt-5 space-y-6">
          {orders.map((order) => (
            <div>
              <h4 className="font-bold mb-2">
                Order ID: {order?.idempotencyKey}
              </h4>
              <OrderedProducts cartItems={order?.cartItems} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
