import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import { IoMdHeartEmpty } from "react-icons/io";
import Context from "../context";
import SummaryApi from "../common";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  product,
  handleAddToCart,
  wishlistHandler,
  localItems,
  getCartItemCountLocal,
  cartProduct,
}) => {
  const { wishlist, fetchWishListData, cartProductCount } = useContext(Context);
  const [addedToCart, setAddedToCart] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  function isProductInCart(productId, cartProducts) {
    return cartProducts.some(
      (cartItem) => cartItem.productId._id === productId
    );
  }

  useEffect(() => {
    if (localItems != null && localItems.length) {
      if (localItems.includes(product._id)) {
        setAddedToCart(true);
      }
    } else {
      if (cartProduct && isProductInCart(product._id, cartProduct)) {
        setAddedToCart(true);
      }
    }
  }, [cartProductCount]);

  const discountPercentage = (
    ((product.price - product.sellingPrice) / product.price) *
    100
  ).toFixed(0);
  const amountSaved = product.price - product.sellingPrice;

  const toggleWishlist = (e) => {
    e.stopPropagation();
  };
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
  const wishlistItem = wishlist?.find(
    (item) => item.productId?._id === product?._id
  );

  return (
    <div className="w-full min-w-[248px] max-w-[248px] h-[410px] md:h-[410px] bg-white rounded-md overflow-hidden relative  transition-transform rounded md:hover:border md:hover:border-[#CDD1D6] border border-[#CDD1D6]">
      
        {/* Discount Label */}
        {/* Discount Savings */}
        <Link to={"/product/" + product?._id}>

        <p
          className="bg-[#326FFF] text-white font-titillium font-semibold text-[12px] 
                    leading-[12px] tracking-[0%] w-[95px] h-[27px] rounded-tl-[6px] rounded-br-[6px] flex items-center justify-center"
        >
          Save - {displayINRCurrency(amountSaved)}
        </p>
        </Link>
        {/* Product Image */}
        <Link to={"/product/" + product?._id}>
        <div className="bg-slate-200 h-[170px] min-w-[170px] vertical-product-card mt-2 mx-auto">
          <img
            src={product?.productImage[0]}
            className="object-contain bg-white h-full w-full"
            loading="lazy"
            alt={product?.productName}
          />
        </div>
        </Link>

        {/* Product Details */}
        <div className="p-4">
        <Link to={"/product/" + product?._id}>
          <h2 className="text-[#424750] font-barlow font-normal text-[14px] leading-[16.8px] tracking-[0%] text-ellipsis line-clamp-1 min-h-[50px]">
            {product?.productName}
          </h2>
        </Link>
          <div className="flex justify-between mt-2 flex-col h-[101px]">
            <Link to={"/product/" + product?._id}>
            <div className="flex gap-4 flex-col">
              <p className="text-[#424750] font-barlow font-normal text-[14px] leading-[17px] tracking-[0%] line-through">
                From {displayINRCurrency(product?.price)}
              </p>
              <p className="text-[#28AD00] font-barlow font-semibold text-[18px] leading-[20px] tracking-[0%]">
                To {displayINRCurrency(product?.sellingPrice)}
              </p>
            </div>
            </Link>
            {/* Add to Cart */}
            {!addedToCart ? (
              <button
                onClick={async (e) => {
                  setAddedToCart(true);
                  const itemAddedToCart = await handleAddToCart(
                    e,
                    product?._id
                  );
                  if (itemAddedToCart) {
                    if (user.user == null) {
                      getCartItemCountLocal();
                    }
                  }
                }}
                className="cursor-pointer bg-[#28AD00] text-white px-4 py-2 rounded-[6px] font-barlow font-semibold text-[16px] leading-[26px] tracking-[0%] text-center mt-4"
              >
                Add to Cart
              </button>
            ) : (
              <button
                
                className="w-[100%] cursor-pointer bg-[#FFB255] text-white px-4 py-2 rounded-[6px] font-barlow font-semibold text-[16px] leading-[26px] tracking-[0%] text-center mt-4"
                onClick={() => navigate("/my-cart")}
              >
                {"Go to cart"}
              </button>
            )}
          </div>

          <div>
            <hr />
          </div>
        </div>
      {/* </Link> */}

      {/* Heart Icon for Wishlist */}
      {/* <div
        className="absolute right-2 top-10 rounded-full bg-white p-1 cursor-pointer"
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
            onClick={(e) => wishlistHandler(e, product?._id)}
          /> // Empty heart icon
        )}
      </div> */}
    </div>
  );
};

export default ProductCard;
