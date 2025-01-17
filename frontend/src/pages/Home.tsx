import React from "react";
import FeaturesSection from "../components/home/FeatureSection";

import HeroBanner from "../components/home/HeroBanner";
import Benifits from "../components/home/Benifits";
import Jobs from "../components/home/Jobs";

const Home: React.FC = () => {
  return (
    <>
      <HeroBanner />
      <FeaturesSection />
      <Benifits />
      <Jobs />
    </>
  );
};

export default Home;
