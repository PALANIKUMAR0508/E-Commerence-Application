import { Star } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ products }) => {
  //products can be export as Home.jsx
  const [rating, setRating] = useState(products?.ratings || 0);
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-slate-100">
      <Link to={`/product/${products?._id}`} className="">
        <div className="h-56 overflow-hidden">
          <img
            src={products?.image[0]?.url || "/placeholder.png"}
            alt={products?.name}
            className="h-full w-full object-cover hover:scale-105 transition duration-700 "
            loading="lazy"
          />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {products?.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {products?.description}
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4 space-y-2">
        <div className="flex items-center gap-2">
          <Rating value={rating} onRatingChange={(r) => setRating(r)} />
          <span className="text-xs text-gray-500 font-semibold">
            ({products?.num0fReviews} Reviews)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-bold text-lg">
            ₹{products?.price}
          </span>
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition">
            Add To Cart{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
