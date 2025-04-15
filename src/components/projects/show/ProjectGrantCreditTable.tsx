"use client";

import Colors from "@/styles/colors";
import { formatCurrencyWithSpaces } from "@/utils/formatCurrency";
import { StyledTableCell, StyledTableHeadCell } from "@/components/other/StyledTableComponents";
import { Table, Paper, TableRow, TableBody, TableCell, TableContainer, TableHead } from "@mui/material";

export const ProjectGrantCreditTable = ({ items }: { items: Record<string, any>[] }) => {
  return (
    items && (
      <TableContainer component={Paper} elevation={1}>
        <Table sx={{ minWidth: 400 }} aria-label="Grant Credit table">
          <TableHead>
            <TableRow
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: Colors.darkBlue,
                zIndex: 50,
                height: "60px",
              }}
            >
              <StyledTableHeadCell sx={{ width: "25%" }}>Партнер (кредитор)</StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "25%" }}>Номер кредита</StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "25%" }}>Сумма</StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "25%" }}>Сумма (в USD)</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item, index) => (
              <TableRow key={index} sx={{ height: "40px" }}>
                <StyledTableCell sx={{ width: "25%", textAlign: "center" }}>{item.partnerName}</StyledTableCell>
                <StyledTableCell sx={{ width: "25%", textAlign: "center" }}>{item.number}</StyledTableCell>
                <StyledTableCell sx={{ width: "25%", textAlign: "center" }}>
                  {formatCurrencyWithSpaces(item.totalSum)}
                </StyledTableCell>
                <StyledTableCell sx={{ width: "25%", textAlign: "center" }}>
                  {formatCurrencyWithSpaces(item.totalSumForeign)}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};
