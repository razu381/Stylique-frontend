import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product";

function ProductGrid({ title, category }) {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://stylique-backend.vercel.app//products/category/${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);
  //console.log(products);

  return (
    <div>
      <h2 className="font-bold text-3xl md:text-5xl text-center mt-32 mb-10 uppercase">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <Product productInfo={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
