import React from "react";



const FeatureCard = ({
  featureNumber,
  title,
  backgroundImageUrl,
  iconUrl,
  className = "",
}) => {
  return (
    <article className={`w-[33%] max-md:ml-0 max-md:w-full ${className}`}>
      <div className="flex overflow-hidden flex-col grow items-center px-20 pt-8 pb-4 w-full bg-white rounded-xl shadow-2xl max-md:px-5 max-md:mt-8">
        <div className="flex flex-col max-w-full w-[120px]">
          <h3 className="self-center text-2xl leading-none text-center text-amber-300">
            {featureNumber}
          </h3>
          <h2 className="mt-6 text-2xl font-extrabold leading-8 text-center text-stone-900">
            {title}
          </h2>
          <div className="flex relative flex-col items-start px-3 pt-20 pb-4 mt-6 ml-4 w-full rounded-xl aspect-[1.111] max-md:ml-2.5">
            <img
              src={backgroundImageUrl}
              alt={`${title} background`}
              className="object-cover absolute inset-0 size-full"
            />
            <img
              src={iconUrl}
              alt={`${title} icon`}
              className="object-contain w-full aspect-[83.33]"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeatureCard;
