import { useEffect, useState } from "react";
import ItemCart from "../components/ItemCart";
import SummaryApi from "../common";

const MyCart = () => {
  const [cartProduct, setCartProduct] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const dataResponse = await fetch(SummaryApi.addToCartProductView.url, {
          method: SummaryApi.addToCartProductView.method,
          credentials: "include",
        });

        const dataApi = await dataResponse.json();
        setCartProduct(dataApi?.data || []);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <>
      <div className="my-orders flex">
        {/* Left side */}
        <div className="border border-solid m-4 pb-4 w-4/5 rounded-lg">
          <div className="heading bg-[#3271ff] rounded-t-lg py-2 flex items-center gap-x-3 px-4">
            <span className="bg-white text-[#3271ff] p-0.5 px-2 rounded-md ml-2 font-semibold">
              {cartProduct.length}
            </span>
            <span className="text-white font-medium">Order Summary</span>
          </div>

          {cartProduct.map((item) => (
            <ItemCart
              key={item._id}
              id={item._id}
              name={item.productId.productName}
              image={item.productId.productImage[0]} // Using the first image
              description={item.productId.description}
              price={item.productId.price}
              sellingPrice={item.productId.sellingPrice}
              quantity={item.quantity}
            />
          ))}
        </div>

        {/* Right side */}
        <div className="border border-solid m-4 p-4 w-1/5 rounded-lg">
          Right Side
        </div>
      </div>
    </>
  );
};

export default MyCart;
