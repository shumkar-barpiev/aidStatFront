import {
  Visibility,
  VisibilityOff,
  LockOutlined as LockOutlinedIcon,
  EmailOutlined as EmailOutlinedIcon,
} from "@mui/icons-material";
import Colors from "@/styles/colors";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Box, Paper, Stack, Button, Divider, TextField, IconButton, Typography, InputAdornment } from "@mui/material";

const LoginPage = () => {
  const { t } = useTranslation();
  const [locked, setLocked] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    setEmailError(null);
    setPasswordError(null);

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (isValid) {
      console.log("Logged in with:", { email, password });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLocked((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "90vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          mt: "10vh",
          width: { xs: "90%", sm: "90%", md: "100%" },
          maxWidth: 400,
          maxHeight: { xs: "360px", sm: "350px" },
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
              {t("signIn")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("signInDescription")}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 1.5, borderColor: Colors.darkBlue, borderBottomWidth: 2, width: 1 }} />

        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 16 }}>
          <TextField
            fullWidth
            label={t("email")}
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label={t("password")}
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
            {t("login")}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
