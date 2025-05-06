"use client";
import * as React from "react";
import CallToAction from "./CallToAction";
import StatCard from "./StatCard";

const StatisticsSection = () => {
  return (
    <section className="flex overflow-hidden relative flex-col pt-32 min-h-[613px] max-md:pt-24">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6483767c962be587986de0079657cac41e3dd4e?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce"
        alt="Background image"
        className="object-cover absolute inset-0 size-full"
      />
      <div className="relative z-10 self-center max-w-full w-[1160px]">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[53%] max-md:ml-0 max-md:w-full">
            <CallToAction
              title="Numbers speak for themselves"
              description="Key statistics that our users have felt over the period of usage"
              linkText="Discover More"
            />
          </div>
          <div className="ml-5 w-[26%] max-md:ml-0 max-md:w-full">
            <div className="relative mt-6 w-full max-md:mt-10">
              <StatCard
                iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/26291d47667982c9637da0b208c893f42872d55d?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce"
                percentage="87%"
                description="Productivity Increase"
              />
              <div className="mt-20 max-md:mt-10">
                <StatCard
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/026ec6e58b2b4db9cccd41e46f083450ab013850?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce"
                  percentage="78%"
                  description="Physical Health Boost"
                />
              </div>
            </div>
          </div>
          <div className="ml-5 w-[21%] max-md:ml-0 max-md:w-full">
            <div className="flex relative items-start self-stretch my-auto max-md:mt-10">
              <StatCard
                iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c1a3fdb02c868b8892826411f81ad1284fac98bc?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce"
                percentage="92%"
                description="Mental Wellness"
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="flex relative w-full bg-white min-h-[200px] max-md:max-w-full" />
    </section>
  );
};

export default StatisticsSection;
