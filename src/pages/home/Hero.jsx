import React from "react";
import heroBgMobile from "/images/hero-bg-mobile.jpg";

const Hero = () => {
  return (
    <section className="w-full md:h-dvh bg-[#F2F0F1] md:lg:bg-[url('/images/bg-image.jpg')] bg-no-repeat bg-center  bg-cover flex flex-col items-center justify-center">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left py-12 md:py-24">
            <h2 className="font-extrabold text-4xl md:text-6xl text-black mb-6">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h2>
            <p className="text-base text-black text-opacity-60 mb-8">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <button
              type="button"
              aria-label="Shop Now"
              className="bg-black text-white font-manrope text-base py-4 px-[54px] rounded-[62px] hover:opacity-90 transition-opacity w-full lg:w-fit"
            >
              Shop Now
            </button>
            <div className="mt-12 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-12">
              <div>
                <p className="font-bold text-4xl text-black">200+</p>
                <p className="font-manrope text-sm text-black text-opacity-60">
                  International Brands
                </p>
              </div>
              <div>
                <p className="font-manrope font-bold text-4xl text-black">
                  2,000+
                </p>
                <p className="font-manrope text-sm text-black text-opacity-60">
                  High-Quality Products
                </p>
              </div>
              <div>
                <p className="font-manrope font-bold text-4xl text-black">
                  30,000+
                </p>
                <p className="font-manrope text-sm text-black text-opacity-60">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Background Image for mobile - shown only on mobile, full width */}
      <div className="md:hidden w-full mt-8">
        <img
          src={heroBgMobile}
          alt="Fashion models showcasing clothing styles"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
