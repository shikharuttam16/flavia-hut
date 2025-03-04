import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Modal,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import AddAddressForm from "./AddAddressForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CustomTextField from "./CustomTextField";
import EditAddressModal from "./EditAddressModal";
import { add } from "lodash";

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

const SavedAddresses = ({ setAddressToOrder }) => {
  const [expanded, setExpanded] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedAddressData, setSelectedAddressData] = useState(null);
  const [addressChanged, setAddressChanged] = useState(false);

  const savedUserId = localStorage.getItem("user");
  const parsedUserId = JSON.parse(savedUserId);

  useEffect(() => {
    fetchAddresses();
  }, [addressChanged]);

  const fetchAddresses = async () => {
    const userId = parsedUserId?._id;
    if (!userId) return;
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
        if (result.data.length > 0) {
          setSelectedAddress(result.data[0]._id);
          setAddressToOrder(result.data[0]._id);
        }
      } else {
        toast.error(result.message || "Failed to load addresses");
      }
    } catch (error) {
      toast.error("Failed to load addresses.");
    }
  };

  const handleAddressChange = (event) => {
    const addressId = event.target.value;
    setSelectedAddress(addressId);
    const addressToOrder = addresses?.find(
      (address) => address._id === addressId
    );
    setAddressToOrder(addressToOrder);
  };

  const handleOpenEditModal = (addressId) => {
    const addressToEdit = addresses?.find(
      (address) => address._id === addressId
    );
    setSelectedAddressData(addressToEdit);
    setOpen(true);
  };

  return (
    <>
      <div className="saved-addresses w-full">
        <Accordion
          expanded={expanded}
          onChange={(_, isExpanded) => setExpanded(isExpanded)}
        >
          <AccordionSummary
            sx={{
              bgcolor: expanded ? "#3271ff" : "transparent",
              color: expanded ? "white" : "#76808f",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              minHeight: "40px",
              "& .MuiAccordionSummary-content": { marginY: "0px" },
              "&.Mui-expanded": { minHeight: "40px", marginY: "0px" },
            }}
          >
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              <span
                className={`${
                  expanded
                    ? "text-[#3271ff] bg-white"
                    : "text-[#3271ff] bg-[#f4f7f7]"
                } border py-1 px-1.5 rounded-[4px] mr-2`}
              >
                2
              </span>
              Select Delivery Address
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {addresses.length === 0 ? (
              <Typography>No saved addresses found.</Typography>
            ) : (
              <div className="w-full p-2">
                <RadioGroup
                  value={selectedAddress}
                  onChange={(event) => handleAddressChange(event)}
                >
                  {addresses
                    ?.slice(0, showAll ? addresses.length : 2)
                    ?.map((address) => (
                      <div
                        key={address._id}
                        className="flex justify-between items-center border-b border-gray-400 py-4"
                      >
                        <FormControlLabel
                          value={address._id}
                          control={<Radio />}
                          label={
                            <Typography variant="body1">
                              <strong>{address.name}</strong> #{address.address}
                              , {address.city}, {address.state}
                              <strong>
                                {" "}
                                {address.city?.toUpperCase()}{" "}
                              </strong> - {address.pincode}
                              <br />
                              <span className="text-sm">
                                {address.email} - {address.phone}
                              </span>
                            </Typography>
                          }
                        />
                        <button
                          className="text-[#3271ff] text-base font-semibold"
                          onClick={() => handleOpenEditModal(address?._id)}
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                </RadioGroup>
                {addresses.length > 1 && (
                  <Button
                    variant="text"
                    onClick={() => setShowAll(!showAll)}
                    sx={{ mt: 2, textTransform: "none", fontWeight: "bold" }}
                    startIcon={
                      showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />
                    }
                  >
                    {showAll
                      ? "Show Less"
                      : `View All ${addresses.length} Addresses`}
                  </Button>
                )}
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="mt-4">
        <AddAddressForm setAddressChanged={setAddressChanged} />
      </div>
      <div>
        <EditAddressModal
          open={open}
          setOpen={setOpen}
          selectedAddressData={selectedAddressData}
          setAddressChanged={setAddressChanged}
        />
      </div>
    </>
  );
};

export default SavedAddresses;
