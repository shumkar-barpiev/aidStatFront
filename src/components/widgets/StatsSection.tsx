'use client'

import { Grid, Box, Container, SvgIcon } from "@mui/material";
import { StatWidget } from "@/components/widgets/ProjectsCountWidget";
import { usePartnersViewModel } from "@/viewmodels/partners/usePartnersViewModel";
import { useProjectsStore } from "@/stores/projects/projects";
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaidIcon from '@mui/icons-material/Paid';
import HandshakeIcon from '@mui/icons-material/Handshake';

export const StatsSection = () => {
  const { allPartners } = usePartnersViewModel();
  const { total } = useProjectsStore();

  const projectIcon = (
    <AssignmentIcon fontSize="large" color="primary" />
  );
  const partnerIcon = (
    <HandshakeIcon fontSize="large" color="primary" />
  );
  const sumIcon = (
    <PaidIcon fontSize="large" color="primary" />
  );

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <StatWidget content={projectIcon} label="Общее количество проектов" value={total ? total : 0} duration={1000} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatWidget content={partnerIcon} label="Количество партнеров" value={allPartners.length} duration={2500} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatWidget content={sumIcon} label="Привлеченные инвестиции ($)" value={54000000} duration={3500} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};