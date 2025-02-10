import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import { FaShoppingCart } from "react-icons/fa";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";
import SummaryApi from "../common";

const HorizontalCardProduct = ({ category, heading1,heading2 }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const context = useContext(Context);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const { fetchUserAddToCart ,fetchCartData,fetchWishListData} = useContext(Context);

const addToWishlist = async(e,id) =>{
  e?.stopPropagation()
  e?.preventDefault()

  const response = await fetch(SummaryApi.addToWishlist.url,{
      method : SummaryApi.addToWishlist.method,
      credentials : 'include',
      headers : {
          "content-type" : 'application/json'
      },
      body : JSON.stringify(
          { productId : id }
      )
  })

  const responseData = await response.json()

  if(responseData.success){
      toast.success(responseData.message)
      
  }

  if(responseData.error){
      toast.error(responseData.message)
  }


  return responseData

}

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    fetchCartData()

  };

  const wishlistHandler = async(e,id) => {
   await addToWishlist(e,id);
   fetchWishListData()

  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  

  return (
    <div className="w-[100%] mx-auto px-4 my-6 relative">
      <div className="flex justify-between  items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-normal">
          <span className="text-black">{heading1}</span> {/* Red heading */}
          <span className="text-[#AA0000]">{heading2}</span>{" "}
          {/* Black heading */}
        </h2>
        <h2 className=" font-semibold py-4">
          <Link
            to={"/product-category?category=" + category}
            className="cursor-pointer"
            key={category}
          >
            <p className="text-center text-sm md:text-base capitalize">
              View All Cards
            </p>
          </Link>
        </h2>
      </div>

      <div>
        <hr />
      </div>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all pt-4 md:p-4"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList?.map((product, index) => {
              return (
                <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                    <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                    <div className="flex gap-3 w-full">
                      <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    </div>
                    <button className="text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data?.map((product, index) => (
              <ProductCard
                key={product?._id}
                product={product}
                handleAddToCart={handleAddToCart}
                wishlistHandler={wishlistHandler}
              />
            ))}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
