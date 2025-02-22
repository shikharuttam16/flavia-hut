import { useEffect, useState, useCallback } from "react";
import ItemCart from "../components/ItemCart";
import SummaryApi from "../common";
import { debounce, throttle } from "lodash";

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

  // Debounced API call (updates the cart after user stops clicking)
  const updateCartAPI = useCallback(
    debounce(async (id, newQty) => {
      console.log(`API Call: Updating product ${id} to quantity ${newQty}`);
      try {
        await fetch(SummaryApi.updateCartProduct.url, {
          method: SummaryApi.updateCartProduct.method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: id, quantity: newQty }),
        });
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }, 500),
    []
  );

  // Throttled function to handle quantity updates (smoothens UI updates)
  const handleQuantityChange = useCallback(
    throttle((id, change) => {
      setCartProduct((prevCart) =>
        prevCart.map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
      );

      // Trigger debounced API update
      const updatedQty =
        cartProduct.find((item) => item._id === id)?.quantity + change;
      updateCartAPI(id, updatedQty);
    }, 500),
    []
  );

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
              onPlusButton={() => handleQuantityChange(item._id, 1)}
              onMinusButton={() => handleQuantityChange(item._id, -1)}
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
