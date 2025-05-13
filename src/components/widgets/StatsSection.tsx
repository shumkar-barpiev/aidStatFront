"use client";

import { Box, Container, Grid } from "@mui/material";
import { StatWidget } from "@/components/widgets/ProjectsCountWidget";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaidIcon from "@mui/icons-material/Paid";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { useEffect } from "react";
import { useTotalsStore } from "@/stores/totals/totals";
import { useTranslation } from "react-i18next";

export const StatsSection = () => {
  const { fetchTotals, projectCount, donorCount, totalAmount } = useTotalsStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchTotals();
  }, []);

  const projectIcon = <AssignmentIcon fontSize="large" color="primary" />;
  const partnerIcon = <HandshakeIcon fontSize="large" color="primary" />;
  const sumIcon = <PaidIcon fontSize="large" color="primary" />;

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <StatWidget
              content={projectIcon}
              label={t("widgets.totalProjectsCount")}
              value={projectCount ? projectCount : 0}
              duration={1000}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatWidget
              content={partnerIcon}
              label={t("widgets.totalPartnersCount")}
              value={donorCount ? donorCount : 0}
              duration={2500}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatWidget
              content={sumIcon}
              label={`${t("widgets.totalFundingSum")} ($)`}
              value={totalAmount ? totalAmount : 0}
              duration={3500}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
