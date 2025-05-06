import React from "react";



const FooterNewsItem = ({
  title,
  date,
  className = "",
}) => {
  return (
    <article className={className}>
      <h3 className="max-md:mr-1.5 font-bold text-white">
        {title.split(" ").length > 3 ? (
          <>
            {title.split(" ").slice(0, 3).join(" ")}
            <br />
            {title.split(" ").slice(3).join(" ")}
          </>
        ) : (
          title
        )}
      </h3>
      <time className="self-start mt-4 text-base leading-loose text-amber-300">
        {date}
      </time>
    </article>
  );
};

export default FooterNewsItem;
