import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CustomTextField from "./CustomTextField";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { Typography } from "@mui/material";

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

const AddAddressForm = ({ setAddressChanged }) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
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
    // deliveryType: "home",
  });
  const [errors, setErrors] = useState({});
  const savedUserId = localStorage.getItem("user");
  const parsedUserId = JSON.parse(savedUserId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
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

  const handleSave = async () => {
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
    const url = SummaryApi.addAddress.url;
    const method = "POST";
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
        onCancelSave();
        setAddressChanged((prev) => !prev);
      } else {
        toast.error(result.message || "Failed to save address");
      }
    } catch (error) {
      toast.error("Failed to submit the data.");
    }
  };

  // const handleRadioChange = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     deliveryType: e.target.value,
  //   }));
  // };

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
      // deliveryType: "home",
    });
    setErrors({});
    setShowAddressForm(false);
  };

  return (
    <div className="add-address pl-2 py-0.5 w-full bg-[#edf3ff] border rounded-md shadow-lg">
      <FormControl component="fieldset" className="bg-[#edf3ff]">
        <FormControlLabel
          control={
            <Checkbox
              checked={showAddressForm}
              onChange={() => setShowAddressForm(!showAddressForm)}
              sx={{
                color: "#000",
                "&.Mui-checked": {
                  color: "#3271ff",
                },
                "& .MuiSvgIcon-root": {
                  borderRadius: "50%",
                },
              }}
            />
          }
          label={
            <Typography sx={{ color: "#3271ff", fontWeight: "bold" }}>
              Add a New Address
            </Typography>
          }
        />
      </FormControl>

      {showAddressForm && (
        <div className="bg-[#edf3ff] p-4 rounded-lg mt-4">
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

          <div className="flex gap-2 mb-4">
            <CustomTextField
              label="Pincode"
              name="pincode"
              type="number"
              required
              value={formData.pincode}
              onChange={handleInputChange}
              error={!!errors.pincode}
              helperText={errors.pincode}
            />
            <CustomTextField
              label="E-mail"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
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
                {indianStates.map((state, index) => (
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
              name="alternatePhone"
              type="number"
              value={formData.alternatePhone}
              onChange={handleInputChange}
            />
          </div>

          {/* <div className="flex gap-4 mb-4">
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
          </div> */}

          <div className="flex gap-x-2 mt-4">
            <button
              className="bg-orange-500 py-3 px-5 rounded-sm text-white font-bold"
              onClick={handleSave}
            >
              Save and deliver here
            </button>
            <button
              className="bg-transparent py-3 px-5 rounded-sm text-blue-700 font-bold"
              onClick={onCancelSave}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAddressForm;
