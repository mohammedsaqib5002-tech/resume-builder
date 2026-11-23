import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import DescriptionIcon from "@mui/icons-material/Description";

function Header() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#222",
        borderBottom: "1px solid #eeeeee"
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          maxWidth: "1200px",
          width: "100%",
          mx: "auto"
        }}
      >
        <Box
          component="button"
          type="button"
          aria-label="Go to Home page"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            border: "none",
            background: "transparent",
            padding: 0,
            font: "inherit",
            textAlign: "left"
          }}
          onClick={() => navigate("/")}
        >
        
          <DescriptionIcon
            sx={{ color: "#2563eb", fontSize: 32 }}
          />

          <Typography variant="h5" fontWeight="bold">
            Resume<span style={{ color: "#2563eb" }}>Builder</span>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="primary"
            onClick={() => navigate("/")}
          >
            Home
          </Button>

          <Button
            color="primary"
            onClick={() => navigate("/about")}
          >
            About Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
