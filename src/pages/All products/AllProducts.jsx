import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../../shared components/Spinner";
import Product from "../../shared components/Product";
import { Rating } from "@smastrom/react-rating";
import { Controller, useForm } from "react-hook-form";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

function AllProducts() {
  let [categoryFilter, setCategoryFilter] = useState("");
  let [ratingFilter, setRatingFilter] = useState("");
  let [priceFilter, setPriceFilter] = useState([0, 1000]);

  //   const {
  //     register,
  //     handleSubmit,
  //     control,
  //     watch,
  //     reset,
  //     formState: { errors },
  //   } = useForm({
  //     defaultValues: {
  //       rating: 0,
  //     },
  //   });

  //let ratingFilter = watch("rating") || 0;

  //   function onSubmit(data) {
  //     console.log(data);
  //   }

  //   const {
  //     isLoading,
  //     error,
  //     refetch,
  //     isRefetching,
  //     data: products = [],
  //   } = useQuery({
  //     queryKey: ["allorders", categoryFilter, ratingFilter, priceFilter],
  //     queryFn: async () => {
  //       let params = new URLSearchParams();

  //       if (categoryFilter) params.append("category", categoryFilter);
  //       if (priceFilter && priceFilter[0] > 0)
  //         params.append("minPrice", priceFilter[0]);
  //       if (priceFilter && priceFilter[1] > 0)
  //         params.append("maxPrice", priceFilter[1]);
  //       if (ratingFilter > 0) params.append("rating", ratingFilter);

  //       let url = `https://stylique-backend.vercel.app/products?${params.toString()}`;
  //       console.log("Fetching from ", url);
  //       let result = await axios.get(url);

  //       return result.data;
  //     },
  //   });

  const {
    isLoading,
    error,
    isRefetching,
    data: products = [],
  } = useQuery({
    queryKey: ["products", categoryFilter, priceFilter, ratingFilter],
    queryFn: async () => {
      let result = await axios.get(
        `https://stylique-backend.vercel.app/products?category=${categoryFilter}&minPrice=&maxPrice=&rating=`
      );
      console.log(
        `https://stylique-backend.vercel.app/products?category=${categoryFilter}&minPrice=&maxPrice=&rating=`
      );
      return result.data;
    },
  });

  console.log(products);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      let result = await axios.get(
        `https://stylique-backend.vercel.app/categories`
      );

      return result.data;
    },
  });

  //   const {
  //     data: filterstats = {
  //       price: { min: 0, max: 1000 },
  //       rating: { min: 0, max: 5 },
  //     },
  //   } = useQuery({
  //     queryKey: ["filterstats"],
  //     queryFn: async () => {
  //       let result = await axios.get(
  //         `https://stylique-backend.vercel.app/products/filter-stats`
  //       );

  //       return result.data;
  //     },
  //   });

  //   console.log("filter stats ", priceFilter);

  function handleCategoryFilter(e) {
    setCategoryFilter(e.target.value);
  }
  return (
    <div className="max-w-full px-5 lg:max-w-[1140px] lg:mx-auto py-10 lg:py-20">
      <p className="mb-5">Home {">"} All Products</p>
      <h2 className="font-bold text-3xl lg:text-4xl mb-10">All Produts</h2>

      {(isLoading || isRefetching) && <Spinner />}
      {error && (
        <p className="text-red-600 text-center">
          `There's been an error loading products. ${error.message}`
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
        {/* <div className="w-full">
          <RangeSlider
            min={filterstats?.price?.min}
            max={filterstats?.price?.max}
            // defaultValue={[0, 5]}
            onInput={setPriceFilter}
          />
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
        </div> */}
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
