import React from "react";
import { Grid, Typography, Card, CardContent } from "@mui/material";

const features = [
  {
    title: "Know Your Market Value",
    description: "Understand your current standing in the job market.",
  },
  {
    title: "Identify Skill Gaps",
    description: "Pinpoint areas where you need to upskill or reskill.",
  },
  {
    title: "Discover New Opportunities",
    description:
      "Explore career paths that align with your strengths and interests.",
  },
  {
    title: "Negotiate Better Offers",
    description:
      "Leverage your TRP rating to strengthen your negotiation position.",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {features.map((feature, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturesSection;
