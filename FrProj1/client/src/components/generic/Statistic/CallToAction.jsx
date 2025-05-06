import React from "react";


const CallToAction = ({
  title,
  description,
  linkText,
}) => {
  return (
    <section className="flex relative flex-col grow items-start px-20 py-16 w-full text-base font-semibold text-white bg-green-500 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <h2 className="self-stretch text-5xl leading-[60px] max-md:text-4xl max-md:leading-[53px]">
        {title}
      </h2>
      <p className="mt-7 font-medium leading-7 w-[241px]">{description}</p>
      <a
        href="#"
        className="py-2 mt-40 leading-relaxed uppercase border-b-2 border-white max-md:mt-10"
      >
        {linkText}
      </a>
    </section>
  );
};

export default CallToAction;
