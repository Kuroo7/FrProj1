import React from "react";
import FooterDivider from "./FooterDivider";



const FooterColumn= ({ title, children }) => {
  return (
    <div className="flex flex-col items-start text-base leading-loose">
      <h3 className="text-xl font-bold leading-relaxed text-white">{title}</h3>
      <FooterDivider />
      {children}
    </div>
  );
};

export default FooterColumn;
