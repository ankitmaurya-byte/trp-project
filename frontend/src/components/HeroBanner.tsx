import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";

type Props = {};

const HeroBanner: React.FC<Props> = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "831px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "linear-gradient(to bottom, rgba(255, 255, 255, 0) 12%, rgba(0, 119, 180, 0.06) 79%)",
        padding: "100px 0",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Poppins",
          fontSize: "2.5rem",
          fontWeight: "bold",
          lineHeight: 1.5,
          color: "#153d52",
          maxWidth: "800px",
          marginBottom: "16px",
        }}
      >
        Your Passport to Career Success
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.1rem",
          color: "#444",
          maxWidth: "600px",
          margin: "0 auto 32px",
        }}
      >
        TRP is a revolutionary tool designed to empower job seekers like you. By
        analyzing real-time market data, it provides personalized insights into
        your career potential.
      </Typography>

      {/* Job Search Section */}
      <Container
        sx={{
          maxWidth: "900px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          padding: "32px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Heading */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          Find your job with us!
        </Typography>

        <Typography
          variant="body2"
          sx={{
            marginBottom: "24px",
          }}
        >
          Unlock career opportunities with TRP Jobs. Take control of your career
          with a single click!
        </Typography>

        {/* Search Form */}
        <Grid container spacing={2}>
          {/* Job Title Input */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Enter job title, skills, industry ..."
            />
          </Grid>

          {/* Location Input */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Location (e.g., Mumbai, Delhi, etc.)"
            />
          </Grid>

          {/* Search Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#0077b5",
                color: "#fff",
                fontWeight: "bold",
                padding: "12px 16px",
                "&:hover": {
                  backgroundColor: "#005a87",
                },
              }}
            >
              Search Jobs
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Trusted Companies */}
      <Box
        sx={{
          marginTop: "48px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#153d52",
          }}
        >
          Trusted by 200+ companies including
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {/* Replace with logo images */}
          <Grid item>
            <img
              src="/assets/amazon-logo.png"
              alt="Amazon"
              style={{ maxWidth: "100px" }}
            />
          </Grid>
          <Grid item>
            <img
              src="/assets/netflix-logo.png"
              alt="Netflix"
              style={{ maxWidth: "100px" }}
            />
          </Grid>
          <Grid item>
            <img
              src="/assets/meta-logo.png"
              alt="Meta"
              style={{ maxWidth: "100px" }}
            />
          </Grid>
          <Grid item>
            <img
              src="/assets/google-logo.png"
              alt="Google"
              style={{ maxWidth: "100px" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HeroBanner;
