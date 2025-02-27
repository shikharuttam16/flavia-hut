import MyCart from "./MyCart";

const MainCartPage = () => {
  return (
    <>
      <div className="login">
        <h2>Login</h2>
      </div>
      <div className="address">
        <p>Addresses</p>
      </div>
      <div className="addAddress">
        <p>Add Address</p>
      </div>
      <div className="cart-items">
        <MyCart />
      </div>
    </>
  );
};

export default MainCartPage;
