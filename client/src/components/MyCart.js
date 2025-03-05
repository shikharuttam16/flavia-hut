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

const MyCart = ({ setCartProduct, cartProduct, addressToOrder, addressAvailable }) => {
  const [expanded, setExpanded] = useState(false);
  const {fetchUserAddToCart} = useContext(Context)
  const fetchCartData = useCallback(async () => {
    if (!addressAvailable) return;
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
      });
      const data = await response.json();
      setCartProduct(data?.data || []);
      setTimeout(()=>{
        setExpanded(true)
      },600)
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
    setCartProduct((prevCart) =>
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
        cartProduct.find((item) => item._id === id)?.quantity + change
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
        fetchUserAddToCart()
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
            Order Summary ({cartProduct.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ width: "100%" }}>
          {addressAvailable && cartProduct?.length > 0 ? (
            cartProduct?.map((item, index) => (
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
                cartLength={cartProduct?.length}
              />
            ))
          ) : (
            <Typography sx={{ textAlign: "center", color: "gray", py: 2, width: "100%" }}>
              {addressAvailable ? "Your cart is empty." : "Please add an address to view your cart."}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MyCart;
