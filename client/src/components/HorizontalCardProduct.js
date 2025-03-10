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

const HorizontalCardProduct = ({ category, heading1, heading2, fromDetail }) => {
  const { fetchUserAddToCart, fetchCartData, fetchWishListData, cartProductCount } = useContext(Context);
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
  }, [category,cartProductCount]);

  return (
    <div className="w-full mx-auto px-4 mt-6 relative">
      <div className="flex justify-between items-center">
        <h3 className="text-xl sm:text-2xl md:text-[22px] font-normal">
          <span className="text-black">{heading1} </span>
        </h3>
        <h2 className="font-semibold py-4">
          <Link to={`/product-category?category=${category}`} className="cursor-pointer capitalize">
            View All Cards
          </Link>
        </h2>
      </div>

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
          1280: { slidesPerView: 4, spaceBetween: 10 },
          1400: { slidesPerView: 5, spaceBetween: 10 },

        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        // className="my-4 lg:justify-center  "
        className={`my-4 lg:justify-center `}
      >
        {data.length && data.map((product) => (
              <SwiperSlide key={product?._id} className={`!flex justify-center ${fromDetail ? "ml-[1px]" : ""}`}>
                <div className="mx-auto ">
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
