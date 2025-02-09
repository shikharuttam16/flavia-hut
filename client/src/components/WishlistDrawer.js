import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";
import addToCart from "../helpers/addToCart";
import { IoCloseCircleOutline } from "react-icons/io5";

const WishlistDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);
const navigate=useNavigate()
const {wishlist,fetchWishListData,fetchUserAddToCart,fetchCartData}=useContext(Context)
  const handleLoading = async () => {
     await fetchWishListData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, [context.cartProduct]);



  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    fetchCartData()

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
        fetchWishListData()
      context.fetchUserAddToCart();
    }
  };


  // Function to toggle the drawer visibility
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const handleCheckout=()=>{
    navigate("/checkout")
    toggleDrawer()
  }

  return (
    <div>
     
       <div  className="text-2xl relative" onClick={toggleDrawer}>
            <FaHeart />
            
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{wishlist?.length>0?wishlist?.length:0}</p>
              </div>
            
          </div>

      {/* Overlay for drawer background */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300  ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleDrawer} // Close the drawer when clicking outside
      ></div>

      {/* Drawer Component */}
      <div  style={{ width: "345px" }}
        className={`fixed top-0 right-0 h-full w-83 bg-white shadow-lg z-50 transition-transform duration-300 transform  ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="p-4 ">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black">Your Wishlist</h2>
            <IoCloseCircleOutline onClick={toggleDrawer} fontSize={20} style={{color:"#AA0000"}}/>
          </div>

          <div className="container mx-auto">
            <div className="text-center text-lg my-3 w-full ">
              {wishlist?.length === 0 || wishlist?.length === undefined && !loading && (
                <p className="bg-white py-5 text-black">No wishlist</p>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
              {/***view product */}
              <div className="w-full max-w-3xl">
                {loading ? (
                  loadingCart?.map((el, index) => {
                    return (
                      <div
                        key={el + "Add To Cart Loading" + index}
                        className="w-full bg-slate-200 h-32 my-2 animate-pulse rounded"></div>
                    );
                  })
                ) : (
                  <div>
                    <div className="max-h-[70vh] overflow-y-auto">
                      {wishlist?.map((product, index) => {
                        return (
                          <div>
                            <div
                              key={product?._id + "Add To Cart Loading"}
                              className="w-full bg-white  my-4  rounded flex  shadow-md  rounded  ">
                              <div className="flex gap-2 justify-between w-full">
                                <div className="w-20 h-20 bg-slate-200">
                                  <img
                                    src={product?.productId?.productImage[0]}
                                    className="w-full h-full "
                                  />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <h2 className=" text-ellipsis text-black line-clamp-1">
                                    {product?.productId?.productName}
                                  </h2>
                                  <div className="flex items-center justify-between  gap-2 ">
                                    <p className="text-[#249B3E] text-sm ">
                                      {displayINRCurrency(
                                        product?.productId?.sellingPrice
                                      )}
                                    </p>
                                    <p className="line-through text-[#808080] text-sm">
                                      {" "}
                                      {displayINRCurrency(
                                        product?.productId?.price
                                      )}
                                    </p>
                                  </div>
                                </div>
                           
                                <div className="flex justify-center items-center  p-2 gap-2">
                                    <FaShoppingCart style={{color: "#AA0000"}}  onClick={(e) => handleAddToCart(e, product?.productId?._id)}/>

                                    <MdDelete style={{color: "#AA0000"}} onClick={()=>deleteWishlistProduct(product?._id)} />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <hr />
                    </div>

                 
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;
