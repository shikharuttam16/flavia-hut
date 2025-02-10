import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa"; // Import FaHeart
import displayINRCurrency from "../helpers/displayCurrency";
import { IoMdHeartEmpty } from "react-icons/io";
import Context from "../context";
import SummaryApi from "../common";

const ProductCard = ({ product, handleAddToCart, wishlistHandler }) => {
  const { wishlist, fetchWishListData } = useContext(Context);
  const discountPercentage = (
    ((product.price - product.sellingPrice) / product.price) *
    100
  ).toFixed(0);
  const amountSaved = product.price - product.sellingPrice;

  const toggleWishlist = (e) => {
    e.stopPropagation(); // Prevent triggering the link's onClick
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
  const wishlistItem = wishlist?.find(item => item.productId?._id === product?._id);
  
  return (
    // <div className="w-full min-w-[230px] md:min-w-[220px] max-w-[230px] md:max-w-[220px] h-[310px] bg-white rounded-md shadow-lg overflow-hidden relative hover:scale-105 transition-transform rounded hover:border hover:border-[#AA0000] border border-[#EDEDED]">
    <div className="w-full min-w-[248px] max-w-[248px] h-[410px] md:h-[410px] bg-white rounded-md shadow-lg overflow-hidden relative md:hover:scale-105 transition-transform rounded md:hover:border md:hover:border-[#CDD1D6] border border-[#CDD1D6]">
      <Link to={"/product/" + product?._id}>
        {/* Discount Label */}
      {/* Discount Savings */}
        <p className="bg-[#326FFF] text-white font-titillium font-semibold text-[12px] 
                    leading-[12px] tracking-[0%] w-[95px] h-[27px] mt-[1px] 
                    rounded-tl-[6px] rounded-br-[6px] flex items-center justify-center">
          Save - {displayINRCurrency(amountSaved)}
        </p>
        {/* Product Image */}
        <div className="bg-slate-200 h-[170px] min-w-[170px] vertical-product-card">
          <img
            src={product?.productImage[0]}
            className="object-fill h-full w-full"
            loading="lazy"
            alt={product?.productName}
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h2 className="text-[#424750] font-barlow font-normal text-[14px] leading-[16.8px] tracking-[0%] text-ellipsis line-clamp-1">
            {product?.productName}
          </h2>

          <div className="flex justify-between mt-2 flex-col">
            <div className="flex gap-2 flex-col">
              <p className="text-[#424750] font-barlow font-normal text-[14px] leading-[17px] tracking-[0%] line-through">
                From {displayINRCurrency(product?.price)}
              </p>
              <p className="text-[#28AD00] font-barlow font-semibold text-[18px] leading-[20px] tracking-[0%]">
                To {displayINRCurrency(product?.sellingPrice)}
              </p>
            </div>
            {/* Add to Cart */}
            <button onClick={(e) => handleAddToCart(e, product?._id)} className="cursor-pointer bg-[#28AD00] text-white px-4 py-2 rounded-[6px] font-barlow font-semibold text-[16px] leading-[26px] tracking-[0%] text-center"> Add to Cart</button>
          </div>

          <div>
            <hr />
          </div>
        </div>
      </Link>

      {/* Heart Icon for Wishlist */}
      <div
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
      </div>
    </div>
  );
};

export default ProductCard;
