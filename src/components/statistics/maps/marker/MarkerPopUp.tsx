import React from "react";
import { Box, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CategoryIcon from "@mui/icons-material/Category";
import { PartnerForMap, ProjectForMap, Sector } from "@/types/types";
import { formatCurrency } from "@/utils/formatCurrency";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";

interface Props {
  project: ProjectForMap;
}

const ProjectPopup: React.FC<Props> = ({ project }) => {
  const totalSumFormatted = formatCurrency(project.totalSum);
  const startDateFormatted = new Date(project.startDate).toLocaleDateString("ru-RU");
  const endDateFormatted = new Date(project.endDate).toLocaleDateString("ru-RU");

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        {project.name}
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Grid container alignItems="flex-start">
        <Grid xs={5} display="flex" alignItems="center">
          <MonetizationOnIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="subtitle2" fontWeight="bold">
            Сумма:
          </Typography>
        </Grid>
        <Grid xs={7}>
          <Typography variant="subtitle2">${totalSumFormatted}</Typography>
        </Grid>
      </Grid>

      <Grid container alignItems="flex-start" mt={1}>
        <Grid xs={5} display="flex" alignItems="center">
          <PeopleIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="subtitle2" fontWeight="bold">
            Доноры:
          </Typography>
        </Grid>
        <Grid xs={7}>
          {project.partners?.length ? (
            <List dense disablePadding>
              {project.partners.map((p: PartnerForMap) => (
                <ListItem key={p.id} disableGutters sx={{ py: 0 }}>
                  <ListItemText primaryTypographyProps={{ variant: "subtitle2" }} primary={p.name} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="subtitle2">Партнёр не указан</Typography>
          )}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-start" mt={1}>
        <Grid xs={5} display="flex" alignItems="center">
          <CategoryIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="subtitle2" fontWeight="bold">
            Сектора:
          </Typography>
        </Grid>
        <Grid xs={7}>
          {project.sectors?.length ? (
            <List dense disablePadding>
              {project.sectors.map((s: Sector) => (
                <ListItem key={s.id} disableGutters sx={{ py: 0 }}>
                  <ListItemText primaryTypographyProps={{ variant: "subtitle2" }} primary={s.name} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="subtitle2">N/A</Typography>
          )}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-start" mt={1}>
        <Grid xs={5} display="flex" alignItems="center">
          <CalendarMonthIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="subtitle2" fontWeight="bold">
            Начало:
          </Typography>
        </Grid>
        <Grid xs={7}>
          <Typography variant="subtitle2">{startDateFormatted || "N/A"}</Typography>
        </Grid>
      </Grid>

      <Grid container alignItems="flex-start" mt={1}>
        <Grid xs={5} display="flex" alignItems="center">
          <CalendarMonthIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="subtitle2" fontWeight="bold">
            Окончание:
          </Typography>
        </Grid>
        <Grid xs={7}>
          <Typography variant="subtitle2">{endDateFormatted || "N/A"}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectPopup;
