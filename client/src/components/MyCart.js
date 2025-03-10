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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MyCart = ({
  setProductCart,
  productCart,
  addressToOrder,
  addressAvailable,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { fetchUserAddToCart, setCartProduct } = useContext(Context);
   const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [localCartLength, setLocalCartLength] = useState(0)
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  const fetchLocalData = ( ) =>{
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if(cart.length >0){
    // const cartCount = cart.length;
    // setLocalCartLength(cartCount)
    }
  }

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

  const paymentHandler = async(e) => {

    var amount = 100;
    var paise = 0;
    const currency = "INR";
    const receiptId = "qwasq1";
  
  if(productCart&&productCart.length!==0){
   paise = productCart.reduce(
     (total, item) => total + item.quantity * item.productId.sellingPrice,
     0
   )
   amount = (paise+deliveryCharge)*100;
  }
    const response = await fetch(SummaryApi.paymentOrder.url, {
      method: "POST",
      body: JSON.stringify({ amount, currency, receipt: receiptId }),
      headers: { "Content-Type": "application/json" },
    });
    const order = await response.json();
  
   
  
    var options = {
      key: "rzp_live_vIwnHnhaeU23Fj",
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Flavia Hut", //your business name
      description: "Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };
  
        const validateRes = await fetch(SummaryApi.paymentValidate.url, {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "content-type": "application/json" },
        });
        const jsonRes = await validateRes.json();
        if (jsonRes.msg === "Success") {
          placeOrder(e, jsonRes);
        }
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: addressToOrder.email,
        contact: addressToOrder.phone, //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };
  
  const handleCombinedClick = (e) => {
    if (productCart && productCart.length !== 0 && addressToOrder) {
      paymentHandler(e);
    }
  };

  const deleteAllProducts = async () => {
    await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      headers: { "content-type": "application/json" },
      credentials: "include",
    });
  };

  const placeOrder = async (e,jsonRes) => {
    e.preventDefault();
    try {
      const parsedUserId =  user?._id;
      if (!addressToOrder) {
        toast.error("Please select an address before proceeding to checkout!");
        return;
      }
      if (productCart.length === 0) {
        toast.error("Your cart is empty!", { position: "top-right" });
        return;
      }
      const orderData = {
        userId: parsedUserId,
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
        paymentId: jsonRes.paymentId,
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
        toast.success("Order placed successfully! Redirecting to My Orders", { position: "top-right" });
        await deleteAllProducts()
        await fetchCartData();  // Uncomment if you want to refresh the cart after placing an order
        fetchUserAddToCart();
        setTimeout(()=>{
          navigate('/my-account')
        },1000)
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
            Order Summary ({ productCart.length})
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
                  onClick={handleCombinedClick}
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
