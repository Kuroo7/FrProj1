import React from "react";


const StatCard = ({
  iconSrc,
  percentage,
  description,
}) => {
  return (
    <article className="flex gap-3.5">
      <img
        src={iconSrc}
        alt={`${description} icon`}
        className="object-contain shrink-0 self-start mt-2 w-16 aspect-square"
      />
      <div className="flex flex-col">
        <h3 className="self-start text-5xl font-bold leading-none text-emerald-900 max-md:text-4xl">
          {percentage}
        </h3>
        <p className="mt-3.5 text-base font-medium leading-loose text-black">
          {description}
        </p>
      </div>
    </article>
  );
};

export default StatCard;
