import { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";

function AllOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // For viewing details of a selected order
  const [newStatus, setNewStatus] = useState({}); // To handle status change for individual orders

  // Fetch all orders
  const fetchAllOrders = async () => {
    const fetchData = await fetch(SummaryApi.getAllOrdersOfAllUsers.url, {
      method: SummaryApi.getAllOrdersOfAllUsers.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setAllOrders(dataResponse.data);
    } else {
      toast.error(dataResponse.message);
    }
  };

  // Handle status change for a particular order
  const handleStatusChange = async (orderId) => {
    try {
      const response = await fetch(
        SummaryApi.updateOrderStatus.url.replace(":id", orderId),
        {
          method: SummaryApi.updateOrderStatus.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderStatus: newStatus[orderId] || "" }), // Status for specific order
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("Order status updated successfully!");
        fetchAllOrders(); // Refresh the orders after status update
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating order status!");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  console.log(selectedOrder, "selectedOrder");

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Order Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Order Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Order Price
              </th>
              <th className="relative px-6 py-3 border-b">
                <span className="sr-only">Details</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allOrders && allOrders?.length > 0 ? (
              allOrders?.map((orderItem) => (
                <tr
                  key={orderItem._id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {orderItem._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {orderItem.orderDate.split("T")[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full text-white ${
                        orderItem.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-gray-500"
                      }`}
                    >
                      {orderItem.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{orderItem.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Order status dropdown */}
                    <select
                      className="border p-1 rounded"
                      value={newStatus[orderItem._id] || ""}
                      onChange={(e) =>
                        setNewStatus({
                          ...newStatus,
                          [orderItem._id]: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button
                      className="bg-blue-500 text-white rounded-full text-sm p-1 ml-2"
                      onClick={() => handleStatusChange(orderItem._id)}
                    >
                      Update Status
                    </button>
                    <button
                      className="bg-[#AA0000] text-white rounded-full text-sm p-1 ml-2"
                      onClick={() => setSelectedOrder(orderItem)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-sm text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[1px] transition-all duration-300">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full border border-gray-200">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>

              {/* Header */}
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                Order Details
              </h3>

              {/* Order Information */}
              <div className="space-y-2 text-gray-700 text-sm">
                <p>
                  <span className="text-gray-900 font-semibold">Name:</span>{" "}
                  {selectedOrder.addressInfo.name}
                </p>
                <p>
                  <span className="text-gray-900 font-semibold">Order ID:</span>{" "}
                  {selectedOrder._id}
                </p>
                <p>
                  <span className="text-gray-900 font-semibold">
                    Payment ID:
                  </span>{" "}
                  {selectedOrder.paymentId || "None"}
                </p>
                <p>
                  <span className="text-gray-900 font-semibold">Date:</span>{" "}
                  {selectedOrder.orderDate.split("T")[0]}
                </p>
                <p>
                  <span className="text-gray-900 font-semibold">Address:</span>{" "}
                  {selectedOrder.addressInfo.address},{" "}
                  {selectedOrder.addressInfo.city},{" "}
                  {selectedOrder.addressInfo.pincode}
                </p>
                <p>
                  <span className="text-gray-900 font-semibold">Phone:</span>{" "}
                  {selectedOrder.addressInfo.phone}
                </p>
                <p>
                  <span className="text-gray-900 font-semibold">Notes:</span>{" "}
                  {selectedOrder.addressInfo.notes || "None"}
                </p>
              </div>

              {/* Product List */}
              <h4 className="mt-5 text-lg font-semibold text-gray-900">
                Products
              </h4>
              <ul className="mt-2 space-y-1 text-sm">
                {selectedOrder.cartItems?.map((product) => (
                  <li
                    key={product._id}
                    className="flex justify-between py-1 border-b last:border-none text-gray-700 text-sm"
                  >
                    <p>
                      <span className="text-gray-900 font-semibold">
                        {product.productName}:{" "}
                      </span>{" "}
                      {product.category}
                    </p>
                    <span className="text-gray-600">
                      ₹{product.sellingPrice} × {product.quantity} : Quantity
                    </span>
                  </li>
                ))}
              </ul>
              {/* Total Amount */}
              <div className="mt-4 border-t pt-3 flex justify-between items-center text-gray-800 text-lg font-semibold">
                <span>Total Amount:</span>
                <span className="text-green-600">
                  ₹
                  {selectedOrder.cartItems.reduce(
                    (total, product) =>
                      total + product.sellingPrice * product.quantity,
                    0
                  )}
                </span>
              </div>
              <button
                className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium transition"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllOrders;
