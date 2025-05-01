"use client";

import React from "react";
import ImageRow from "./ImageRow";
import ServiceCard from "./ServiceCard";

const ServicesSection = () => {
  const imageUrls = ["https://cdn.builder.io/api/v1/image/assets/TEMP/98b65b6ae57370b00f31e065bbe75e94ffe2a674?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce", "https://cdn.builder.io/api/v1/image/assets/TEMP/1c1761bdeb3eadb6b1fca7148210d5a756a764a9?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce", "https://cdn.builder.io/api/v1/image/assets/TEMP/915c7c6b49db4fff25f5ef43179de642838781b8?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce"];

  const serviceCards = [
    {
      title: "Loren Ipsum",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/542067a6be7cc09f116cca942c276d8c95d38461?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce",
      description:
        "Lorem ipsum is simply free available.\nAenean leo quam. Pellentesque\nsemornare vestibulum.",
    },
    {
      title: "Lorem Ipsum",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a89e6ce6a9e9203d54c33a7fe332c592ff3d96cd?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce",
      description:
        "Lorem ipsum is simply free available.\nAenean leo quam. Pellentesque\nsemornare vestibulum.",
    },
    {
      title: "Loren Ipsum",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/46edc053c8e9bdeff6d961445c1037f5c6f8dd54?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce",
      description:
        "Lorem ipsum is simply free available.\nAenean leo quam. Pellentesque\nsemornare vestibulum.",
    },
  ];

  return (
    <section className="flex overflow-hidden flex-col items-center pt-20 bg-teal-900">
      <header>
        <h2 className="text-2xl text-center text-amber-300">Our Services</h2>
        <h1 className="mt-5 text-5xl font-extrabold leading-tight text-center text-white max-md:text-4xl">
          What We Offer
        </h1>
      </header>

      <ImageRow imageSources={imageUrls} />

      <div className="flex overflow-hidden relative flex-col items-center self-stretch px-16 pt-px pb-36 w-full min-h-[346px] max-md:px-5 max-md:pb-24 max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/60597e5fe2a4fed2e91b375f1573de54bfe89a29?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce"
          className="object-cover absolute inset-0 size-full"
          alt="Background"
        />
        <div className="relative mb-0 max-w-full w-[1169px] max-md:mb-2.5">
          <div className="flex gap-5 max-md:flex-col">
            {serviceCards.map((card, index) => (
              <div
                key={index}
                className={`${index > 0 ? "ml-5" : ""} w-[33%] max-md:ml-0 max-md:w-full`}
              >
                <ServiceCard
                  title={card.title}
                  iconSrc={card.iconSrc}
                  description={card.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
