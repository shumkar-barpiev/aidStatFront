"use client";
import { Box, Card } from "@mui/material";
import { SuggestionList } from "@/components/order/cards/SuggestionList";
import { TaskListCard } from "@/components/order/cards/TaskListCard";
import { ClientPreferenceCard } from "@/components/order/cards/ClientPreferenceCard";
import { ClientCard } from "@/components/order/cards/ClientCard";

export default function ActionCard() {
  return (
    <Box display="flex" flexDirection="column" gap={1} width={500}>
      <ClientCard />
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
        }}
      >
        <SuggestionList />
        <TaskListCard />
        <ClientPreferenceCard />
      </Card>
    </Box>
  );
}
