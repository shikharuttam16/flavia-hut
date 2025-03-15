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
      const response = await fetch(SummaryApi.updateOrderStatus.url.replace(":id", orderId), {
        method: SummaryApi.updateOrderStatus.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: newStatus[orderId] || "" }), // Status for specific order
        credentials: "include",
      });
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
          <div className="fixed inset-0   flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg bg-[#F2F2F2]">
              <h3 className="text-xl font-semibold mb-4">Order Details</h3>
              <p>
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>Payment Id:</strong>{" "}
                {selectedOrder.paymentId ? selectedOrder.paymentId : "None"}
              </p>
              <p>
                <strong>Date:</strong> {selectedOrder.orderDate.split("T")[0]}
              </p>
              <p>
                <strong>Address:</strong> {selectedOrder.addressInfo.address},{" "}
                {selectedOrder.addressInfo.city},{" "}
                {selectedOrder.addressInfo.pincode}
              </p>
              <p>
                <strong>Phone:</strong> {selectedOrder.addressInfo.phone}
              </p>
              <p>
                <strong>Notes:</strong>{" "}
                {selectedOrder.addressInfo.notes
                  ? selectedOrder.addressInfo.notes
                  : "None"}
              </p>

              <h4 className="mt-4 text-lg font-semibold">Products:</h4>
              <ul className="list-disc pl-5">
                {selectedOrder.cartItems?.map((product) => (
                  <li key={product._id}>
                    <strong>{product.productName}</strong> - {product.category},
                    Price: ₹{product.sellingPrice}, Quantity: {product.quantity}
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
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
