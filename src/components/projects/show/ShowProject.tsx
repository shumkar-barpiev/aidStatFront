"use client";

import React from "react";
import { Box, Typography, Grid, Divider, Breadcrumbs, Link } from "@mui/material";
import { TProjectModel } from "@/models/project/ProjectModel";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Colors from "@/styles/colors";

interface ShowProjectProps {
  project: TProjectModel | null;
}

export const ShowProject: React.FC<ShowProjectProps> = ({ project }) => {
  return (
    <Box>
      <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: 4,
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          {project?.name}
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Цель проекта
          </Typography>
          <Box component="ul" sx={{ pl: 2.5, listStyleType: "none" }}>
            <Box component="li" sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
              <Box component="span" sx={{ mr: 1 }}>
                The main purpose of project
              </Box>
            </Box>
          </Box>
          <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Общая сумма финансирования
                </Typography>
                <Typography sx={{ mb: 1 }}>5 000 000,00 USD</Typography>
                <Typography sx={{ mb: 1 }}>5 000 000,00 USD</Typography>
                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Исполнительное агентство
                </Typography>
                <Typography sx={{ mb: 1 }}>Министерство Энергетики Кыргызской Республики</Typography>
                <Typography sx={{ mb: 1 }}>ИНН: 18</Typography>
                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Секторы
                </Typography>
                <Typography sx={{ mb: 1 }}>Министерство Энергетики Кыргызской Республики</Typography>
                <Typography sx={{ mb: 1 }}>ИНН: 18</Typography>
                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Партнеры
                </Typography>
                <Typography sx={{ mb: 1 }}>Международная ассоциация развития (MAP)</Typography>
                <Typography sx={{ mb: 1 }}>ИНН: 21</Typography>
                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Реализующее агентство
                </Typography>
                <Typography sx={{ mb: 1 }}>Министерство Энергетики Кыргызской Республики</Typography>
                <Typography sx={{ mb: 1 }}>ИНН: 18</Typography>
                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Географический охват
                </Typography>
                <Typography sx={{ mb: 1 }}> Жалал абад</Typography>
                <Typography sx={{ mb: 1 }}> --</Typography>
                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
