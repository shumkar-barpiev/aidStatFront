import React from "react";
import { Box, Card, Divider, Typography, Skeleton } from "@mui/material";

const ChartCardSkeleton: React.FC = () => {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 1, minHeight: 500 }}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton variant="text" width="20%" height={40} />
        </Box>
        <Divider sx={{ backgroundColor: "#666666", height: 2, mb: 4 }} />
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", height: "100%", width: "100%" }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: "70px",
                  height: "100%",
                  textAlign: "center",
                  margin: "0 5px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <Skeleton variant="rectangular" width="100%" height="80%" />
                <Skeleton variant="text" width="100%" height={20} />
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
          <Box>
            <Skeleton variant="rounded" width={120} height={40} />
            <Skeleton variant="rounded" width={120} height={40} sx={{ mt: 1 }} />
            <Typography width={120} height={40} sx={{ mt: 1, color: "#777777" }}>
              Нет данных
            </Typography>
          </Box>
          <Box>
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ChartCardSkeleton;
