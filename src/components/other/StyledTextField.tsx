import { styled } from "@mui/system";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField)({
  height: "40px",
  borderRadius: 0,
  "& .MuiOutlinedInput-root": {
    height: "40px",
    "& fieldset": {
      border: "1px solid lightgray",
      borderRadius: 0,
    },
    "&:hover fieldset": {
      border: "1px solid lightgray",
      borderRadius: 0,
    },
    "&.Mui-focused fieldset": {
      border: "1px solid lightgray",
      borderRadius: 0,
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "13px",
    lineHeight: "1.5",
    maxWidth: "200px",
    fontWeight: "bold",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "transparent",
  },
});
