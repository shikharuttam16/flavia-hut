import React, { useState, useEffect } from "react";
import SummaryApi from "../common";
import Orders from "../components/Orders";
import {useSelector} from "react-redux";


const MyAccount = () => {
  const [selectedSection, setSelectedSection] = useState("orders");
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: ""
  });
const user=useSelector((state)=>state?.user?.user);
const userId = user?._id;

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(`${SummaryApi.fetchAllAddress.url}/${userId}`, {
          method: SummaryApi.fetchAddress.method
        });
        if (!response.ok) throw new Error("Failed to fetch addresses");

        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setAddresses(result.data);
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };
    fetchAddress();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async () => {
    try {
      const response = await fetch(SummaryApi.addAddress.url, {
        method: SummaryApi.addAddress.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...formData })
      });
      const result = await response.json();
      if (result.success) {
        setAddresses([...addresses, result.data]);
        setFormData({ address: "", city: "", state: "", pincode: "", phone: "", email: "" });
        setSelectedSection("addresses");
      } else {
        console.error("Error adding address:", result.message);
      }
    } catch (err) {
      console.error("Error adding address:", err);
    }
  };

  const handleEdit = (address) => {
    setCurrentAddress(address);
    setFormData({
      address: address.address || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      phone: address.phone || "",
      email: address.email || ""
    });
    setSelectedSection("editAddress");
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${SummaryApi.updateAddress.url.replace(":userId", userId).replace(":addressId", currentAddress._id)}`,
        {
          method: SummaryApi.updateAddress.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );
      if (response.ok) {
        setAddresses(addresses.map((addr) => (addr._id === currentAddress._id ? { ...addr, ...formData } : addr)));
        setSelectedSection("addresses");
      }
    } catch (err) {
      console.error("Error updating address:", err);
    }
  };

  const handleDelete = async (addressId) => {
    if (selectedSection === "editAddress") return; // Prevent deletion while editing

    try {
      const response = await fetch(
        `${SummaryApi.deleteAddress.url.replace(":userId", userId).replace(":addressId", addressId)}`,
        { method: SummaryApi.deleteAddress.method }
      );
      if (response.ok) {
        setAddresses(addresses.filter((addr) => addr._id !== addressId));
      }
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-6 space-y-6 md:space-y-0 md:space-x-6">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white p-6 shadow rounded-lg h-fit">
        <ul className="space-y-4">
          <li
            className={`cursor-pointer mt-0 p-2 rounded-lg ${selectedSection === "orders" ? "font-barlow font-semibold text-[14px] leading-[22px] tracking-normal text-[#7E8693]" : "font-barlow font-semibold text-[14px] leading-[22px] tracking-normal text-[#424750]"}`}
            onClick={() => setSelectedSection("orders")}
          >
            My Orders
          </li>
          <li
            className={`cursor-pointer mt-0 p-2 rounded-lg ${selectedSection === "addresses" ? "font-barlow font-semibold text-[14px] leading-[22px] tracking-normal text-[#7E8693]" : "font-barlow font-semibold text-[14px] leading-[22px] tracking-normal text-[#424750]"}`}
            onClick={() => setSelectedSection("addresses")}
          >
            My Addresses
          </li>
          <li className="font-barlow mt-0 font-semibold text-[14px] leading-[22px] p-2 tracking-normal text-[#424750] cursor-pointer">Logout</li>
        </ul>
      </div>
      {/* Content Section */}
      <div className="w-full md:w-3/4 bg-white shadow rounded-lg h-fit">
        {selectedSection === "orders" ? (
          <Orders />
        ) : (
        <div>
          <div className="flex justify-between items-center border-b-2">
            <h2 className="font-barlow font-bold text-[24px] px-4 py-6">My Addresses</h2>
              <button className="text-blue-500 px-4 py-6" onClick={() => setSelectedSection("addAddress")}>
                Add a New Address
              </button>
          </div>
          <div className="rounded-lg px-4">
            {addresses.length > 0 ? (
              addresses.map((addr) => (
                <div key={addr._id} className="border-b last:border-b-0 py-4">
                  <p className="text-gray-800">{addr.address}, {addr.city}, {addr.state}, {addr.pincode}</p>
                  <p className="text-gray-500">{addr.email}</p>
                  <p className="text-gray-500">{addr.phone}</p>
                  <div className="flex space-x-4 mt-3">
                    <button className="text-blue-500 text-sm" onClick={() => handleEdit(addr)}>Edit</button>
                    {selectedSection !== "editAddress" && ( // Hide delete button while editing
                      <button className="text-red-500 text-sm" onClick={() => handleDelete(addr._id)}>Delete</button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 p-4 text-center">No addresses found.</p>
            )}
          </div>
        </div>
       )}
      {/* Add/Edit Address Section */}
      {(selectedSection === "addAddress" || selectedSection === "editAddress") && (
        <div className="mt-6 px-4 py-4">
          <h2 className="font-barlow font-bold text-[24px]">
            {selectedSection === "addAddress" ? "Add New Address" : "Edit Address"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {["address", "city", "state", "pincode", "phone", "email"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
              />
            ))}
          </div>
          <button
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
            onClick={selectedSection === "addAddress" ? handleAddAddress : handleUpdate}
          >
            {selectedSection === "addAddress" ? "Save Address" : "Update Address"}
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default MyAccount;
