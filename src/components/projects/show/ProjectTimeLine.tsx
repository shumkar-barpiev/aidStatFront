import * as React from "react";

import Timeline from "@mui/lab/Timeline";
import TimelineDot from "@mui/lab/TimelineDot";
import { Box, Typography } from "@mui/material";
import TimelineItem from "@mui/lab/TimelineItem";
import { projectFormatDate } from "@/utils/date";
import TimelineContent from "@mui/lab/TimelineContent";
import EventNoteIcon from "@mui/icons-material/EventNote";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import { TProjectModel } from "@/models/project/ProjectModel";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

export default function ProjectTimeLine({ project }: { project: TProjectModel | null }) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <EventNoteIcon color="primary" fontSize="large" />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Хронология проекта
        </Typography>
      </Box>
      <Timeline position="alternate">
        {project?.timeLine?.startDate && (
          <TimelineItem>
            <TimelineOppositeContent sx={{ m: "auto 0" }} align="right" variant="body2" color="text.secondary">
              {project?.timeLine?.startDate && projectFormatDate(project?.timeLine?.startDate)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary"></TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ m: "auto 0" }}>
              <Typography variant="h6" component="span">
                Дата начала
              </Typography>
            </TimelineContent>
          </TimelineItem>
        )}

        {project?.timeLine?.events &&
          project.timeLine.events.map((event: Record<string, any>, index: number) => {
            return (
              event.name &&
              event.eventDate && (
                <TimelineItem key={index}>
                  <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
                    {projectFormatDate(event.eventDate)}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary"></TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ m: "auto 0" }}>
                    <Typography variant="h6" component="span">
                      {event.name}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              )
            );
          })}

        {project?.timeLine?.endDate && (
          <TimelineItem>
            <TimelineOppositeContent sx={{ m: "auto 0" }} align="right" variant="body2" color="text.secondary">
              {project?.timeLine?.endDate && projectFormatDate(project?.timeLine?.endDate)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary"></TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ m: "auto 0" }}>
              <Typography variant="h6" component="span">
                Дата окончания
              </Typography>
            </TimelineContent>
          </TimelineItem>
        )}
      </Timeline>
    </Box>
  );
}
