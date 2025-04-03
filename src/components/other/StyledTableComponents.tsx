import Colors from "@/styles/colors";
import { styled, TableCell } from "@mui/material";

export const StyledTableHeadCell = styled(TableCell)(() => ({
  color: "#fff",
  fontWeight: 800,
  fontSize: "12px",
  textAlign: "center",
  whiteSpace: "nowrap",
  backgroundColor: Colors.darkBlue,
  border: "none",
  padding: "10px",
  tableLayout: "fixed",
}));

export const StyledTableCell = styled(TableCell)(() => ({
  padding: 10,
  fontSize: "14px",
  textAlign: "left",
  paddingLeft: "20px",
  borderBottom: "1px solid lightgray",
}));
