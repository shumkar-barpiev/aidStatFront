import React from "react";
import {
  Avatar,
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Colors from "@/styles/colors";
import { StyledTableCell, StyledTableHeadCell } from "@/components/other/StyledTableComponents";
import ProjectBadges from "@/components/projects/ProjectBadges";
import { formatCurrency } from "@/utils/formatCurrency";
import { useContractsStore } from "@/stores/contracts/contracts";
import { imageUrl } from "@/utils/constants";
import { useTableContractsViewModel } from "@/viewmodels/contracts/useTableContractsViewModel";
import ContractsSearchField from "@/components/statistics/components/search/ContractsSearchField";
import { transliterate } from "@/utils/format/transliterate";
import { useTranslation } from "react-i18next";
import { formattedUpdateTime } from "@/utils/format/formattedUpdateTime";

const ContractsTable = () => {
  const { contractsForTable, pageTotal, totalContracts, filters } = useContractsStore();
  const { handleChangePage, handleSetFilter } = useTableContractsViewModel();
  const { t } = useTranslation();

  return (
    <Box>
      <ContractsSearchField handleSetFilter={handleSetFilter} />
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
                {t("ui.table.totalSum")}
              </StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "10%", textAlign: "center", paddingLeft: "20px" }}>
                {t("ui.table.implementor")}
              </StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "22%", textAlign: "left", paddingLeft: "20px" }}>
                {t("ui.table.project")}
              </StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "10%", textAlign: "center", paddingLeft: "20px" }}>
                {t("ui.table.donor")}
              </StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "10%" }}>Статус</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contractsForTable &&
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
                  <StyledTableCell sx={{ width: "10%" }}>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
                      {contract.implementers.map((implementor) => {
                        return (
                          <Tooltip key={implementor.id} title={implementor.name}>
                            <Avatar
                              src={`${imageUrl}${implementor.image}`}
                              alt={implementor.name || "Avatar"}
                              sx={{
                                width: 50,
                                height: 50,
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.45)",
                                "& .MuiAvatar-img": {
                                  objectFit: "cover",
                                },
                              }}
                            />
                          </Tooltip>
                        );
                      })}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "22%", whiteSpace: "normal", wordBreak: "break-word" }}>
                    <a
                      href={`/projects/show/${transliterate(contract.project.name)}#${contract.project.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contract.project.name}
                    </a>
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "10%" }}>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
                      {contract.donors.map((donor) => (
                        <Tooltip key={donor.id} title={donor.name}>
                          <Avatar
                            src={`${imageUrl}${donor.image}`}
                            alt={donor.name || "Avatar"}
                            sx={{
                              width: 50,
                              height: 50,
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.45)",
                              "& .MuiAvatar-img": {
                                objectFit: "cover",
                              },
                            }}
                          />
                        </Tooltip>
                      ))}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "10%", textAlign: "center" }}>
                    <ProjectBadges
                      status={contract.status as "In progress" | "Completed" | "Not started" | "Canceled"}
                    />
                  </StyledTableCell>
                </TableRow>
              ))}
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
