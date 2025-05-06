import React from "react";
import FeatureCard from "./FeatureCard";

const FeatureSection = () => {
  const features = [
    {
      featureNumber: "Feature 01",
      title: "Corporate Vouchers",
      backgroundImageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/ba300646a24cfac0f56ed0bb4db4290b308b2835?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce",
      iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/e142760c4c9773ebc9817141a9c2c3bc4dd91311?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce",
      className: "",
    },
    {
      featureNumber: "Feature 02",
      title: "Doctor\nReferrals",
      backgroundImageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a73c8eacd219650ed044ac07d15c5cbb2da1b94?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce",
      iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/fa15263fba2b0aa6fb35eafc42fd399b39ea851b?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce",
      className: "ml-5",
    },
    {
      featureNumber: "Feature 03",
      title: "Explore\nSova Tests",
      backgroundImageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/8912dc9a45c78844f83eefb0c55d3a0cfe2c0eb5?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce",
      iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/60992dccdbb71fee1b388a3c0e3b1849b196232f?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce",
      className: "ml-5",
    },
  ];

  return (
    <section className="z-10 self-center mt-0 w-full max-w-[1170px] max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            featureNumber={feature.featureNumber}
            title={feature.title}
            backgroundImageUrl={feature.backgroundImageUrl}
            iconUrl={feature.iconUrl}
            className={feature.className}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
