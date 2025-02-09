import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);

  const loadingCart = new Array(4).fill(null);
const navigate=useNavigate()
const [toggle, setToggle] = useState(false);
const user = JSON.parse(localStorage.getItem("user"));

// Safely access the user ID
const userId = user?._id;



const showNav = () => {
  setToggle(!toggle);
};
  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, [context.cartProduct]);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
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
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const totalOriginalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.price,
    0
  );

  // Calculate total savings
  const totalSavings = totalOriginalPrice - totalPrice;

  // Function to toggle the drawer visibility
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const handleCheckout=()=>{
    navigate(`/checkout/${userId}`)
    toggleDrawer()
  }

  return (
    <div>
     
       <div  className="text-2xl relative" onClick={toggleDrawer}>
            <FaShoppingCart />
            
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{data?.length}</p>
              </div>
            
          </div>

      {/* Overlay for drawer background */}
      <div
  className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 transform ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`}
  style={{ width: "345px", }} // Fallback width for larger screens
>
  <div
    className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 transform ${
      isOpen ? "translate-x-0" : "translate-x-full"
    } w-full sm:w-2/3 md:w-1/2 lg:w-[400px]`}
  >
        <div className="p-4 ">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black">Your Cart</h2>
           
            <IoCloseCircleOutline onClick={toggleDrawer} fontSize={20} style={{color:"#AA0000"}}/>
          </div>

          <div className="container mx-auto">
            <div className="text-center text-lg my-3 w-full ">
              {data?.length === 0 && !loading && (
                <p className="bg-white py-5 text-black">No Data</p>
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
                      {data?.map((product, index) => {
                        return (
                          <div>
                            <div
                              key={product?._id + "Add To Cart Loading"}
                              className="w-full bg-white  my-4  rounded flex  shadow-md  rounded  ">
                              <div className="flex gap-2 justify-between w-full">
                                <div className="w-20 md:h-20 h-12 bg-slate-200">
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
                                <div className="flex flex-col  justify-center items-center">
                                  {" "}
                                  <div className="flex items-center gap-3 mt-1 border  rounded-full p-2">
                                    <button
                                      className="bg-[#F2F2F2] text-black hover:bg-black hover:text-white w-6 h-6 flex justify-center items-center rounded-full "
                                      onClick={() =>
                                        decraseQty(
                                          product?._id,
                                          product?.quantity
                                        )
                                      }>
                                      -
                                    </button>
                                    <span className="text-black">
                                      {product?.quantity}
                                    </span>
                                    <button
                                      className="bg-[#F2F2F2] text-black hover:bg-black hover:text-white w-6 h-6 flex justify-center items-center rounded-full "
                                      onClick={() =>
                                        increaseQty(
                                          product?._id,
                                          product?.quantity
                                        )
                                      }>
                                      +
                                    </button>
                                  </div>
                                  <div
                                    className=" text-red-600 text-sm rounded-full p-2  cursor-pointer"
                                    onClick={() =>
                                      deleteCartProduct(product?._id)
                                    }>
                                    Remove
                                  </div>
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
{
                      data?.length !== 0 && (
                        <div className="text-black flex flex-col gap-2 mt-4">
                        <div className="text-lg font-bold">
                          Total: {displayINRCurrency(totalPrice)}
                        </div>
                        <div className="text-green-600 font-bold">
                          You saved: {displayINRCurrency(totalSavings)}
                        </div>
                        <div className="flex justify-center items-center">
                        <button className="bg-[#AA0000] hover:bg-red-700 text-white w-[70%] py-2 mt-4 rounded-full" onClick={handleCheckout}>
                          Proceed to Checkout
                        </button>
                        </div>
                       
                      </div>
                      )
}
                 
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CartDrawer;
