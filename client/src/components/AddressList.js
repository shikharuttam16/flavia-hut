import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import AddressForm from "./AddressForm";

const AddressList = ({
  userId,
  selectedAddress,
  onSelectAddress,
  getDeliveryCharge,
}) => {
  const [addresses, setAddresses] = useState([]);
  const [editAddress, setEditAddress] = useState(null);
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        SummaryApi.fetchAddress.url.replace(":userId", userId),
        {
          method: SummaryApi.fetchAddress.method,
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result.success) {
        setAddresses(result.data);
        // if (result.data.length > 0) {
        //   onSelectAddress(result.data[0]);
        // }
      } else {
        toast.error(result.message || "Failed to load addresses");
      }
    } catch (error) {
      toast.error("Failed to load addresses.");
    }
  };

  const handleDelete = async (addressId) => {
    try {
      const url = SummaryApi.deleteAddress.url
        .replace(":userId", userId)
        .replace(":addressId", addressId);
      const response = await fetch(url, {
        method: SummaryApi.deleteAddress.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Address deleted successfully");
        fetchAddresses();
      } else {
        toast.error(result.message || "Failed to delete address");
      }
    } catch (error) {
      toast.error("Failed to delete address.");
    }
  };

  return (
    <div>
      <div className="mt-6">
        <div className="flex flex-wrap gap-6">
          {addresses?.map((address) => (
            <div
              key={address._id}
              className="border p-3 mb-4 rounded-lg shadow-md w-[350px] overflow-hidden">
              <div className="flex items-start gap-2">
              
                 <input
                  type="checkbox"
                  name="selectedAddress"
                  className="w-4 h-4 mt-1"
                  value={address._id}
                  checked={selectedAddress === address}
                  onChange={() => {
                    onSelectAddress(address);
                    getDeliveryCharge(address.state);
                  }}
                />
              </div>

              <div className="mt-2 text-gray-600">
                <table className="min-w-full table-auto ">
                  <tbody>
                    {[
                      { label: "Address", value: address.address },
                      { label: "City", value: address.city },
                      { label: "Phone", value: address.phone },
                      { label: "Email", value: address.email },
                      { label: "Pin", value: address.pincode },
                      { label: "State", value: address.state },
                      address.notes && { label: "Notes", value: address.notes },
                    ]
                      .filter(Boolean) // Remove any falsy values (e.g., if notes don't exist)
                      .map((item, index) => (
                        <tr key={index} className="flex gap-2 text-sm">
                          <td
                            
                            className="font-semibold w-[70px] mb-1 ">
                            {item.label}:
                          </td>
                          <td className="w-[250px] truncate mb-1" >
                           
                            {item.value}
                        
                           
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-2 flex justify-end gap-2">
                <button
                  onClick={() => handleDelete(address._id)}
                  className="bg-white border border-red-700 text-red-700 px-4 py-1 rounded">
                  Delete
                </button>
                <button
                  onClick={() => setEditAddress(address)}
                  className="bg-red-700 text-white px-4 py-1 rounded mr-2">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editAddress ? (
        <AddressForm
          userId={userId}
          currentAddress={editAddress}
          onSave={() => {
            setEditAddress(null);
            fetchAddresses();
          }}
        />
      ) : (
        <AddressForm userId={userId} onSave={fetchAddresses} />
      )}
    </div>
  );
};

export default AddressList;
