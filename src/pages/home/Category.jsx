import React from "react";

function Category() {
  return (
    <div className="bg-offwhite py-16 px-5 lg:px-16 rounded-[40px] mt-20">
      <h2 className="font-bold text-3xl md:text-5xl text-center mb-10 uppercase">
        Browse by category
      </h2>

      <div className="grid grid-cols-10 bg-offwhite gap-5">
        <div className="col-span-10 md:col-span-3 bg-[url('/images/category-men.png')] bg-center bg-cover bg-no-repeat min-h-72 rounded-[20px]">
          <p className="font-bold text-4xl p-5">Popular</p>
        </div>
        <div className="col-span-10 md:col-span-7 bg-[url('/images/category-popular.png')] bg-center bg-cover bg-no-repeat min-h-72 rounded-[20px]">
          <p className="font-bold text-4xl p-5">Men</p>
        </div>
        <div className="col-span-10 md:col-span-7 bg-[url('/images/category-women.png')] bg-center bg-cover bg-no-repeat min-h-72 rounded-[20px]">
          <p className="font-bold text-4xl p-5">Women</p>
        </div>
        <div className="col-span-10 md:col-span-3 bg-[url('/images/category-gym.png')] bg-center bg-cover bg-no-repeat min-h-72 rounded-[20px]">
          <p className="font-bold text-4xl p-5"> Gym</p>
        </div>
      </div>
    </div>
  );
}

export default Category;
