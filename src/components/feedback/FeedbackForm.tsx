"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

import { useFeedbackViewModel } from "@/viewmodels/feedback/useFeedbackViewModel";
import { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import Colors from "@/styles/colors";

interface FeedbackForm {
  name: string;
  contact: string;
  requestType: string;
  message: string;
}

const LOCAL_STORAGE_KEY = "feedback_form";

const FeedbackForm = () => {
  const [state, setState] = useState<FeedbackForm>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : { name: "", contact: "", requestType: "", message: "" };
    } catch (e) {
      console.error("Ошибка при парсинге localStorage:", e);
      return { name: "", contact: "", requestType: "", message: "" };
    }
  });
  const { requestTypes, createRequest } = useFeedbackViewModel();
  const { i18n } = useTranslation();
  const locale = i18n.language.split("-")[0];
  console.log(locale);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setState((prev) => ({ ...prev, requestType: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: state.name,
      contact: state.contact,
      requestType: state.requestType,
      message: state.message,
    };
    await createRequest(payload);
    setState({ name: "", contact: "", requestType: "", message: "" });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5, px: { xs: 0.5, md: 2 } }}>
      <Paper
        elevation={4}
        sx={{
          p: {
            xs: 1,
            sm: 3,
            md: 4,
          },
          maxWidth: 600,
          width: "100%",
          borderRadius: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Box sx={{ mb: 4, textAlign: "center", color: Colors.darkBlue }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Обратная связь
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Пожалуйста, заполните форму для обратной связи.
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Ваше мнение очень важно для нас!
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Имя"
            name="name"
            value={state.name}
            onChange={handleFormChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Ваши контактные данные (email или телефон)"
            name="contact"
            value={state.contact}
            onChange={handleFormChange}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="request-type-label">Тип обращения</InputLabel>
            <Select
              labelId="request-type-label"
              name="requestType"
              value={state.requestType}
              onChange={handleSelectChange}
              label="Тип обращения"
            >
              {requestTypes.map((type) => {
                const localizedTitle = type[`title_${locale as "ru" | "en" | "kg"}`] || type.title;
                return (
                  <MenuItem key={type.value} value={type.value}>
                    {localizedTitle}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Сообщение"
            name="message"
            multiline
            rows={5}
            value={state.message}
            onChange={handleFormChange}
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              mx: "auto",
              display: "block",
            }}
          >
            Отправить
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FeedbackForm;
