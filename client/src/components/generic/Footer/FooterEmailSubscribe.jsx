"use client";
import React, { useState } from "react";

const FooterEmailSubscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Email submitted:", email);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="flex gap-5 justify-between self-stretch pl-5 text-xs font-semibold bg-white rounded-xl border border-solid border-stone-100 text-neutral-500 max-md:pl-5">
        <input
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="my-auto bg-transparent outline-none w-full py-4"
          required
        />
        <button type="submit" aria-label="Subscribe">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6bedb8517f7dc3cc1284e9390bab01ad23c366e7?placeholderIfAbsent=true&apiKey=6c46017098c442d08aa99715ddf945ce"
            alt="Submit"
            className="object-contain shrink-0 rounded-none aspect-square w-[50px]"
          />
        </button>
      </div>
    </form>
  );
};

export default FooterEmailSubscribe;
