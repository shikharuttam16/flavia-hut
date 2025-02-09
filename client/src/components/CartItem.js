
import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
const CartItem = ({ data, fetchData, address, delivery }) => {
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

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
      context.fetchCartData();
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

  return (
    <div>
      <div className="container mx-auto">
        <div className="text-center text-lg my-3">
          {data?.length === 0 && !loading && (
            <p className="bg-white py-5">No Data</p>
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
                    className="w-full bg-slate-200 h-32 my-2 animate-pulse rounded"
                  ></div>
                );
              })
            ) : (
              <div>
                <div className="">
                  {data?.map((product, index) => {
                    return (
                      <div>
                        <div
                          key={product?._id + "Add To Cart Loading"}
                          className="w-full bg-white  my-4  rounded flex  shadow-md  rounded  p-1 "
                        >
                          <div className="flex gap-2 justify-between w-full">
                            <div className="w-20 h-14 md:h-20 bg-slate-200">
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
                                    decraseQty(product?._id, product?.quantity)
                                  }
                                >
                                  -
                                </button>
                                <span className="text-black">
                                  {product?.quantity}
                                </span>
                                <button
                                  className="bg-[#F2F2F2] text-black hover:bg-black hover:text-white w-6 h-6 flex justify-center items-center rounded-full "
                                  onClick={() =>
                                    increaseQty(product?._id, product?.quantity)
                                  }
                                >
                                  +
                                </button>
                              </div>
                              <div
                                className=" text-red-600 text-sm rounded-full p-2  cursor-pointer"
                                onClick={() => deleteCartProduct(product?._id)}
                              >
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

                <div className="text-black flex flex-col gap-2 mt-4">
                  <div className="text-lg font-thin">
                    Delivery Charge: {displayINRCurrency(delivery)}
                  </div>
                  <div className="text-lg font-bold">
                    Total: {displayINRCurrency(totalPrice + delivery)}
                  </div>
                  <div className="text-green-600 font-bold">
                    You saved: {displayINRCurrency(totalSavings)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem