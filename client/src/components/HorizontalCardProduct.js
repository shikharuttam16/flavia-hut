import React, { useContext, useEffect, useState, useRef } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import addToCartLocally from "../helpers/addToCartLocally";
import Context from "../context";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const HorizontalCardProduct = ({ category, heading1, heading2 }) => {
  const { fetchUserAddToCart, fetchCartData, fetchWishListData } = useContext(Context);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localItems, setLocalItems] = useState([]);
  const { cartProduct } = useContext(Context);
  const { getCartItemCountLocal } = useContext(Context);  
  const user = useSelector((state) => state.user)
  
  // Create unique refs for navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
    if(user.user == null){
      console.log("Add to cart ID : ",id);
      const added =  await addToCartLocally(e, id);
      return added
    }else{ 
      const result =  await addToCart(e, id);
      await fetchUserAddToCart();
      await fetchCartData();
      return result
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data || []);
    let cartItems = JSON.parse(localStorage.getItem("cart"))
    setLocalItems(cartItems)
  };

  useEffect(() => {
    fetchData();
  }, [category]);

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

      {/* Navigation buttons with unique refs */}
      <div className="flex space-x-3 w-36">
        <button ref={prevRef} className="absolute top-1/2 -translate-y-1/2 left-0 p-3 bg-[#424750] text-[#FFFFFF] shadow-md rounded-full">
          <FiChevronLeft className="text-white" />
        </button>
        <button ref={nextRef} className="absolute top-1/2 -translate-y-1/2 right-0 p-3 bg-[#424750] text-[#FFFFFF] shadow-md rounded-full">
          <FiChevronRight className="text-white" />
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 5, spaceBetween: 20 },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="my-4 lg:justify-center"
      >
        {loading
          ? new Array(5).fill(null).map((_, index) => (
              <SwiperSlide key={index} className="!flex justify-center">
                <div className="w-64 h-40 bg-white rounded-md shadow-md flex animate-pulse mx-auto">
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
              </SwiperSlide>
            ))
          : data.map((product) => (
              <SwiperSlide key={product?._id} className="!flex justify-center">
                <div className="mx-auto my-5">
                  <ProductCard
                    product={product}
                    handleAddToCart={handleAddToCart}
                    wishlistHandler={addToWishlist}
                    localItems={localItems}
                    getCartItemCountLocal = {getCartItemCountLocal}
                    cartProduct = {cartProduct}
                  />
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default HorizontalCardProduct;
