import React from "react";



const FooterLink = ({ iconSrc, text }) => {
  const isLongText = text.length > 10;

  return (
    <a
      href="#"
      className={`flex gap-3.5 ${isLongText ? "self-stretch" : ""} mt-6 first:mt-0`}
    >
      <img
        src={iconSrc}
        alt=""
        className="object-contain shrink-0 self-start aspect-[1.1] w-[11px]"
      />
      <span className={isLongText ? "grow shrink w-[119px]" : ""}>{text}</span>
    </a>
  );
};

export default FooterLink;
