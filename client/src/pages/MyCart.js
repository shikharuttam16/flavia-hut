import ItemCart from "../components/ItemCart";

const MyCart = () => {
  return (
    <>
      <div className="my-orders flex">
        {/* Left side */}
        <div className="border border-solid m-4 pb-4 w-4/5 rounded-lg">
          <div className="heading bg-[#3271ff] rounded-t-lg py-2 flex items-center gap-x-3 px-4">
            <span className="bg-white text-[#3271ff] p-0.5 px-2 rounded-md ml-2 font-semibold">
              3
            </span>
            <span className="text-white font-medium">Order Summary</span>
          </div>

          {[...Array(3)].map((_, index) => (
            <ItemCart key={index} />
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
