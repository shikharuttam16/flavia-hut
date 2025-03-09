import { useCallback, useEffect, useState, useContext } from "react";
import { debounce } from "lodash";
import ItemCart from "../components/ItemCart";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

const MyCart = ({
  setProductCart,
  productCart,
  addressToOrder,
  addressAvailable,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { fetchUserAddToCart, setCartProduct } = useContext(Context);

  const fetchCartData = useCallback(async () => {
    if (!addressAvailable) return;
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
      });
      const data = await response.json();
      setProductCart(data?.data || []);
      setTimeout(() => {
        setExpanded(true);
      }, 600);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }, [addressAvailable]);

  
  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const updateCartAPI = useCallback(
    debounce(async (id, newQty) => {
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
    setProductCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
    updateCartAPI(
      id,
      Math.max(
        1,
        productCart.find((item) => item._id === id)?.quantity + change
      )
    );
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
        toast.success("Product Removed Successfully!", {
          position: "top-right",
        });
        fetchCartData();
        fetchUserAddToCart();
        setCartProduct((prevCart) => prevCart.filter((item) => item._id !== id));
      } else {
        toast.error("Failed to remove product!", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred!", { position: "top-right" });
    }
  };

  const handleAccordionChange = (_, isExpanded) => {
    if (addressAvailable) {
      setExpanded(isExpanded);
    }
  };

  const placeOrder = async () => {
    try {
      const savedUserId = localStorage.getItem("user");
      const parsedUserId = JSON.parse(savedUserId);
      if (!addressToOrder) {
        toast.error("Please select an address before proceeding to checkout!");
        return;
      }
      if (productCart.length === 0) {
        toast.error("Your cart is empty!", { position: "top-right" });
        return;
      }
      const orderData = {
        userId: parsedUserId?._id,
        cartItems: productCart?.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.price,
          sellingPrice: item.productId.sellingPrice,
          category: item.productId.category,
          productName: item.productId.productName,
        })),
        addressInfo: {
          address: addressToOrder.address,
          city: addressToOrder.city,
          pincode: addressToOrder.pincode,
          phone: addressToOrder.phone,
          notes: addressToOrder.notes,
          email: addressToOrder.email,
        },
        orderStatus: "Pending",
        totalAmount: productCart.reduce(
          (total, item) => total + item.quantity * item.productId.sellingPrice,
          0
        ),
        orderDate: new Date().toISOString(),
        orderUpdateDate: new Date().toISOString(),
        paymentId: null,
      };
      const dataResponse = await fetch(SummaryApi.createOrder.url, {
        method: SummaryApi.createOrder.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const dataApi = await dataResponse.json();
      if (dataResponse.ok && dataApi.success) {
        toast.success(dataApi.message);
        toast.success("Order placed successfully!", { position: "top-right" });
        // fetchCartData();  // Uncomment if you want to refresh the cart after placing an order
      } else {
        toast.error(dataApi.message || "Failed to place the order!");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="my-orders w-full">
      <Accordion
        expanded={expanded}
        onChange={handleAccordionChange}
        disabled={!addressAvailable}
      >
        <AccordionSummary
          aria-controls="panel-content"
          id="panel-header"
          sx={{
            bgcolor: expanded ? "#3271ff" : "transparent",
            color: expanded ? "white" : "#76808f",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            minHeight: "40px",
            "& .MuiAccordionSummary-content": { marginY: "0px" },
            "&.Mui-expanded": { minHeight: "40px", marginY: "0px" },
          }}
        >
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            <span
              className={`${
                expanded
                  ? "text-[#3271ff] bg-white"
                  : "text-[#3271ff] bg-[#f4f7f7]"
              } border py-1 px-1.5 rounded-[4px] mr-2`}
            >
              3
            </span>{" "}
            Order Summary ({productCart.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ width: "100%" }}>
          {addressAvailable && productCart?.length > 0 ? (
            <>
              {productCart?.map((item, index) => (
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
                  index={index}
                  cartLength={productCart?.length}
                />
              ))}
              <div className="flex justify-start mt-4">
                <button
                  className="bg-[#ff8d01] text-white py-2 px-4 font-semibold rounded-sm"
                  onClick={placeOrder}
                  disabled={productCart.length === 0}
                >
                  Place Your Order
                </button>
              </div>
            </>
          ) : (
            <Typography
              sx={{ textAlign: "center", color: "gray", py: 2, width: "100%" }}
            >
              {addressAvailable
                ? "Your cart is empty."
                : "Please add an address to view your cart."}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MyCart;
