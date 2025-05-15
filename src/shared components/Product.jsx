import React from "react";
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";

function Product({ productInfo }) {
  let { _id, name, image, rating, price } = productInfo;

  return (
    <Link to={`/products/${_id}`} className="space-y-2">
      <img src={image} alt={name} className="rounded-3xl" />
      <h3 className="stylique-manrope font-bold text-xl">{name}</h3>
      <div className="flex justify-start items-center gap-5">
        <Rating
          style={{ maxWidth: 100 }}
          value={rating}
          readOnly
          className="w-contain"
        />
        <p>{rating}/5</p>
      </div>

      <p className="font-bold text-2xl">$ {price}</p>
    </Link>
  );
}

export default Product;
