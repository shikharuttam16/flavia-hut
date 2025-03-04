import { Box, MenuItem, Modal, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomTextField from "./CustomTextField";
import { toast } from "react-toastify";
import SummaryApi from "../common";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const EditAddressModal = ({ open, setOpen, selectedAddressData, setAddressChanged }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    email: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    deliveryType: "home",
  });
  const [errors, setErrors] = useState({});

  const savedUserId = localStorage.getItem("user");
  const parsedUserId = JSON.parse(savedUserId);

  useEffect(() => {
    if (selectedAddressData) {
      setFormData((prev) => ({
        ...prev,
        name: selectedAddressData.name,
        phone: selectedAddressData.phone,
        pincode: selectedAddressData.pincode,
        email: selectedAddressData.email,
        address: selectedAddressData.address,
        city: selectedAddressData.city,
        state: selectedAddressData.state,
        landmark: selectedAddressData.landmark,
        alternatePhone: selectedAddressData.alternatePhone,
        deliveryType: selectedAddressData.deliveryType,
      }));
    }
  }, [selectedAddressData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      deliveryType: e.target.value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Name is required.";
    if (!formData.phone.match(/^\d{10}$/))
      newErrors.phone = "Enter a valid 10-digit phone number.";
    if (!formData.pincode.match(/^\d{6}$/))
      newErrors.pincode = "Enter a valid 6-digit pincode.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter a valid E-mail address.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditAddress = async () => {
    if (!validateForm()) {
      toast.error("Please fill all the required fields correctly.", {
        position: "top-right",
      });
      return;
    }
    if (!parsedUserId?._id) {
      toast.error("User not found.", { position: "top-right" });
      return;
    }

    const url = SummaryApi.updateAddress.url
      .replace(":userId", parsedUserId?._id)
      .replace(":addressId", selectedAddressData._id);
    const method = "PUT";
    const payload = { ...formData, userId: parsedUserId?._id };

    try {
      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Address added!");
        setAddressChanged((prev) => !prev);
        onCancelSave();
      } else {
        toast.error(result.message || "Failed to save address");
      }
    } catch (error) {
      toast.error("Failed to submit the data.");
    }
  };

  const onCancelSave = () => {
    setFormData({
      name: "",
      phone: "",
      pincode: "",
      email: "",
      address: "",
      city: "",
      state: "",
      landmark: "",
      alternatePhone: "",
      deliveryType: "home",
    });
    setOpen(false);
    setErrors({});
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Address
        </Typography>
        {selectedAddressData && (
          <>
            <div className="flex gap-2 mb-4">
              <CustomTextField
                label="Name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
              />
              <CustomTextField
                label="10-digit phone number"
                name="phone"
                type="number"
                required
                value={formData.phone}
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </div>
            <div className="mb-4">
              <CustomTextField
                label="Address"
                name="address"
                multiline
                rows={4}
                required
                value={formData.address}
                onChange={handleInputChange}
                error={!!errors.address}
                helperText={errors.address}
              />
            </div>
            <div className="flex w-full gap-2 mb-4">
              <div className="w-1/2">
                <CustomTextField
                  label="City"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  error={!!errors.city}
                  helperText={errors.city}
                />
              </div>
              <div className="w-1/2">
                <Select
                  className="bg-white w-full"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, state: e.target.value }))
                  }
                  displayEmpty
                  error={!!errors.state}
                >
                  <MenuItem value="">
                    <em>Select State</em>
                  </MenuItem>
                  {indianStates?.map((state, index) => (
                    <MenuItem key={index} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <CustomTextField
                label="Landmark (optional)"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
              />
              <CustomTextField
                label="Alternate Phone (optional)"
                name="altphone"
                type="number"
                value={formData.alternatePhone}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="deliveryType"
                  value="home"
                  checked={formData.deliveryType === "home"}
                  onChange={handleRadioChange}
                />
                <p className="font-bold">Home (All day delivery)</p>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="deliveryType"
                  value="work"
                  checked={formData.deliveryType === "work"}
                  onChange={handleRadioChange}
                />
                <p className="font-bold">Work (Delivery between 10AM - 5PM)</p>
              </label>
            </div>
            <div className="flex gap-x-2 mt-4">
              <button
                className="bg-orange-500 py-3 px-5 rounded-sm text-white font-bold"
                onClick={handleEditAddress}
              >
                Edit this Address
              </button>
              <button
                className="bg-transparent py-3 px-5 rounded-sm text-blue-700 font-bold"
                onClick={onCancelSave}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default EditAddressModal;
