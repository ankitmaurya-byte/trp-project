import React from "react";
import JobCard from "../components/JobCard";
import FeaturesSection from "../components/home/FeatureSection";
import { Box, Typography, Grid, Container } from "@mui/material";
import HeroBanner from "../components/home/HeroBanner";
import Benifits from "../components/home/Benifits";

const Home: React.FC = () => {
  return (
    <>
      <HeroBanner />
      <FeaturesSection />
      <Benifits />
    </>
  );
};

export default Home;
