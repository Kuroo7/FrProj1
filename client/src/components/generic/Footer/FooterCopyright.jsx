import React from "react";

const FooterCopyright = () => {
  return (
    <section className="flex flex-col justify-center items-center px-16 py-7 w-full font-semibold bg-stone-900 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between items-start max-w-full w-[1170px]">
        <div className="flex gap-1">
          <p className="grow text-sm leading-loose">
            © All Copyright 2024 by{" "}
          </p>
          <a href="#" className="text-base leading-loose basis-auto">
            shawonetc Themes
          </a>
        </div>
        <nav className="flex gap-3.5 text-sm leading-none text-right">
          <a href="#" className="grow my-auto">
            Terms of Use
          </a>
          <a href="#" className="px-5 py-px border-l border-stone-400">
            Privacy Policy
          </a>
        </nav>
      </div>
    </section>
  );
};

export default FooterCopyright;
