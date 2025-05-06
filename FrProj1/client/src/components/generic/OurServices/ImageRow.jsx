import React from "react";



const ImageRow = ({ imageSources }) => {
  return (
    <section className="z-10 mt-20 max-w-full w-[1169px] max-md:mt-10">
      <div className="flex gap-5 max-md:flex-col">
        {imageSources.map((src, index) => (
          <div key={index} className="w-[33%] max-md:ml-0 max-md:w-full">
            <img
              src={src}
              className="object-contain grow w-full aspect-[1.42] max-md:mt-8"
              alt={`Service image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageRow;
