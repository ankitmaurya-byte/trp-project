import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "#f5f5f5", py: 2 }}>
      <Container>
        <Typography variant="body2" align="center">
          © 2024 TheReadyPull. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
