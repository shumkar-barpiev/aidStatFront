"use client";

import {
  Box,
  Table,
  Paper,
  TableRow,
  TableHead,
  TableBody,
  Typography,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import Colors from "@/styles/colors";
import { useTranslation } from "react-i18next";
import { renderEllipsisText } from "@/utils/textUtils";
import { useProjectsViewModel } from "@/viewmodels/projects/useProjectsViewModel";
import { StyledTableCell, StyledTableHeadCell } from "@/components/other/StyledTableComponents";

export default function ProjectsTable() {
  const { t } = useTranslation();
  const { projects } = useProjectsViewModel();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <TableContainer component={Paper} sx={{ height: "100%" }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: Colors.royalBlue,
              zIndex: 50,
              height: "70px",
            }}
          >
            <StyledTableHeadCell sx={{ width: "5%" }}>№</StyledTableHeadCell>
            <StyledTableHeadCell sx={{ width: "20%", textAlign: "left", paddingLeft: "20px" }}>
              Название
            </StyledTableHeadCell>
            <StyledTableHeadCell sx={{ width: "15%", textAlign: "left", paddingLeft: "20px" }}>
              Партнеры
            </StyledTableHeadCell>
            <StyledTableHeadCell sx={{ width: "15%", textAlign: "left", paddingLeft: "20px" }}>
              Секторы
            </StyledTableHeadCell>
            <StyledTableHeadCell sx={{ width: "15%", textAlign: "left", paddingLeft: "20px" }}>
              Дата начала
            </StyledTableHeadCell>
            <StyledTableHeadCell sx={{ width: "15%", textAlign: "left", paddingLeft: "20px" }}>
              Сумма проекта
            </StyledTableHeadCell>
            <StyledTableHeadCell sx={{ width: "15%" }}>Статус</StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects?.length == 0 ? (
            <TableRow>
              <StyledTableCell align="center" sx={{ textAlign: "center" }} colSpan={7}>
                {loading && <CircularProgress />}
                {!loading && <Typography variant="body2">Нет данных</Typography>}
              </StyledTableCell>
            </TableRow>
          ) : (
            projects?.map((project, index) => {
              return (
                <TableRow
                  key={project.id}
                  onClick={() => {}}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: index % 2 === 0 ? "#F5F5F5" : "white",
                    "&:hover": {
                      backgroundColor: "#cadefa",
                    },
                  }}
                >
                  <StyledTableCell>{project?.id} </StyledTableCell>
                  <StyledTableCell>{renderEllipsisText(project?.title)}</StyledTableCell>
                  <StyledTableCell>{renderEllipsisText(project.partners)}</StyledTableCell>
                  <StyledTableCell>{renderEllipsisText(project.sector)}</StyledTableCell>
                  <StyledTableCell>{project.startDate}</StyledTableCell>
                  <StyledTableCell sx={{ paddingLeft: "0px", textAlign: "center" }}>
                    {renderEllipsisText(project.budget)}
                  </StyledTableCell>
                  <StyledTableCell sx={{}}>{renderEllipsisText(project.status)}</StyledTableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
