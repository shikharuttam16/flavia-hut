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

  const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
      setQuantity(quantity + 1);
    };
    const decreaseQuantity = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
  return (
    <div className="w-[90%] mx-auto p-4 flex flex-col gap-4">
      <div className="p-4"></div>

      <div className="min-h-[200px] flex flex-col lg:flex-row gap-6">
        {/***product Image */}
        <div className="flex flex-col lg:flex-row-reverse gap-4 mt-6 border border-[#E1E3E4] rounded-[6px] p-6">
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
                      className="w-[72px] h-[72px] top-[8px] left-[4px] rounded-[3px] border-[2px] border-[#424750]"
                      key={imgURL}
                    >
                      <img
                        src={imgURL}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
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
          <div>
            <div className="mt-6 border border-[#E1E3E4] rounded-[6px] p-6">
              <h2 className="font-barlow font-bold text-[24px] leading-[32px] tracking-[0%] text-[#424750] mb-3">
                {data?.productName}
              </h2>
              <hr className="mb-3"></hr>
            <div className="flex flex-col items-start gap-2 text-1xl lg:text-1xl font-medium my-1 mt-2">
              <p className="font-titillium font-semibold text-[14px] leading-[26.18px] tracking-[0%] text-[#424750] mb-3">
                M.R.P: <span className="font-['Titillium_Web'] font-normal text-[15px] leading-[28.05px] text-[#424750] line-through">{displayINRCurrency(data.price)}</span>
              </p>
              <p className="font-titillium font-semibold text-[14px] leading-[26.18px] tracking-[0%] text-[#424750] mb-3">
                Offer Price: <span className="font-barlow font-semibold text-[22px] leading-[26px] tracking-[0%] text-[#56CE00]">{displayINRCurrency(data.sellingPrice)}</span> <span className="font-titillium font-normal text-[14px] leading-[14px] tracking-[0%] text-[#424750]">(incl. of all taxes)</span>
              </p>
              <div className="flex items-center space-x-2 border border-gray-400 rounded-md p-2 w-max">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded"
                >
                  −
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded"
                >
                  +
                </button>
              </div>
              <div className="flex items-center gap-3 my-2">
                <button className="w-[292.5px] h-[48px] rounded-[4px] px-3 py-2 font-barlow font-bold text-[16px] leading-[26px] tracking-[0%] text-center text-white bg-[#FF8C00] hover:bg-[#FF8C00]" onClick={(e) => handleAddToCart(e, data?._id)}> Add To Cart </button>
                <button className="w-[292.5px] h-[48px] rounded-[4px] px-3 py-2 font-barlow font-bold text-[16px] leading-[26px] tracking-[0%] text-center text-white bg-[#56CE00] hover:bg-[#56CE00]" onClick={(e) => handleBuyProduct(e, data?._id)}> BUY IT NOW </button>
              </div>
            </div>
            </div>
            <div className="mt-6 border border-[#E1E3E4] rounded-[6px] p-6">
              <p className="font-barlow font-semibold text-[22px] leading-[26px] tracking-[0%] text-[#424750] mb-3">Description</p>
              <p className="font-barlow text-[12px] leading-[20px] tracking-[0%] text-customBlue font-normal">{data?.description}</p>
            </div>
          </div>
        )}
      </div>
      {data.category && (
        <div>
          <HorizontalCardProduct
            category={data?.category}
            heading1={"You may also like"}
            heading2={""}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
