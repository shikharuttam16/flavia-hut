import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const AddAddressForm = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (_, isExpanded) => {
    setExpanded(isExpanded);
  };

  return (
    <div className="add-address w-full">
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            bgcolor: expanded ? "#3271ff" : "transparent",
            color: expanded ? "white" : "inherit",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            minHeight: "40px",
            "& .MuiAccordionSummary-content": {
              marginY: "0px",
            },
            "&.Mui-expanded": {
              minHeight: "40px",
              marginY: "0px",
            },
          }}
        >
          <Typography
            component="span"
            sx={{
              color: expanded ? "white" : "inherit",
              fontWeight: "bold",
            }}
          >
            Add Address
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AddAddressForm;
