import React from "react";

function OrderedProducts({ cartItems }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-black border border-black/50 rounded-[20px]">
                Name
              </th>
              <th className="text-black border border-black/50 rounded-[20px]">
                Quantity
              </th>
              <th className="text-black border border-black/50 rounded-[20px]">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr>
                <td className="border border-black/50 rounded-[20px]">
                  {item.name}
                </td>
                <td className="border border-black/50 rounded-[20px]">
                  {item.count}
                </td>
                <td className="border border-black/50 rounded-[20px]">
                  {item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderedProducts;
