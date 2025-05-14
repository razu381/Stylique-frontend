import React from "react";
import Hero from "./Hero";
import Brands from "./Brands";
import ProductGrid from "../../shared components/ProductGrid";
import Category from "./Category";

function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <div className="max-w-full px-5 lg:max-w-[1140px] lg:mx-auto">
        <ProductGrid title={"Popular Products"} category={"popular"} />
        <ProductGrid title={"For Men"} category={"men"} />
        <ProductGrid title={"For Women"} category={"women"} />
        <Category />
      </div>
    </>
  );
}

export default Home;
