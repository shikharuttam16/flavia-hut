import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaHeart, FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategroyWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import { IoMdHeartEmpty } from "react-icons/io";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    productName: "",
    availability: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const {
    fetchUserAddToCart,
    fetchCartData,
    wishlist,
    fetchWishListData,
  
  } = useContext(Context);
  const deleteWishlistProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteWishlist.url, {
      method: SummaryApi.deleteWishlist.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchWishListData();
    }
  };
  const toggleWishlist = (e) => {
    e.stopPropagation(); // Prevent triggering the link's onClick
  };
  const addToWishlist = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    const response = await fetch(SummaryApi.addToWishlist.url, {
      method: SummaryApi.addToWishlist.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      fetchWishListData()
    }

    if (responseData.error) {
      toast.error(responseData.message);
    }

    return responseData;
  };

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataReponse = await response.json();

    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage[0]);
  };


  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
   
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    fetchCartData();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    fetchCartData();
    navigate("/cart");
  };
  const wishlistItem = wishlist?.find(
    (item) => item.productId?._id === data?._id
  );

  return (
    <div className="w-[90%] mx-auto p-4 flex flex-col gap-4">
      <div className="p-4"></div>

      <div className="min-h-[200px] flex flex-col lg:flex-row gap-6 ">
        {/***product Image */}
        <div className=" flex flex-col lg:flex-row-reverse gap-4 ">
          <div className="md:h-[400px] md:w-[450px] relative object-contain ">
            <img
              src={activeImage}
              className="h-full w-full object-contain"
              loading="lazy"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading?.map((el, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={"loadingImage" + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded border border-[#AA0000]"
                      key={imgURL}
                    >
                      <img
                        src={imgURL}
                        loading="lazy"
                        className="w-full h-full object-fill  cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                        onClick={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/***product details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full"></p>

            <div className="text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full"></div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full">
              <p className="text-red-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
              <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
            </div>

            <div className="w-full">
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full"></p>
              <p className=" bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1  ">
            <div className="flex  gap-3  items-center ">
              <h2 className="text-2xl lg:text-4xl text-[#AA0000] font-medium ">
                {data?.productName}
              </h2>

              <span
                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium h-6 ring-1 ring-inset ${
                  data?.availability === "In Stock"
                    ? "bg-green-50 text-green-700 ring-green-600/20"
                    : "bg-red-50 text-red-700 ring-red-600/20"
                }`}
                style={{ whiteSpace: "nowrap" }}
              >
                {data?.availability}
              </span>
              <div
                className=" rounded-full bg-white p-1 cursor-pointer border border-[#BEBEBE]"
                onClick={toggleWishlist}
              >
                {wishlistItem ? (
                  <FaHeart
                    style={{ color: "red" }}
                    onClick={() => deleteWishlistProduct(wishlistItem?._id)}
                  /> // Filled heart icon
                ) : (
                  <IoMdHeartEmpty
                    style={{ color: "gray" }}
                    onClick={(e) => addToWishlist(e, data?._id)}
                  /> // Empty heart icon
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-1xl lg:text-1xl font-medium my-1 mt-2">
              <p className="text-[#B3B3B3] line-through">
                {displayINRCurrency(data.price)}
              </p>
              <p className="text-[#2C742F]">
                {displayINRCurrency(data.sellingPrice)}
              </p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button
                className=" rounded-full px-3 py-2 min-w-[140px] font-medium text-white bg-[#AA0000] hover:text-white hover:bg-[#AA0000]"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-6">
        <p className="text-[#AA0000] text-lg font-bold my-1">Description</p>
        <div>
          <hr />
        </div>
        <p className=" text-md  my-1">{data?.description}</p>
      </div>

      {data.category && (
        <div>
          <HorizontalCardProduct
            category={data?.category}
            heading1={"Recommended"}
            heading2={"Product"}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
