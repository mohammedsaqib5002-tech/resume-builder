import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import DescriptionIcon from "@mui/icons-material/Description";

function TemplateCard({ template }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 15px rgba(0,0,0,0.07)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.13)"
        }
      }}
    >
      <Box
        sx={{
          height: 260,
          backgroundColor: template.color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          p: 3,
          "&:hover .use-button": {
            opacity: 1
          }
        }}
      >
        {/* Resume Preview */}
        <Box
          sx={{
            width: "70%",
            height: "220px",
            backgroundColor: "white",
            boxShadow: 3,
            p: 2,
            overflow: "hidden"
          }}
        >
          <Box
            sx={{
              backgroundColor: template.accent,
              height: 12,
              mb: 2,
              borderRadius: 1
            }}
          />

          <Typography fontWeight="bold" fontSize={13}>
            Your Name
          </Typography>

          <Typography fontSize={9} color="text.secondary">
            Professional Resume
          </Typography>

          <Box sx={{ mt: 2 }}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Box
                key={item}
                sx={{
                  height: 5,
                  width: item % 2 === 0 ? "75%" : "95%",
                  backgroundColor: "#dddddd",
                  mb: 1,
                  borderRadius: 1
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Hover Button */}
        <Button
          className="use-button"
          variant="contained"
          onClick={() =>
            navigate(`/details/${template.id}`)
          }
          sx={{
            position: "absolute",
            opacity: { xs: 1, md: 0 },
            transition: "0.3s",
            backgroundColor: "#2563eb",
            "&:hover": {
              backgroundColor: "#1d4ed8"
            }
          }}
        >
          Use Template
        </Button>
      </Box>

      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {template.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {template.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TemplateCard;
