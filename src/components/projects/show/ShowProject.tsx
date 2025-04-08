"use client";

import Colors from "@/styles/colors";
import {
  Map as CoverageIcon,
  Business as AgencyIcon,
  Category as SectorsIcon,
  Diversity3Outlined as PartnersIcon,
  Engineering as ImplementingIcon,
  AssignmentOutlined as DescriptionIcon,
  CurrencyExchangeRounded as FundingIcon,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { TProjectModel } from "@/models/project/ProjectModel";
import { useProjectsStore } from "@/stores/projects/projects";
import { Box, Typography, Grid, Divider } from "@mui/material";
import ProjectTimeLine from "@/components/projects/show/ProjectTimeLine";

export const ShowProject = () => {
  const projectsStore = useProjectsStore();
  const [project, setProject] = useState<TProjectModel | null>(null);

  useEffect(() => {
    setProject(projectsStore.item);
  }, [projectsStore.item]);

  return (
    <Box sx={{ py: 3 }}>
      <Box>
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <DescriptionIcon color="primary" fontSize="large" />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Описание проекта
            </Typography>
          </Box>
          <Box component="ul" sx={{ pl: 2.5, listStyleType: "none" }}>
            <Box component="li" sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
              <Typography sx={{ mb: 1 }} variant="subtitle1">
                {project?.description}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <FundingIcon color="primary" fontSize="large" />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Общая сумма финансирования
                  </Typography>
                </Box>
                <Typography sx={{ mb: 1 }}>
                  <strong>Общий бюджет:</strong> 5 000 000,00 USD
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Фактически освоено:</strong> 3 750 000,00 USD (75%)
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Источник:</strong> Международный банк реконструкции и развития
                </Typography>
                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <AgencyIcon color="primary" fontSize="large" />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Исполнительное агентство
                  </Typography>
                </Box>
                <Typography sx={{ mb: 1 }}>
                  <strong>Название:</strong> Министерство Энергетики Кыргызской Республики
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Куратор проекта:</strong> Азимов А.К.
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Контакт:</strong> +996 312 123 456, energy@gov.kg
                </Typography>
                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <SectorsIcon color="primary" fontSize="large" />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Секторы
                  </Typography>
                </Box>
                <Typography sx={{ mb: 1 }}>
                  <strong>Основной сектор:</strong> Гидроэнергетика
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Дополнительные секторы:</strong>
                </Typography>
                <Box component="ul" sx={{ pl: 2.5 }}>
                  <Box component="li">
                    <Typography>Экологическая безопасность</Typography>
                  </Box>
                  <Box component="li">
                    <Typography>Развитие инфраструктуры</Typography>
                  </Box>
                  <Box component="li">
                    <Typography>Создание рабочих мест</Typography>
                  </Box>
                </Box>
                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <PartnersIcon color="primary" fontSize="large" />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Партнеры
                  </Typography>
                </Box>
                <Typography sx={{ mb: 1 }}>
                  <strong>Финансовый партнер:</strong> Международная ассоциация развития (MAP)
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Технический партнер:</strong> Siemens Energy
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Локальный партнер:</strong> ОАО &quot;Электрические станции&quot;
                </Typography>
                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <ImplementingIcon color="primary" fontSize="large" />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Реализующее агентство
                  </Typography>
                </Box>
                <Typography sx={{ mb: 1 }}>
                  <strong>Подрядчик:</strong> ТОО &quot;КыргызГидроСтрой&quot;
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Срок контракта:</strong> 2022-2025 гг.
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Ответственный инженер:</strong> Петров В.И.
                </Typography>
                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <CoverageIcon color="primary" fontSize="large" />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Географический охват
                  </Typography>
                </Box>
                <Typography sx={{ mb: 1 }}>
                  <strong>Основная локация:</strong> Жалал-Абадская область
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Затронутые районы:</strong>
                </Typography>
                <Box component="ul" sx={{ pl: 2.5 }}>
                  <Box component="li">
                    <Typography>Токтогульский район</Typography>
                  </Box>
                  <Box component="li">
                    <Typography>Ала-Букинский район</Typography>
                  </Box>
                  <Box component="li">
                    <Typography>город Кербен</Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <ProjectTimeLine />
    </Box>
  );
};
