"use client";

import React from "react";
import {
  Box,
  Table,
  Paper,
  Stack,
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
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { projectFormatDate } from "@/utils/date";
import { RenderEllipsisText } from "@/utils/textUtils";
import { useProjectsStore } from "@/stores/projects/projects";
import ProjectBadges from "@/components/projects/ProjectBadges";
import { formatCurrencyWithSpaces } from "@/utils/formatCurrency";
import { plainBtnStyle } from "@/components/navigation-bar/NavigationBar";
import { NotSpecifiedText } from "@/components/projects/show/ShowProject";
import { useProjectsViewModel } from "@/viewmodels/projects/useProjectsViewModel";
import { StyledTableCell, StyledTableHeadCell } from "@/components/other/StyledTableComponents";
import { transliterate } from "@/utils/format/transliterate.ts";
import { apiUrl } from "@/utils/constants.ts";

export default function ProjectsTable() {
  const router = useRouter();
  const { t } = useTranslation();
  const projectStore = useProjectsStore();
  const { projectsFilter, getProjectSectorsTitle, handleProjectsPageChange } = useProjectsViewModel();

  return (
    <Box>
      <TableContainer component={Paper} sx={{ height: "100%" }}>
        <Table stickyHeader aria-label="sticky table" sx={{ tableLayout: "fixed", minWidth: 950 }}>
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
              <StyledTableHeadCell sx={{ width: "20%", textAlign: "left", paddingLeft: "20px" }}>
                Название
              </StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "20%", textAlign: "left", paddingLeft: "20px" }}>
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
            {projectStore.items?.length == 0 ? (
              <TableRow>
                <StyledTableCell align="center" sx={{ textAlign: "center" }} colSpan={7}>
                  {projectStore.loading && <CircularProgress />}
                  {!projectStore.loading && <Typography variant="body2">Нет данных</Typography>}
                </StyledTableCell>
              </TableRow>
            ) : (
              projectStore.items?.map((project, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#F5F5F5" : "white",
                    }}
                  >
                    <StyledTableCell sx={{ width: "20%", whiteSpace: "initial" }}>
                      <button
                        onClick={() => {
                          router.push(`/projects/show/${transliterate(project.name)}#${project.id}`);
                        }}
                        style={plainBtnStyle}
                      >
                        <Typography
                          variant="h3"
                          sx={{
                            textAlign: "left",
                            fontWeight: 550,
                            fontSize: "0.85rem",
                            "&:hover": {
                              color: "#2E4B6D",
                              transition: "color 0.3s ease",
                            },
                          }}
                        >
                          {project?.name}
                        </Typography>
                      </button>
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "20%" }}>
                      <Stack direction={"row"} alignItems={"center"} spacing={1}>
                        {project?.partners ? (
                          project.partners.map((partner, index) => {
                            const partnerName = `${partner.name ?? ""}`;
                            return (
                              <button
                                key={index}
                                onClick={() => {
                                  router.push(`/partners/show/${transliterate(partnerName)}#${partner.id}`);
                                }}
                                style={plainBtnStyle}
                              >
                                <Tooltip title={`${partner.name}`}>
                                  <Avatar
                                    src={`${apiUrl}/aidstat/ws/public/file/meta/download/${partner.image}`}
                                    alt={partnerName}
                                    sx={{
                                      width: 40,
                                      height: 40,
                                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.45)",
                                      "& .MuiAvatar-img": {
                                        objectFit: "contain",
                                      },
                                    }}
                                  />
                                </Tooltip>
                              </button>
                            );
                          })
                        ) : (
                          <NotSpecifiedText />
                        )}
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "15%" }}>
                      {project.sectors ? (
                        <RenderEllipsisText
                          text={getProjectSectorsTitle(project.sectors ?? [])}
                          tooltipPlacement="top"
                        />
                      ) : (
                        <NotSpecifiedText />
                      )}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "15%" }}>
                      {project.startDate ? projectFormatDate(`${project.startDate}`) : <NotSpecifiedText />}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "15%", paddingLeft: "0px", textAlign: "center" }}>
                      {project?.totalSum ? formatCurrencyWithSpaces(`${project?.totalSum}`) : <NotSpecifiedText />}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "15%", textAlign: "center" }}>
                      {project.status ? (
                        <ProjectBadges
                          status={project.status as "In progress" | "Completed" | "Not started" | "Canceled"}
                        />
                      ) : (
                        <NotSpecifiedText />
                      )}
                    </StyledTableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {(projectStore.pageTotal ?? 0) > 0 && (
        <Box sx={{ mt: 2 }}>
          <Pagination
            siblingCount={1}
            boundaryCount={2}
            page={projectsFilter?.page}
            disabled={projectStore.loading}
            count={projectStore.pageTotal ?? 1}
            onChange={handleProjectsPageChange}
          />
        </Box>
      )}
    </Box>
  );
}
