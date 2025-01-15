import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

interface JobCardProps {
  company: string;
  role: string;
  location: string;
  time: string;
}

const JobCard: React.FC<JobCardProps> = ({ company, role, location, time }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {company}
        </Typography>
        <Typography variant="body1">{role}</Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {time}
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary">
            Apply
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
