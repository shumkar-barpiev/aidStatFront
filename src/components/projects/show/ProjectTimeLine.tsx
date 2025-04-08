import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import {
  Assignment as PlanningIcon,
  Engineering as ConstructionIcon,
  CheckCircle as CompletionIcon,
  Assessment as ReviewIcon,
  EmojiEvents as MilestoneIcon,
} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

export default function ProjectTimeLine() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent sx={{ m: "auto 0" }} align="right" variant="body2" color="text.secondary">
          1 квартал 2023
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <PlanningIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Инициация проекта
          </Typography>
          <Typography>
            - Завершены технико-экономические исследования
            <br />
            - Проведена оценка экологического воздействия
            <br />- Обеспечено первоначальное финансирование
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
          2-3 кварталы 2023
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <ConstructionIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Строительный этап 1
          </Typography>
          <Typography>
            Подготовка строительной площадки -
            <br />
            Фундаментные работы -
            <br />
            Возведение основных конструкций -
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            <MilestoneIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Ключевой этап завершен
          </Typography>
          <Typography>
            - Завершено 50% строительства
            <br />
            - Получена награда за безопасность
            <br />- Проект в рамках графика и бюджета
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
          4 квартал 2023 - 1 квартал 2024
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          <TimelineDot color="secondary">
            <CompletionIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Завершение строительства
          </Typography>
          <Typography>
            Установка инженерных систем -
            <br />
            Отделочные работы -
            <br />
            Финальные проверки -
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
          2 квартал 2024
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <ReviewIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Подведение итогов
          </Typography>
          <Typography>
            - Оценка эффективности проекта
            <br />
            - Документирование извлеченных уроков
            <br />- Подготовка итогового отчета
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
