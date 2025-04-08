import React from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Colors from "@/styles/colors.ts";
import { StyledTableCell, StyledTableHeadCell } from "@/components/other/StyledTableComponents.tsx";
import { RenderEllipsisText } from "@/utils/textUtils.tsx";
import ProjectBadges from "@/components/projects/ProjectBadges.tsx";
import { Base64Avatar } from "@/components/other/Base64Avatar.tsx";
import { useRouter } from "next/navigation";

const ContractsTable = () => {
  const router = useRouter();

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
              <StyledTableHeadCell sx={{ width: "20%", textAlign: "left", paddingLeft: "20px" }}>
                Наименование
              </StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "15%", textAlign: "left", paddingLeft: "20px" }}>
                Сумма KGS
              </StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "15%", textAlign: "left", paddingLeft: "20px" }}>
                Исполнитель
              </StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "15%", textAlign: "left", paddingLeft: "20px" }}>
                Проект
              </StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "15%", textAlign: "left", paddingLeft: "20px" }}>
                Донор
              </StyledTableHeadCell>
              <StyledTableHeadCell sx={{ width: "15%" }}>Статус</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*{projectStore.items?.length == 0 ? (*/}
            {/*  <TableRow>*/}
            {/*    <StyledTableCell align="center" sx={{ textAlign: "center" }} colSpan={7}>*/}
            {/*      {projectStore.loading && <CircularProgress />}*/}
            {/*      {!projectStore.loading && <Typography variant="body2">Нет данных</Typography>}*/}
            {/*    </StyledTableCell>*/}
            {/*  </TableRow>*/}
            {/*) : (*/}
            {/*  projectStore.items?.map((project, index) => {*/}
            {/*    return (*/}
            {/*      <TableRow*/}
            {/*        key={index}*/}
            {/*        onClick={() => {*/}
            {/*          router.push(`/projects/show/${project.name}#${project.id}`);*/}
            {/*        }}*/}
            {/*        sx={{*/}
            {/*          cursor: "pointer",*/}
            {/*          backgroundColor: index % 2 === 0 ? "#F5F5F5" : "white",*/}
            {/*          "&:hover": {*/}
            {/*            backgroundColor: "#cadefa",*/}
            {/*          },*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        <StyledTableCell sx={{ width: "5%" }}>{index + 1} </StyledTableCell>*/}
            {/*        <StyledTableCell sx={{ width: "20%" }}>*/}
            {/*          <RenderEllipsisText text={project?.name} tooltipPlacement="left" />*/}
            {/*        </StyledTableCell>*/}
            {/*        <StyledTableCell sx={{ width: "15%" }}>*/}
            {/*          <Stack direction={"row"} alignItems={"center"} spacing={1}>*/}
            {/*            {project?.partners &&*/}
            {/*              project.partners.map((partner) => {*/}
            {/*                const partnerName = `${partner.name ?? ""}`;*/}
            {/*                return getPartnerAvatar(partnerName, partner.image ?? null);*/}
            {/*              })}*/}
            {/*          </Stack>*/}
            {/*        </StyledTableCell>*/}
            {/*        <StyledTableCell sx={{ width: "15%" }}>*/}
            {/*          <RenderEllipsisText text={getProjectSectorsTitle(project.sectors ?? [])} tooltipPlacement="top" />*/}
            {/*        </StyledTableCell>*/}
            {/*        <StyledTableCell sx={{ width: "15%" }}>{project.startDate}</StyledTableCell>*/}
            {/*        <StyledTableCell sx={{ width: "15%", paddingLeft: "0px", textAlign: "center" }}>*/}
            {/*          {project?.totalSum && `${project?.totalSum}`}*/}
            {/*        </StyledTableCell>*/}
            {/*        <StyledTableCell sx={{ width: "15%", textAlign: "center" }}>*/}
            {/*          <ProjectBadges*/}
            {/*            status={project.status as "In progress" | "Completed" | "Not started" | "Canceled"}*/}
            {/*          />*/}
            {/*        </StyledTableCell>*/}
            {/*      </TableRow>*/}
            {/*    );*/}
            {/*  })*/}
            {/*)}*/}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ContractsTable;
