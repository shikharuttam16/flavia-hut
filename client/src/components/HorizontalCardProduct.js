import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import ProductCard from "./ProductCard";

const HorizontalCardProduct = ({ category, heading1, heading2 }) => {
  const { fetchUserAddToCart, fetchCartData, fetchWishListData } = useContext(Context);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollElement = useRef(null);

  const addToWishlist = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    const response = await fetch(SummaryApi.addToWishlist.url, {
      method: SummaryApi.addToWishlist.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ productId: id }),
    });

    const responseData = await response.json();

    responseData.success ? toast.success(responseData.message) : toast.error(responseData.message);
    fetchWishListData();
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    fetchCartData();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const scrollRight = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full mx-auto px-4 my-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-normal">
          <span className="text-black">{heading1}</span>
          <span className="text-[#AA0000]">{heading2}</span>
        </h2>
        <h2 className="font-semibold py-4">
          <Link to={`/product-category?category=${category}`} className="cursor-pointer capitalize">
            View All Cards
          </Link>
        </h2>
      </div>

      <hr />

      <div className="relative w-full">
        {/* Left Scroll Button */}
        <button
          className="bg-white shadow-md rounded-full p-2 absolute left-0 top-1/2 -translate-y-1/2 z-10 text-lg hidden md:flex items-center justify-center"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>

        {/* Product List with Touch & Scroll Support */}
        <div
          ref={scrollElement}
          className="flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-hide transition-all pt-4 md:p-4 scroll-smooth snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
        >
          {loading
            ? new Array(5).fill(null).map((_, index) => (
                <div
                  key={index}
                  className="w-[90%] sm:w-[80%] md:w-[300px] h-40 bg-white rounded-md shadow-md flex animate-pulse snap-start"
                >
                  <div className="bg-slate-200 h-full w-1/3 p-4"></div>
                  <div className="p-4 grid w-2/3 gap-2">
                    <div className="bg-slate-200 p-2 rounded"></div>
                    <div className="bg-slate-200 p-2 rounded"></div>
                    <div className="flex gap-3">
                      <div className="bg-slate-200 p-2 w-full rounded"></div>
                      <div className="bg-slate-200 p-2 w-full rounded"></div>
                    </div>
                    <div className="bg-slate-200 p-2 w-full rounded"></div>
                  </div>
                </div>
              ))
            : data.map((product) => (
                <ProductCard
                  key={product?._id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                  wishlistHandler={addToWishlist}
                  className="snap-start"
                />
              ))}
        </div>

        {/* Right Scroll Button */}
        <button
          className="bg-white shadow-md rounded-full p-2 absolute right-0 top-1/2 -translate-y-1/2 z-10 text-lg hidden md:flex items-center justify-center"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
