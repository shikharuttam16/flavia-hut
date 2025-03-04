import { useMemo } from "react";

const PriceRightSide = ({ cartProduct }) => {
  const totalOriginalPrice = useMemo(() => {
    return cartProduct.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
  }, [cartProduct]);

  const totalSellingPrice = useMemo(() => {
    return cartProduct.reduce(
      (acc, item) => acc + item.productId.sellingPrice * item.quantity,
      0
    );
  }, [cartProduct]);

  const totalSavings = totalOriginalPrice - totalSellingPrice;

  const deliveryCharge = totalSellingPrice > 500 ? 0 : 59;

  const totalPayable = totalSellingPrice + deliveryCharge;

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold text-gray-400 pb-2 border-b">
        Price Details
      </h3>

      <div className="flex justify-between text-gray-600 py-2">
        <span className="font-semibold">
          Price ({cartProduct.length} item{cartProduct.length > 1 ? "s" : ""})
        </span>
        <span>Rs. {totalOriginalPrice.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-600 py-2">
        <span className="font-semibold">Discounted Price</span>
        <span>Rs. {totalSellingPrice.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-600 py-2">
        <span className="font-semibold">Delivery Charge</span>
        <span>Rs. {deliveryCharge.toFixed(2)}</span>
      </div>

      <div className="flex justify-between font-bold text-lg border-t pt-2">
        <span>Total Payable</span>
        <span>Rs. {totalPayable.toFixed(2)}</span>
      </div>

      <p className="text-green-500 text-sm font-medium mt-4 text-center">
        You're saving Rs. {totalSavings.toFixed(2)} on this order!
      </p>
    </div>
  );
};

export default PriceRightSide;
