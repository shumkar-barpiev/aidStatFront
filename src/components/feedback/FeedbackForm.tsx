"use client";

import React from "react";
import { Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Colors from "@/styles/colors";
import { FeedbackFormData, useFeedbackStore } from "@/stores/feedback/feedback";
import { useFeedbackViewModel } from "@/viewmodels/feedback/useFeedbackViewModel.ts";
import { useForm, Controller } from "react-hook-form";

const FeedbackForm = () => {
  const { requestTypes, createRequest } = useFeedbackStore();
  useFeedbackViewModel();
  const { i18n } = useTranslation();
  const locale = i18n.language.split("-")[0] as "ru" | "en" | "kg";

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    defaultValues: {
      name: "",
      contact: "",
      requestType: "",
      message: "",
    },
  });

  const onSubmit = async (data: FeedbackFormData) => {
    await createRequest(data);
    reset();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5, px: { xs: 0.5, md: 2 } }}>
      <Paper
        elevation={4}
        sx={{
          p: { xs: 1, sm: 3, md: 4 },
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Имя обязательно" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Имя"
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="contact"
            control={control}
            rules={{ required: "Контакт обязателен" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Ваши контактные данные (email или телефон)"
                margin="normal"
                error={!!errors.contact}
                helperText={errors.contact?.message}
              />
            )}
          />
          <Controller
            name="requestType"
            control={control}
            rules={{ required: "Тип обращения обязателен" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Тип обращения"
                margin="normal"
                error={!!errors.requestType}
                helperText={errors.requestType?.message}
              >
                {requestTypes?.map((type) => {
                  const localizedTitle = type[`title_${locale}`] || type.title;
                  return (
                    <MenuItem key={type.value} value={type.value}>
                      {localizedTitle}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />
          <Controller
            name="message"
            control={control}
            rules={{ required: "Сообщение обязательно" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Сообщение"
                multiline
                rows={5}
                margin="normal"
                error={!!errors.message}
                helperText={errors.message?.message}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, mx: "auto", display: "block" }}
          >
            Отправить
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FeedbackForm;
