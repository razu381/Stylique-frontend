import React from "react";

function AllProducts() {
  const {
    isLoading,
    error,
    data: products = [],
  } = useQuery({
    queryKey: ["order", user?.email],
    queryFn: async () => {
      let result = await axios.get(`http://localhost:3000/products`);

      return result.data;
    },
  });
  return (
    <div className="max-w-full px-5 lg:max-w-[1140px] lg:mx-auto py-10 lg:py-20">
      <p className="mb-5">Home {">"} All Products</p>
      <h2 className="font-bold text-3xl lg:text-4xl">All Produts</h2>
    </div>
  );
}

export default AllProducts;
