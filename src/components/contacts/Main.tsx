"use client";

import React from "react";
import { Box, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import { containerMargins, containerWidths } from "@/utils/constants";
import Colors from "@/styles/colors";
import useContactsViewModel from "@/viewmodels/contacts/useContactsViewModel";
import { useContactsStore } from "@/stores/contacts/contacts";
import { formatPhoneNumber } from "@/utils/format/formatPhoneNumber";

const defaultImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/624px-No-Image-Placeholder.svg.png"; // Заглушка другого типа

const Main = () => {
  const { contacts, loading } = useContactsStore();
  useContactsViewModel();

  return (
    <Box sx={{ width: containerWidths, mx: containerMargins, p: 2 }}>
      <Box sx={{ color: Colors.darkBlue }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            textAlign: "center",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            maxWidth: { xs: "100%", md: "90%" },
            fontSize: { xs: "2rem", md: "3rem" },
            mt: 6,
            mb: 3,
            mx: "auto",
          }}
        >
          Контакты
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            py: 4,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {loading ? (
            <CircularProgress size="3rem" />
          ) : (
            contacts &&
            contacts.map((contact) => (
              <Card
                key={contact.name}
                sx={{
                  maxWidth: 545,
                  width: "100%",
                  mx: { xs: "auto", md: 0 },
                  borderRadius: 2,
                  marginBottom: 2,
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={contact.name}
                    image={contact.image ? `data:image/png;base64,${contact.image}` : defaultImage}
                    sx={{
                      width: "100%",
                      height: 300,
                      objectFit: "cover",
                      borderTopLeftRadius: 2,
                      borderTopRightRadius: 2,
                    }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ fontWeight: "bold", color: Colors.darkBlue }}
                    >
                      {contact.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#5c6f81", fontSize: "1.1rem", lineHeight: 2 }}>
                      {contact.address}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#5c6f81", fontSize: "0.875rem", lineHeight: 2 }}>
                      <strong>Телефон:</strong> {formatPhoneNumber(contact.phone)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#5c6f81", fontSize: "0.875rem", lineHeight: 2 }}>
                      <strong>Факс:</strong> {formatPhoneNumber(contact.fax)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#5c6f81", fontSize: "0.875rem", lineHeight: 2 }}>
                      <strong>Email:</strong> {contact.email}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
