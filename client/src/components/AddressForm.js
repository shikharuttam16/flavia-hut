import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common"; // Assuming API endpoints are defined here



// const handleState = (e) => {
//   const { name, value } = e.target;
//   setData((prevData) => ({
//     ...prevData,
//     [state]: value,
//   }));
// };

const AddressForm = ({ userId, currentAddress, onSave }) => {
  const [data, setData] = useState({
    userId,
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    notes: "",
  });

  useEffect(() => {
    if (currentAddress) {
      setData(currentAddress);
    }
  }, [currentAddress]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
   
  };

const IndianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep",
  "Delhi", "Puducherry", "Ladakh", "Lakshadweep"
];

  const validateFields = () => {
    // Check for empty fields
    if (!data.email || !data.phone || !data.address || !data.city || !data.pincode || !data.state) {
      toast.error("Please fill all required fields.");
      return false;
    }
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    // Validate phone number format (example: only digits and length)
    const phonePattern = /^\d{10}$/; // Adjust the regex based on your requirements
    if (!phonePattern.test(data.phone)) {
      toast.error("Please enter a valid phone number (10 digits).");
      return false;
    }
    // Validate pincode format (example: 6 digits)
    const pincodePattern = /^\d{6}$/; // Adjust the regex based on your requirements
    if (!pincodePattern.test(data.pincode)) {
      toast.error("Please enter a valid pincode (6 digits).");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate fields before proceeding
    if (!validateFields()) {
      return; // Stop submission if validation fails
    }

    const url = currentAddress
      ? `${SummaryApi.updateAddress.url.replace(":userId", userId).replace(":addressId", currentAddress._id)}`
      : SummaryApi.addAddress.url;

    const method = currentAddress ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
     

      if (result.success) {
        toast.success(currentAddress ? "Address updated!" : "Address added!");
        setData([])
        onSave();
      } else {
        toast.error(result.message || "Failed to save address");
      }
    } catch (error) {
      toast.error("Failed to submit the data.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {currentAddress ? "Edit Address" : "Add Address"}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium">
            Street Address
          </label>
          <input
            type="text"
            name="address"
            value={data.address}
            onChange={handleChange}
            placeholder="Address"
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={handleChange}
            placeholder="City"
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={data.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium">State</label>
          <select
            name="state"
            value={data.state}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          >
            <option value="">Select State</option>
            {IndianStates.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium">
            Additional Info
          </label>
          <input
            type="text"
            name="notes"
            value={data.notes}
            onChange={handleChange}
            placeholder="Additional info"
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="col-span-2 bg-[#AA0000] text-white p-4 rounded-lg mt-4"
        >
          {currentAddress ? "Update Address" : "Add Address"}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
