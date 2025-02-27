import MainAddress from "../components/MainAddress";
import MyCart from "../components/MyCart";

const MainCartPage = () => {
  return (
    <>
      <div className="main-cart-page flex">
        <div className="w-4/5 m-4">
          <div className="login pb-4">
            <h2>Login component goes here</h2>
          </div>
          <div className="addresses pb-4">
            <MainAddress />
          </div>
          <div className="cart-items">
            <MyCart />
          </div>
        </div>

        {/* Right side */}
        <div className="border border-solid m-4 p-4 w-1/5 rounded-lg">
          Right Side
        </div>
      </div>
    </>
  );
};

export default MainCartPage;
