import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TRP
        </Typography>
        <Box>
          <Button color="inherit">TRP</Button>
          <Button color="inherit">Jobs</Button>
          <Button color="inherit">Employers</Button>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Sign In
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>{" "}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
