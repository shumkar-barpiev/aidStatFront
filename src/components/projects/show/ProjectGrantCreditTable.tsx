"use client";

import Colors from "@/styles/colors";
import { formatCurrencyWithSpaces } from "@/utils/formatCurrency";
import { StyledTableCell, StyledTableHeadCell } from "@/components/other/StyledTableComponents";
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";

export const ProjectGrantCreditTable = ({ items }: { items: Record<string, any>[] }) => {
  const { t } = useTranslation();
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
              <StyledTableHeadCell sx={{ width: "25%" }}>{t("projectInfoPage.table.partner")}</StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "25%" }}>{t("projectInfoPage.table.loanNumber")}</StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "25%" }}>{t("projectInfoPage.table.sum")}</StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "25%" }}>{t("projectInfoPage.table.foreignSum")}</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item, index) => (
              <TableRow key={index} sx={{ height: "40px" }}>
                <StyledTableCell
                  sx={{
                    width: "25%",
                    textAlign: "left",
                    fontWeight: "bold",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  {item.partnerName}
                </StyledTableCell>
                <StyledTableCell sx={{ width: "25%", textAlign: "center", fontWeight: "bold" }}>
                  {item.number}
                </StyledTableCell>
                <StyledTableCell sx={{ width: "25%", textAlign: "center", fontWeight: "bold" }}>
                  {formatCurrencyWithSpaces(item.totalSum)}
                </StyledTableCell>
                <StyledTableCell sx={{ width: "25%", textAlign: "center", fontWeight: "bold" }}>
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
