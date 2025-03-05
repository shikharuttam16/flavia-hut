import { useState } from "react";
import MyCart from "../components/MyCart";
import PriceRightSide from "../components/PriceRightSide";
import SavedAddresses from "../components/SavedAddresses";
import LoginSignupCart from "../components/LoginSignupCart";
import LoggedInUserCart from "../components/LoggedInUserCart";
import { useSelector } from "react-redux";


const MainCartPage = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const [addressToOrder, setAddressToOrder] = useState(null);
  const user = useSelector((state) => state.user)
  const [login,setLogin] = useState(false)
  const [addressAvailable,setAddressAvailable] = useState(user.user == null?false:true)
  const [orderSummaryAvailable,setOrderSummaryAvailable] = useState(false)

  console.log("Address avail is",addressAvailable);
  
  
  return (
    <>
      <div className="main-cart-page flex ml-2">
        <div className="w-4/5 m-4">
          <div className="login pb-4">
          {
            user?.user==null ?
            <LoginSignupCart  setAddressAvailable={setAddressAvailable}  />
            : <LoggedInUserCart user={user}  />
          }
          </div>
          <div className="addresses pb-4">
            <SavedAddresses addressAvailable={addressAvailable} setAddressToOrder={setAddressToOrder}  />
          </div>
          <div className="cart-items">
            <MyCart
              setCartProduct={setCartProduct}
              addressAvailable = {addressAvailable}
              cartProduct={cartProduct}
              addressToOrder={addressToOrder}
            />
          </div>
        </div>

        <div className="m-2 p-4 w-1/3">
          <PriceRightSide cartProduct={cartProduct} />
        </div>
      </div>
    </>
  );
};

export default MainCartPage;
