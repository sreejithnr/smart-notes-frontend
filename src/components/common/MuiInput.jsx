import TextField from "@mui/material/TextField";

const MuiInput = ({
  label,
  type = "text",
  value,
  onChange,
  error = false,
  helperText = "",
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
};

export default MuiInput;
