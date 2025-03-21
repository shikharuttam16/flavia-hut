import React, { useCallback, useContext, useEffect, useState,useRef  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import addToCartLocally from "../helpers/addToCartLocally";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [zoomStyle, setZoomStyle] = useState({});
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
  const [addedToCart, setAddedToCart] = useState(false);
  const [localItems, setLocalItems] = useState([]);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [clickedImage, setClickedImage] = useState(null);
  const { getCartItemCountLocal, cartProductCount, cartProduct } = useContext(Context);  
  const user = useSelector((state) => state.user)
  const imageRef = useRef(null);
  
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
    setClickedImage(dataReponse?.data?.productImage[0])
    let cartItems = JSON.parse(localStorage.getItem("cart"))
    setLocalItems(cartItems)
  };

  useEffect(() => {
    fetchProductDetails();

  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = (e) => {
    if (!imageRef.current || !activeImage) return;
  
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
  
    setZoomStyle({
      backgroundImage: `url(${activeImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "300%", // Adjust zoom level
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      pointerEvents: "none",
      display: "block",
    });
  };
  
  const handleLeaveImageZoom = () => {
    setZoomStyle({ display: "none" });
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

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id,quantity);
    fetchUserAddToCart();
    fetchCartData();
    navigate("/cart");
  };
  const wishlistItem = wishlist?.find(
    (item) => item.productId?._id === data?._id
  );
  function isProductInCart(productId, cartProducts) {
    console.log("this is product id",productId);
    console.log("this is cart products",cartProducts);

    
    return cartProducts.some(
      (cartItem) => cartItem.productId._id === productId
    );
  }

  useEffect(() => {
    if (localItems != null && localItems.length) {
      if (localItems.includes(data._id)) {
        setAddedToCart(true);
      }
    } else {
      if (cartProduct && data?._id && isProductInCart(data?._id, cartProduct)) {
        setQuantity(cartProduct[0]?.quantity)
        setAddedToCart(true);
      }
    }
  }, [data,cartProduct]);
  
  return (
    <div className="w-[95%] mx-auto p-4 flex flex-col gap-4">
      <div className="p-4"></div>

      <div className="min-h-[200px] flex flex-col lg:flex-row gap-6 px-4 md:px-6 lg:px-8">
        {/***product Image */}
        <div className="flex flex-col lg:flex-row-reverse gap-4 mt-6 border rounded-lg p-4 md:p-6 w-full lg:w-1/2">
          <div className="md:h-[400px] md:w-[450px] relative object-contain overflow-hidden">
          <div className="absolute inset-0 bg-no-repeat bg-center pointer-events-none"style={zoomStyle}/>
          <img
            ref={imageRef}
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
                    key={imgURL}
                    className={`top-[8px] left-[4px] rounded-[3px] p-4 cursor-pointer ${
                      clickedImage === imgURL ? "border-[2px] border-[#424750]" : ""
                    }`}
                    onClick={() => {
                      setClickedImage(imgURL);
                      handleMouseEnterProduct(imgURL);
                    }}
                  >
                    <img
                      src={imgURL}
                      loading="lazy"
                      className="w-[46px] h-[52px] object-cover transition-transform duration-300 ease-in-out"
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
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 my-2 w-[100%]">
              {!addedToCart ? (
              <button
                onClick={async (e) => {
                  setAddedToCart(true);
                  const itemAddedToCart = await handleAddToCart(
                    e,
                    data?._id
                  );
                  if (itemAddedToCart) {
                    if (user.user == null) {
                      getCartItemCountLocal();
                    }
                  }
                }}
                className="cursor-pointer bg-[#28AD00] w-[40%]  text-white px-4 py-2 rounded-[6px] font-barlow font-semibold text-[16px] leading-[26px] tracking-[0%] text-center mt-4"
              >
                Add to Cart
              </button>
            ) : (
              <button
                onClick={() => navigate("/my-cart")}
                className="cursor-pointer bg-[#FFB255] w-[40%] text-white px-4 py-2 rounded-[6px] font-barlow font-semibold text-[16px] leading-[26px] tracking-[0%] text-center mt-4"
              >
                {"Go to cart"}
              </button>
            )}
            </div>


            </div>
            </div>
            <div className="mt-6 border border-[#E1E3E4] rounded-[6px] p-6">
              <p className="font-barlow font-semibold text-[22px] leading-[26px] tracking-[0%] text-[#424750] mb-3">Description</p>
              <ul className="list-none">
                {data?.description?.split('/').map((item, index) => (
                  <li 
                    key={index} 
                    className="font-barlow text-[12px] leading-[20px] tracking-[0%] font-normal flex items-start text-[#424750] before:content-['•'] before:text-[#424750] before:mr-2 before:text-[16px]"
                  >
                    {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      {data.category && (
          <HorizontalCardProduct
            category={data?.category}
            heading1={"You may also like"}
            fromDetail = {true}
          />
      )}
    </div>
  );
};

export default ProductDetails;
