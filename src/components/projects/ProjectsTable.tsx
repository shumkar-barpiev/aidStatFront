"use client";

import {
  Box,
  Table,
  Paper,
  Avatar,
  Tooltip,
  TableRow,
  TableHead,
  TableBody,
  Typography,
  Pagination,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import Colors from "@/styles/colors";
import { useTranslation } from "react-i18next";
import { RenderEllipsisText } from "@/utils/textUtils";
import { useProjectsStore } from "@/stores/projects/projects";
import { Base64Avatar } from "@/components/other/Base64Avatar";
import { useProjectsViewModel } from "@/viewmodels/projects/useProjectsViewModel";
import { StyledTableCell, StyledTableHeadCell } from "@/components/other/StyledTableComponents";

export default function ProjectsTable() {
  const { t } = useTranslation();
  const projectStore = useProjectsStore();
  const { projects, projectsFilter, projectItemsPageTotal, getProjectSectorsTitle, handleProcessItemsPageChange } =
    useProjectsViewModel();

  const getPartnerAvatar = (name: string, image: string | null) => {
    if (!image) {
      const initials = name ? name.substring(0, 2).toUpperCase() : "";

      return (
        <Tooltip key={name} title={`${name}`}>
          <Avatar sx={{ width: 40, height: 40, backgroundColor: "blue" }}>{initials}</Avatar>
        </Tooltip>
      );
    }

    return <Base64Avatar key={name} base64String={`${image ?? ""}`} alt={name} />;
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ height: "100%" }}>
        <Table stickyHeader aria-label="sticky table" sx={{ tableLayout: "fixed" }}>
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
                  {projectStore.loading && <CircularProgress />}
                  {!projectStore.loading && <Typography variant="body2">Нет данных</Typography>}
                </StyledTableCell>
              </TableRow>
            ) : (
              projects?.map((project, index) => {
                return (
                  <TableRow
                    key={index}
                    onClick={() => {}}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: index % 2 === 0 ? "#F5F5F5" : "white",
                      "&:hover": {
                        backgroundColor: "#cadefa",
                      },
                    }}
                  >
                    <StyledTableCell sx={{ width: "5%" }}>{index + 1} </StyledTableCell>
                    <StyledTableCell sx={{ width: "20%" }}>
                      <RenderEllipsisText text={project?.name} tooltipPlacement="left" />
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "15%" }}>
                      {project?.partners &&
                        project.partners.map((partner) => {
                          const partnerName = `${partner.name ?? ""}`;
                          return getPartnerAvatar(partnerName, partner.image ?? null);
                        })}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "15%" }}>
                      <RenderEllipsisText text={getProjectSectorsTitle(project.sectors ?? [])} tooltipPlacement="top" />
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "15%" }}>{project.startDate}</StyledTableCell>
                    <StyledTableCell sx={{ width: "15%", paddingLeft: "0px", textAlign: "center" }}>
                      {project?.totalSum && `${project?.totalSum}`}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "15%", textAlign: "center" }}>{project.status}</StyledTableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {projectItemsPageTotal > 0 && (
        <Box sx={{ mt: 2 }}>
          <Pagination
            siblingCount={1}
            boundaryCount={2}
            page={projectsFilter?.page}
            count={projectItemsPageTotal}
            disabled={projectStore.loading}
            onChange={handleProcessItemsPageChange}
          />
        </Box>
      )}
    </Box>
  );
}
