import React from "react";



const FooterDivider = ({ width = "55px" }) => {
  return (
    <div
      className="flex shrink-0 mt-4 h-1 rounded-sm border-t-4 border-green-500"
      style={{ width }}
    />
  );
};

export default FooterDivider;
