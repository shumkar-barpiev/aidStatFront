"use client";

import React, { ChangeEvent, useRef } from "react";
import {
  Box,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { formattedUpdateTime } from "@/utils/format/formattedUpdateTime.ts";
import Colors from "@/styles/colors.ts";
import { StyledTableCell, StyledTableHeadCell } from "@/components/other/StyledTableComponents.tsx";
import { formatCurrency } from "@/utils/formatCurrency.ts";
import { transliterate } from "@/utils/format/transliterate.ts";
import ProjectBadges from "@/components/projects/ProjectBadges.tsx";
import { useTranslation } from "react-i18next";
import { ContractFilters } from "@/stores/contracts/contracts.ts";
import { TContractModelForTable } from "@/models/contracts/ContractModel.ts";
import AvatarList from "@/components/statistics/components/avatars/AvatarList.tsx";

interface Props {
  contractsForTable: TContractModelForTable | null;
  pageTotal: number | null;
  totalContracts: number | null;
  filters: ContractFilters;
  loadingTableData: boolean;
  setFilters: (filters: Partial<ContractFilters>) => void;
  forProject?: boolean;
}

const ContractsTable: React.FC<Props> = ({
  contractsForTable,
  pageTotal,
  totalContracts,
  loadingTableData,
  filters,
  setFilters,
  forProject,
}) => {
  const { t } = useTranslation();
  const tableRef = useRef<HTMLTableElement | null>(null);

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setFilters({ page });
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box ref={tableRef}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", my: 1 }}>
        <Typography>
          {t("common.totalCount")}: {totalContracts}
        </Typography>
        <Typography>
          {t("common.updateTime")}
          {": "}
          {formattedUpdateTime(contractsForTable?.updateTime, "30.04.2025, 11:42")}
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ height: "100%" }}>
        <Table stickyHeader aria-label="sticky table" sx={{ tableLayout: "fixed", minWidth: 1050 }}>
          <TableHead>
            <TableRow
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: Colors.darkBlue,
                zIndex: 50,
                height: "70px",
              }}
            >
              <StyledTableHeadCell sx={{ width: "3%", textAlign: "left", paddingLeft: "20px" }}>№</StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "30%", textAlign: "left", paddingLeft: "20px" }}>
                {t("ui.table.contract")}
              </StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "10%", textAlign: "center", paddingLeft: "20px" }}>
                {t("ui.table.totalContractSum")}
              </StyledTableHeadCell>
              {forProject ? null : (
                <StyledTableHeadCell sx={{ width: "10%", textAlign: "center", paddingLeft: "20px" }}>
                  {t("ui.table.implementor")}
                </StyledTableHeadCell>
              )}
              <StyledTableHeadCell
                sx={{ width: "22%", textAlign: forProject ? "center" : "left", paddingLeft: "20px" }}
              >
                {forProject ? t("ui.table.contractType") : t("ui.table.project")}
              </StyledTableHeadCell>
              <StyledTableHeadCell
                sx={{
                  width: forProject ? "20%" : "10%",
                  textAlign: forProject ? "left" : "center",
                  paddingLeft: "20px",
                }}
              >
                {forProject ? t("ui.table.contractLocationName") : t("ui.table.donor")}
              </StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "10%" }}>{t("ui.table.status")}</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingTableData ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : contractsForTable && contractsForTable.data.length ? (
              contractsForTable.data.map((contract, index) => (
                <TableRow
                  key={contract.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#F5F5F5" : "white",
                    "&:hover": { backgroundColor: "#cadefa" },
                  }}
                >
                  <StyledTableCell sx={{ width: "3%" }}>
                    {(filters.page - 1) * filters.limit + index + 1}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "30%", whiteSpace: "normal", wordBreak: "break-word" }}>
                    {contract.name}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "10%", textAlign: "right" }}>
                    {formatCurrency(contract.amount) + " " + contract.unit}
                  </StyledTableCell>
                  {forProject ? null : (
                    <StyledTableCell sx={{ width: "10%" }}>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
                        <AvatarList items={contract.implementers} />
                      </Box>
                    </StyledTableCell>
                  )}
                  <StyledTableCell
                    sx={{
                      width: "22%",
                      textAlign: forProject ? "center" : "left",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {forProject ? (
                      contract.contractType
                    ) : (
                      <a
                        href={`/projects/show/${transliterate(contract.project.name)}#${contract.project.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contract.project.name}
                      </a>
                    )}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "10%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        justifyContent: forProject ? "left" : "center",
                      }}
                    >
                      {forProject ? contract.address || "не указано" : <AvatarList items={contract.donors} />}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "10%", textAlign: "center" }}>
                    <ProjectBadges
                      status={contract.status as "In progress" | "Completed" | "Not started" | "Canceled"}
                    />
                  </StyledTableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={forProject ? 6 : 7} align="center">
                  {forProject ? t("ui.table.noContractsAvailableForProject") : t("ui.table.noContractsAvailable")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2 }}>
        <Pagination
          siblingCount={1}
          boundaryCount={2}
          page={filters?.page}
          count={pageTotal ?? 1}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default ContractsTable;
