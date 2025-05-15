import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../../shared components/Spinner";
import Product from "../../shared components/Product";
import { Rating } from "@smastrom/react-rating";
import { Controller, useForm } from "react-hook-form";

function AllProducts() {
  let [categoryFilter, setCategoryFilter] = useState("");
  //   let [ratingFilter, setRatingFilter] = useState("");
  let [priceFilter, setPriceFilter] = useState();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  let ratingFilter = watch("rating");
  //   console.log(rating);
  //   useEffect(() => {
  //     setRatingFilter(watch("rating"));
  //   }, []);

  console.log(ratingFilter);

  function onSubmit(data) {
    console.log(data);
  }

  const {
    isLoading,
    error,
    refetch,
    isRefetching,
    data: products = [],
  } = useQuery({
    queryKey: ["allorders", categoryFilter, ratingFilter],
    queryFn: async () => {
      let result = await axios.get(
        `https://stylique-backend.vercel.app/products?category=${categoryFilter}&price=${priceFilter}`
      );

      return result.data;
    },
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      let result = await axios.get(
        `https://stylique-backend.vercel.app/categories`
      );

      return result.data;
    },
  });

  const { data: filterstats = [] } = useQuery({
    queryKey: ["filterstats"],
    queryFn: async () => {
      let result = await axios.get(
        `https://stylique-backend.vercel.app/products/filter-stats`
      );

      return result.data;
    },
  });

  console.log("filter stats ", priceFilter);

  function handleCategoryFilter(e) {
    setCategoryFilter(e.target.value);
  }
  return (
    <div className="max-w-full px-5 lg:max-w-[1140px] lg:mx-auto py-10 lg:py-20">
      <p className="mb-5">Home {">"} All Products</p>
      <h2 className="font-bold text-3xl lg:text-4xl mb-10">All Produts</h2>

      {isLoading || (isRefetching && <Spinner />)}
      {error && (
        <p className="text-red-600 text-center">
          `There's been an error loading products. ${error}`
        </p>
      )}

      <div className="pb-5 flex justify-between ">
        <div className="w-full">
          <select
            onChange={handleCategoryFilter}
            defaultValue="Filter by Category"
            className="select"
          >
            <option disabled={true}>Filter by Category</option>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <p className="">{priceFilter}</p>
          <input
            onChange={(e) => setPriceFilter(e.target.value)}
            type="range"
            min={filterstats.price?.min}
            max={filterstats.price?.max}
            value={priceFilter}
            className="range text-blue-300 [--range-bg:black] [--range-thumb:white] [--range-fill:0]"
          />
          <p className="">
            min: {filterstats.price?.min} | max:{filterstats.price?.max} |{" "}
          </p>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mx-[20%]">
              <Controller
                control={control}
                name="rating"
                rules={{
                  validate: (rating) => rating > 0,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Rating
                    value={value}
                    isRequired
                    onChange={onChange}
                    visibleLabelId="rating_label"
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.rating && <div>Rating is required.</div>}
            </div>
          </form>
        </div>
      </div>
      {
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <Product productInfo={product} key={product.id} />
          ))}
        </div>
      }
    </div>
  );
}

export default AllProducts;
