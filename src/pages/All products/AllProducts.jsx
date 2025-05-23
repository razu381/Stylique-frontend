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
  let [ratingFilter, setRatingFilter] = useState(0);
  let [priceFilter, setPriceFilter] = useState([0, 1000]);
  let [searchFilter, setSearchFilter] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 0,
    },
  });

  let rating = watch("rating");
  console.log(rating);

  useEffect(() => {
    setRatingFilter(rating);
  }, [rating]);

  function onSubmit(data) {
    console.log("RATING ", data);
  }

  const {
    isLoading,
    error,
    isRefetching,
    data: products = [],
  } = useQuery({
    queryKey: [
      "products",
      categoryFilter,
      priceFilter,
      ratingFilter,
      searchFilter,
    ],
    queryFn: async () => {
      let result = await axios.get(
        `https://stylique-backend.vercel.app/products?category=${categoryFilter}&minPrice=${priceFilter[0]}&maxPrice=${priceFilter[1]}&rating=${ratingFilter}&search=${searchFilter}`
      );
      console.log(
        `https://stylique-backend.vercel.app/products?category=${categoryFilter}&minPrice=${priceFilter[0]}&maxPrice=${priceFilter[1]}&rating=${ratingFilter}`
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

  const { data: filterstats = {} } = useQuery({
    queryKey: ["filterstats"],
    queryFn: async () => {
      let result = await axios.get(
        `https://stylique-backend.vercel.app/products/filter-stats`
      );
      console.log("Price result ", [
        result.data?.price?.min,
        result.data?.price?.max,
      ]);
      setPriceFilter([result.data?.price?.min, result.data?.price?.max]);
      return result.data;
    },
  });

  function handleCategoryFilter(e) {
    setCategoryFilter(e.target.value);
  }
  function handleSearch(e) {
    let keyword = e.target.value;
    console.log(keyword);
    if (keyword.length >= 3) {
      console.log(keyword);
      setSearchFilter(keyword);
    }
  }

  return (
    <div className="max-w-full px-5 lg:max-w-[1140px] lg:mx-auto py-10 lg:py-20">
      <p className="mb-5">Home {">"} All Products</p>
      <h2 className="font-bold text-3xl lg:text-4xl mb-10">All Produts</h2>

      <div className="pb-5 flex justify-between items-center gap-5">
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
        <div className="w-full -mt-5">
          <p className="text-center font-bold pb-1">
            ${priceFilter[0]} - ${priceFilter[1]}
          </p>
          <RangeSlider
            min={filterstats.min}
            max={filterstats.max}
            defaultValue={[priceFilter[0], priceFilter[1]]}
            onInput={setPriceFilter}
          />
        </div>
        <div className="w-full -mt-2 flex flex-col justify-center items-center">
          <form className="space-y-4 max-w-[250px]">
            <div className="">
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
        <div className="w-full">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search here... min 3 character"
            className="input"
          />
        </div>
      </div>
      {(isLoading || isRefetching) && <Spinner />}

      {error && (
        <p className="text-red-600 text-center">
          `There's been an error loading products.{error.message}`
        </p>
      )}
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
