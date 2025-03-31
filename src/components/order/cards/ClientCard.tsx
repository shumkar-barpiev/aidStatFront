"use client";
import * as React from "react";
import { Card, FormControl, Typography, Box, Chip, TextField } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    fontSize: "0.6964285714285714rem",
    lineHeight: "1.5",
    maxWidth: "200px",
    fontWeight: "bold",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "transparent",
  },
});

export function ClientCard() {
  return (
    <FormControl>
      <Card sx={{ padding: 1, minWidth: 400 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center" }} gap={1}>
            <StyledTextField
              size="small"
              variant="standard"
              placeholder="Клиент"
              defaultValue="Смаилова Нурай"
              inputProps={{
                style: {
                  fontSize: "1.3928571428571428rem",
                },
              }}
            />

            <Chip label="К оплате" sx={{ height: 23 }} color="primary" />
          </Box>

          <Typography sx={{ color: "secondary", fontWeight: "bold" }}>№20213</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }} gap={1}>
          <StyledTextField
            size="small"
            variant="standard"
            placeholder="Номер телефона"
            defaultValue="+996(554)-123-456"
          />
          <StyledTextField size="small" variant="standard" placeholder="E-mail" defaultValue="smailovaex@gmail.com" />
          <StyledTextField size="small" variant="standard" placeholder="Дата рождения" defaultValue="01.01.1990" />
        </Box>
      </Card>
    </FormControl>
  );
}
