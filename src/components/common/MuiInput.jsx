import TextField from "@mui/material/TextField";

const MuiInput = ({
  label,
  type = "text",
  value,
  onChange,
  error = false,
  helperText = "",
  multiline = false,
  rows, // optional row count for textarea
  name,
  sx = {},
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      multiline={multiline}
      rows={rows}
      name={name}
      fullWidth
      variant="outlined"
      sx={sx}
    />
  );
};

export default MuiInput;
