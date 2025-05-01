

import React from "react";



const ServiceCard = ({
  title,
  iconSrc,
  description,
}) => {
  return (
    <article className="flex relative flex-col pr-5 pb-10 pl-10 mx-auto w-full bg-white rounded-none shadow-[0px_0px_60px_rgba(0,0,0,0.1)] max-md:pl-5 max-md:mt-8">
      <header className="flex gap-5 justify-between items-start text-2xl font-extrabold leading-snug text-stone-900">
        <h3 className="self-end mt-10">{title}</h3>
        <img
          src={iconSrc}
          className="object-contain shrink-0 self-start w-20 rounded-lg aspect-[2]"
          alt={`${title} icon`}
        />
      </header>
      <p className="self-start mt-6 text-base font-medium leading-8 text-neutral-500">
        {description}
      </p>
    </article>
  );
};

export default ServiceCard;
