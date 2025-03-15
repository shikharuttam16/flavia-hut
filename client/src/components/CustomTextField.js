import TextField from "@mui/material/TextField";

const CustomTextField = ({
  label,
  required = false,
  value,
  onChange,
  type,
  error,
  helperText,
  className = "",
  ...props
}) => {
  return (
    <TextField
      required={required}
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      type={type}
      error={error}
      helperText={helperText}
      className={`bg-white ${className}`}
      sx={{
        "& input[type=number]": {
          MozAppearance: "textfield",
        },
        "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
          margin: 0, 
        },
        "& .MuiFormHelperText-root.Mui-error": {
          backgroundColor: "#edf3ff",
          margin: '0px 0px 0px 0px'
        },
      }}
      {...props}
    />
  );
};

export default CustomTextField;
