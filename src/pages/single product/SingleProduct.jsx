import { Rating } from "@smastrom/react-rating";
import { useLoaderData } from "react-router-dom";
import ReviewTab from "./ReviewTab";
import AllReviews from "./AllReviews";
import { useContext, useState } from "react";
import { CartContext } from "../cart/CartProvider";
import { toast } from "react-toastify";

function SingleProduct() {
  let productData = useLoaderData();
  let { cartItems, addToCart, updateCart } = useContext(CartContext);
  let [itemAmount, setItemAmount] = useState(1);

  let { _id, name, image, rating, category, price, description } = productData;
  //console.log(productData);

  function handleIncrease() {
    setItemAmount((itemAmount += 1));
  }
  function handleDecrease() {
    if (itemAmount > 1) {
      setItemAmount((itemAmount -= 1));
    }
  }

  function handleAddToCart() {
    let isExists = cartItems.some((item) => item.productId === _id);
    if (isExists) {
      updateCart(_id, itemAmount);
      setItemAmount(1);
    } else {
      let cartItemId = crypto.randomUUID();
      let data = {
        cartItemId,
        count: itemAmount,
        name,
        productId: _id,
        image,
        price,
        rating,
        category,
      };

      addToCart(data);
      setItemAmount(1);
    }
    toast.success(`${name} added to cart successfully`);
  }

  return (
    <div className="max-w-full px-5 lg:max-w-[1140px] lg:mx-auto">
      <section className="flex flex-col lg:flex-row gap-5 my-5 lg:my-20">
        <div className="flex-1/2">
          <img src={image} alt={name} className="rounded-[20px]" />
        </div>
        <div className="flex-1/2 space-y-5 md:ml-10">
          <h3 className="stylique-manrope font-bold text-3xl lg:text-4xl mt-5">
            {name}
          </h3>
          <div className="flex justify-start items-center gap-5">
            <Rating
              style={{ maxWidth: 100 }}
              value={rating}
              readOnly
              className="w-contain"
            />
            <p>{rating}/5</p>
          </div>
          <p className="font-bold text-2xl lg:text-3xl">$ {price}</p>
          <p className="text-black opacity-60">{description}</p>
          <div className="grid grid-cols-3 items-center">
            <div className="col-span-1">
              <div className="flex items-center gap-1">
                <button
                  onClick={handleDecrease}
                  type="button"
                  className="size-10 leading-10 text-black text-xl font-bold transition hover:opacity-75"
                >
                  -
                </button>

                <input
                  type="number"
                  id="Quantity"
                  value={itemAmount}
                  className="h-10 w-16 rounded-sm border border-black text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />

                <button
                  onClick={handleIncrease}
                  type="button"
                  className="size-10 leading-10 text-black text-xl font-bold transition hover:opacity-75"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="col-span-2 w-full lg:w-fit py-2 px-20 bg-black text-white font-medium rounded-full hover:bg-transparent hover:border hover:border-black hover:text-black"
            >
              Add to cart
            </button>
          </div>
        </div>
      </section>
      <div className="border border-black/10 pt-5 pb-16 px-5 lg:px-10 rounded-[20px] mb-20">
        <ReviewTab _id={_id} />
      </div>
    </div>
  );
}

export default SingleProduct;
