"use client";
import React from "react";

const HeroSection = () => {
  return (
    <section className="flex overflow-hidden relative flex-col items-start py-48 pl-4 w-full min-h-[810px] max-md:py-24 max-md:max-w-full">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f09e18aa6d2ef3f972e7afdbedf93e3dd99cb91e?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce"
        alt="Background image showing gut health concept"
        className="object-cover absolute inset-0 size-full"
      />
      <header className="relative text-base font-semibold leading-loose text-white uppercase">
        say yes to better health
      </header>
      <div className="flex relative flex-wrap gap-5 justify-between self-stretch mt-7 max-md:max-w-full">
        <div className="max-md:max-w-full">
          <h1 className="text-9xl text-white leading-[110px] max-md:max-w-full max-md:text-4xl max-md:leading-10">
            Better Gut
            <br />
            <span style={{ color: "rgba(238,192,68,1)" }}>Better Work</span>
          </h1>
          <p className="mt-8 text-xl font-extrabold leading-8 text-white max-md:mr-2.5 max-md:max-w-full">
            Your wellness starts within. Discover how gut health can transform
            your energy, mood, and daily performance.
          </p>
        </div>
        <div className="self-end mt-24 max-md:mt-10">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f320b3127a7086e9eb0143b689d1d7d5db065cee?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce"
            alt="Gut health product"
            className="object-contain aspect-[1.23] rounded-[33px] w-[81px]"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ea6e02b870cd6ba677fd45dbb70d0c317766fc3?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce"
            alt="Gut health product"
            className="object-contain mt-2.5 aspect-[1.23] rounded-[33px] w-[81px]"
          />
        </div>
      </div>
      <div className="flex relative flex-wrap gap-5 justify-between mt-11 mb-0 max-w-full text-xl font-extrabold leading-loose text-white w-[565px] max-md:mt-10 max-md:mb-2.5">
        <button className="overflow-hidden gap-2.5 self-stretch px-5 py-3.5 bg-green-500 rounded-xl max-md:px-5">
          Redeem Voucher
        </button>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f819406f98b92e82a318e389980190adb4a7f0e?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce"
          alt="Partner logo"
          className="object-contain shrink-0 self-start max-w-full aspect-[2.17] w-[115px]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
