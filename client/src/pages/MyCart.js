import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import ItemCart from "../components/ItemCart";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const MyCart = () => {
  const [cartProduct, setCartProduct] = useState([]);

  const fetchCartData = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
      });
      const data = await response.json();
      setCartProduct(data?.data || []);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }, []);

  useEffect(() => {
    fetchCartData();
  }, []);

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

  const handleQuantityChange = (id, change) => {
    setCartProduct((prevCart) => {
      return prevCart.map((item) => {
        if (item._id === id) {
          const newQty = Math.max(1, item.quantity + change);
          updateCartAPI(id, newQty);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const deleteCartProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        // toast.success("Product Removed Successfully!", { position: "top-right" });
        toast.success("Product Removed Successfully!", {
          position: "top-right",
        });
        fetchCartData();
      } else {
        // toast.error("Failed to remove product!", { position: "top-right" });
        toast.error("Failed to remove product!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred!", { position: "top-right" });
    }
  };

  return (
    <div className="my-orders flex">
      {/* Left side */}
      <div className="border border-solid m-4 pb-4 w-4/5 rounded-lg">
        <div className="heading bg-[#3271ff] rounded-t-lg py-2 flex items-center gap-x-3 px-4">
          <span className="bg-white text-[#3271ff] p-0.5 px-2 rounded-md ml-2 font-semibold">
            {cartProduct.length}
          </span>
          <span className="text-white font-medium">Order Summary</span>
        </div>
        {cartProduct.length > 0 ? (
          cartProduct.map((item) => (
            <ItemCart
              key={item._id}
              id={item._id}
              name={item.productId.productName}
              image={item.productId.productImage[0]}
              description={item.productId.description}
              price={item.productId.price}
              sellingPrice={item.productId.sellingPrice}
              quantity={item.quantity}
              onPlusButton={() => handleQuantityChange(item._id, 1)}
              onMinusButton={() => handleQuantityChange(item._id, -1)}
              onDeleteButton={() => deleteCartProduct(item._id)}
            />
          ))
        ) : (
          <p className="text-center p-4 text-gray-500">Your cart is empty.</p>
        )}
      </div>
      {/* Right side */}
      <div className="border border-solid m-4 p-4 w-1/5 rounded-lg">
        Right Side
      </div>
    </div>
  );
};

export default MyCart;
