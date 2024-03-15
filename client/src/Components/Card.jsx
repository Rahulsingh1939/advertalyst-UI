import React from "react";

const Card = () => {
  return (
    <>
      <a
        href="https://www.kindacode.com"
        className="flex flex-col bg-white drop-shadow hover:drop-shadow-lg hover:opacity-70 rounded-md"
      >
        <img
          src=" https://www.kindacode.com/wp-content/uploads/2022/07/kindacode-example.png"
          alt="Fiction Product"
          className="h-40 object-cover rounded-tl-md rounded-tr-md"
        />
        <div className="px-3 py-2">
          <h1 className="font-semibold">Product One</h1>
          <p className="text-sm">$69.69</p>
        </div>
      </a>
    </>
  );
};

export default Card;
