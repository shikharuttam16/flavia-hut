import { FiPlus } from "react-icons/fi";
import { AiOutlineMinus } from "react-icons/ai";
import { CgTrash } from "react-icons/cg";
import { useEffect, useState } from "react";
import SummaryApi from "../common";

const ItemCart = () => {
  const [cartProduct, setCartProduct] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const dataResponse = await fetch(SummaryApi.addToCartProductView.url, {
          method: SummaryApi.addToCartProductView.method,
          credentials: "include",
        });

        const dataApi = await dataResponse.json();
        setCartProduct(dataApi?.data);
        console.log("Cart Data:", dataApi?.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  console.log(cartProduct,"cartProduct");

  return (
    <>
      <div className="flex my-4 mx-4">
        <div className="min-h-40 flex flex-col items-start justify-center p-4">
          {/* Image area (Aligned to Left) */}
          <div className="self-start">
            <img src={""} alt="Product" className="w-24 h-24 object-cover" />
          </div>

          {/* Counter Section (Aligned to Left) */}
          <div className="flex items-center gap-x-4 mt-3 self-start">
            <button className="w-8 h-8 flex items-center justify-center text-lg font-bold">
              <AiOutlineMinus size={24} />
            </button>
            <span className="text-sm border rounded-md border-gray-300 px-3.5 py-2">
              1
            </span>
            <button className="w-8 h-8  flex items-center justify-center text-lg font-bold">
              <FiPlus size={24} />
            </button>
          </div>
        </div>

        <div className="w-full px-6">
          <div className="title flex items-center justify-between">
            <p className="font-semibold text-lg">Tandoori Makhana</p>
            <p className="text-sm font-semibold">
              Delivery by <span>Mon Feb 18</span>
            </p>
          </div>
          <div className="mt-2 description">
            <p className="text-sm text-gray-500">
              Tandoori Makhana is a crunchy, roasted foxnut snack infused
              <br />
              with rich Indian spices for a smoky, flavorable bite.
            </p>
          </div>

          {/* Price */}
          <div className="mt-5 flex gap-x-8 items-center">
            <div className="text-xs text-white bg-[#56CF01] px-3 py-[3px] rounded-md">
              Save <span>Rs.51.00</span>
            </div>
            <div className="font-light">
              <span className="line-through font-extralight">Rs.480.00</span>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="text-2xl text-[#56CF01] font-semibold">
                Rs. 429.00
              </span>
              <p className="text-sm font-light">(incl. of all taxes)</p>
            </div>
          </div>
        </div>

        <div className="mt-1">
          <button>
            <CgTrash size={24} />
          </button>
        </div>
      </div>
      <hr className="border-t-2 border-black mx-8" />
    </>
  );
};

export default ItemCart;
