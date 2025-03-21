import { useState } from "react";
import MyCart from "../components/MyCart";
import PriceRightSide from "../components/PriceRightSide";
import SavedAddresses from "../components/SavedAddresses";
import LoginSignupCart from "../components/LoginSignupCart";
import LoggedInUserCart from "../components/LoggedInUserCart";
import { useSelector } from "react-redux";

const MainCartPage = () => {
  const [productCart, setProductCart] = useState([]);
  const [addressToOrder, setAddressToOrder] = useState(null);
  const user = useSelector((state) => state.user);
  const [login, setLogin] = useState(false);
  const [addressAvailable, setAddressAvailable] = useState(
    user.user == null ? false : true
  );
  const [orderSummaryAvailable, setOrderSummaryAvailable] = useState(false);

  return (
    <>
      <div className="main-cart-page flex flex-col md:flex-col mx-2 space-y-2 my-6 lg:flex-row gap-4">
        <div className="w-full md:w-5/5 mt-2 lg:w-4/5">
          <div className="login pb-4">
            {user?.user == null ? (
              <LoginSignupCart setAddressAvailable={setAddressAvailable} />
            ) : (
              <LoggedInUserCart user={user} />
            )}
          </div>
          <div className="addresses pb-4">
            <SavedAddresses
              addressAvailable={addressAvailable}
              setAddressToOrder={setAddressToOrder}
            />
          </div>
          <div className="cart-items">
            <MyCart
              setProductCart={setProductCart}
              addressAvailable={addressAvailable}
              productCart={productCart}
              addressToOrder={addressToOrder}
            />
          </div>
        </div>

        {/* Side panel moves to bottom on mobile */}
        <div className="w-full md:w-3/3 lg:w-1/3">
          <PriceRightSide productCart={productCart} />
        </div>
      </div>
    </>
  );
};

export default MainCartPage;
