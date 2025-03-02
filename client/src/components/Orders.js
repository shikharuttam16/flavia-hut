import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import noorders from "../../src/assest/images/no_orders_yet.svg"

const Orders = () => {
  const [orders, setOrders] = useState([]); // Ensure it's always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "Unpaid":
        return "bg-gray-500 text-white";
      case "Paid":
        return "bg-green-400 text-white";
      case "Refund":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-200 text-black";
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "Packed":
        return "text-orange-500 border-orange-500";
      case "Completed":
        return "text-green-500 border-green-500";
      case "Canceled":
        return "text-red-500 border-red-500";
      default:
        return "text-gray-500 border-gray-500";
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${SummaryApi.orderListByUser.url}/675969087f2bbe19f5df7ed3`,
          { method: SummaryApi.orderListByUser.method }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const result = await response.json();
        console.log(result);
        setOrders(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  if (loading) {
    return <div className="text-center p-4 text-gray-600">Loading orders...</div>;
  }
  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }
  return (
    <div className="bg-white rounded-lg w-full">
      <h2 className="font-barlow font-bold text-[24px] leading-[32px] tracking-normal text-[#424750] px-4 py-6 border-b-2">
        My Orders
      </h2>

      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-500 text-sm border-b">
                <th className="py-2 px-4 whitespace-nowrap font-barlow text-[14px] leading-[22px] tracking-normal font-normal text-[#7E8693]">Order Id</th>
                <th className="py-2 px-4 whitespace-nowrap font-barlow text-[14px] leading-[22px] tracking-normal font-normal text-[#7E8693]">Date</th>
                <th className="py-2 px-4 whitespace-nowrap font-barlow text-[14px] leading-[22px] tracking-normal font-normal text-[#7E8693]">Payment Status</th>
                <th className="py-2 px-4 whitespace-nowrap font-barlow text-[14px] leading-[22px] tracking-normal font-normal text-[#7E8693]">Items</th>
                <th className="py-2 px-4 whitespace-nowrap font-barlow text-[14px] leading-[22px] tracking-normal font-normal text-[#7E8693]">Total Amount</th>
                <th className="py-2 px-4 whitespace-nowrap font-barlow text-[14px] leading-[22px] tracking-normal font-normal text-[#7E8693]">Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b text-gray-700">
                  <td className="py-3 px-4 whitespace-nowrap font-barlow text-[16px] leading-[26px] tracking-normal font-normal text-black">{order._id || "N/A"}</td>
                  <td className="py-3 px-4 whitespace-nowrap font-barlow text-[16px] leading-[26px] tracking-normal font-normal text-black">{order.orderDate || "N/A"}</td>
                  <td className="py-3 px-4 whitespace-nowrap font-barlow text-[16px] leading-[26px] tracking-normal font-normal text-black">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus || "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {Array.isArray(order.cartItems)
                      ? order.cartItems.map((item) => `${item.productName} (x${item.quantity})`).join(", ")
                      : "No items"}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-barlow text-[16px] leading-[26px] tracking-normal font-normal text-black">{order.totalAmount || "N/A"}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 border rounded-lg text-sm font-medium ${getOrderStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus || "N/A"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center mb-6">
          <img
            src={noorders}
            alt="Empty Box"
            className="w-24 h-24"
          />
          <p className="text-gray-400 mt-4">No Orders Yet</p>
          <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-orange-600">
            Make your first order
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
