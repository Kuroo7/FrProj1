import React from "react";
import FooterColumn from "./FooterColumn";
import FooterLink from "./FooterLink";
import FooterNewsItem from "./FooterNewsItem";
import FooterEmailSubscribe from "./FooterEmailSubscribe";

const FooterMain = () => {
  return (
    <section className="flex overflow-hidden flex-col justify-center items-center px-16 py-32 w-full font-medium bg-stone-800 max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div className="flex gap-5 justify-between mb-0 max-w-full w-[1169px] max-md:mb-2.5 max-md:flex-wrap">
        {/* Company Info Column */}
        <div className="my-auto text-base leading-8">
          <p className="max-md:mr-0.5">
            There are many variations of passages
            <br />
            of lorem ipsum available, but the
            <br />
            majority suffered.
          </p>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/272b76ef8ee7bf633c545cebb1d5602431788a49?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce"
            alt="Company Logo"
            className="object-contain mt-7 aspect-[6.76] w-[270px]"
          />
        </div>

        {/* Explore Column */}
        <FooterColumn title="Explore">
          <nav className="flex flex-col mt-7">
            <FooterLink iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/80500c133d0ba8cb5ae15c7ab65e71c03cec2529?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce" text="About" />
            <FooterLink iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/ee9ff68130deed40a81cfe1124b6bc1c141d5d0e?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce" text="Services" />
            <FooterLink iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/7e8e0d632919cab95c8b23b06b117d992adb1cbd?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce" text="Our Projects" />
            <FooterLink iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/fd8a5a81c75a481113d8bfc712ffae761d4484cd?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce" text="Meet the Farmers" />
            <FooterLink iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/debf5e462b3d750d766d8cf2e5223d1b3a181fe8?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce" text="Latest News" />
            <FooterLink iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e18e308f8b906853ec6297702531d410aba72bfe?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce" text="Contact" />
          </nav>
        </FooterColumn>

        {/* News Column */}
        <div className="flex flex-col items-start self-start font-bold text-white">
          <h3 className="text-xl">News</h3>
          <div className="flex shrink-0 mt-5 h-1 bg-green-500 rounded-sm w-[45px]" />
          <div className="flex flex-col self-end mt-7 max-w-full text-base leading-7 w-[200px]">
            <FooterNewsItem
              title="Bringing Food Production Back To Cities"
              date="July 5, 2022"
            />
            <FooterNewsItem
              title="The Future of Farming, Smart Irrigation Solutions"
              date="July 5, 2022"
              className="mt-10"
            />
          </div>
        </div>

        {/* Contact Column */}
        <FooterColumn title="Contact">
          <div className="mt-6">
            <div className="flex gap-2 leading-loose">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/23e134f033e07a2059cc2dc36d3e6629250b5e02?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce"
                alt="Phone"
                className="object-contain shrink-0 aspect-[0.83] w-[15px]"
              />
              <p>666 888 0000</p>
            </div>
            <div className="flex gap-2.5 mt-6 leading-loose whitespace-nowrap">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f71bd25218f5b982ae700bac4fcf879c43e528b7?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce"
                alt="Email"
                className="object-contain shrink-0 self-start w-3.5 aspect-square"
              />
              <p className="basis-auto">needhelp@company.com</p>
            </div>
            <div className="flex gap-2.5 mt-5 leading-7">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d61786da0cbc7172ed9d93bc79cf28e0f8976364?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce"
                alt="Location"
                className="object-contain shrink-0 self-start w-4 aspect-square"
              />
              <address className="not-italic">
                80 broklyn golden street line
                <br />
                New York, USA
              </address>
            </div>
            <FooterEmailSubscribe />
          </div>
        </FooterColumn>
      </div>
    </section>
  );
};

export default FooterMain;
