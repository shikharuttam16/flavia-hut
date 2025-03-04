import { useState } from "react";
import MyCart from "../components/MyCart";
import PriceRightSide from "../components/PriceRightSide";
import SavedAddresses from "../components/SavedAddresses";

const MainCartPage = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const [addressToOrder, setAddressToOrder] = useState(null);

  return (
    <>
      <div className="main-cart-page flex ml-2">
        <div className="w-4/5 m-4">
          <div className="login pb-4">
            <h2>Login component goes here</h2>
          </div>
          <div className="addresses pb-4">
            <SavedAddresses setAddressToOrder={setAddressToOrder} />
          </div>
          <div className="cart-items">
            <MyCart
              setCartProduct={setCartProduct}
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
