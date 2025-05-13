"use client";

import {
  Visibility,
  VisibilityOff,
  LockOutlined as LockOutlinedIcon,
  PersonOutline as PersonOutlineIcon,
} from "@mui/icons-material";
import Colors from "@/styles/colors";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useAuthViewModel } from "@/viewmodels/auth/useAuthViewModel";
import { Box, Paper, Stack, Button, Divider, TextField, IconButton, Typography, InputAdornment } from "@mui/material";

const LoginPage = () => {
  const { t } = useTranslation();
  const [locked, setLocked] = useState(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const { authorize, authMessage, setAuthMessage } = useAuthViewModel();
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    setUsernameError(null);
    setPasswordError(null);

    if (!username) {
      setUsernameError(t("auth.usernameRequiredMessage"));
      isValid = false;
    }

    if (!password) {
      setPasswordError(t("auth.passwordRequiredMessage"));
      isValid = false;
    }

    if (isValid) {
      authorize({ username, password });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLocked((prev) => !prev);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (authMessage) {
      enqueueSnackbar(authMessage.message, { variant: authMessage.variant });
      setAuthMessage(null);
    }
  }, [authMessage]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100dvh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          mt: "10vh",
          width: { xs: "90%", sm: "90%", md: "100%" },
          maxWidth: 400,
          height: "fit-content",
          minHeight: "min-content",
          overflow: "visible",
          flexShrink: 0,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: 4,
          },
        }}
      >
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Box
            sx={{
              position: "relative",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "primary.main",
              borderRadius: "50%",
              p: 1,
            }}
          >
            <LockOutlinedIcon
              sx={{
                color: "white",
                fontSize: 24,
                position: "absolute",
                opacity: locked ? 1 : 0,
                transform: locked ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-45deg)",
                transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
              }}
            />
            <LockOpenIcon
              sx={{
                color: "white",
                fontSize: 24,
                position: "absolute",
                opacity: locked ? 0 : 1,
                transform: locked ? "scale(0.5) rotate(45deg)" : "scale(1) rotate(0deg)",
                transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
              }}
            />
          </Box>
          <Stack direction={"column"}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {t("auth.signIn")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("auth.signInDescription")}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 1.5, borderColor: Colors.darkBlue, borderBottomWidth: 2, width: 1 }} />

        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 16 }}>
          <TextField
            fullWidth
            label={t("auth.username")}
            variant="outlined"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!usernameError}
            helperText={usernameError}
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label={t("auth.password")}
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              marginTop: 1,
              py: 1.5,
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 2,
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            {t("auth.login")}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
