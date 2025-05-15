import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

function ProductGrid({ title, category }) {
  const {
    isLoading,
    error,
    refetch,
    isRefetching,
    data: products = [],
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      let result = await axios.get(
        `https://stylique-backend.vercel.app/products/category/${category}`
      );

      return result.data;
    },
  });

  return (
    <div>
      <h2 className="font-bold text-3xl md:text-5xl text-center mt-32 mb-10 uppercase">
        {title}
      </h2>

      {(isLoading || isRefetching) && <Spinner />}
      {error && (
        <p className="text-red-600 text-center">
          `There's been an error loading products. ${error}`
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <Product productInfo={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
