import React from "react";
import { TbBriefcase2, TbTargetArrow } from "react-icons/tb";
import { FaSearch, FaHandshake } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";

const features = [
  {
    icon: <TbBriefcase2 />,
    title: "Know Your Market Value",
    description: "Understand your current standing in the job market.",
  },
  {
    icon: <IoBookOutline />,
    title: "Identify Skill Gaps",
    description: "Pinpoint areas where you need to upskill or reskill.",
  },
  {
    icon: <FaSearch />,
    title: "Discover New Opportunities",
    description:
      "Explore career paths that align with your strengths and interests.",
  },
  {
    icon: <TbTargetArrow />,
    title: "Optimize Your Job Search",
    description: "Target relevant job openings and tailor your applications.",
  },
  {
    icon: <FaHandshake />,
    title: "Negotiate Better Offers",
    description:
      "Leverage your TRP rating to strengthen your negotiation position.",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "10px",
        padding: "10% 5%",
        backgroundColor: "#153d52",
      }}
    >
      <div
        style={{
          width: "100%",
          textAlign: "center",
          fontFamily: "Poppins",
          fontSize: "2.5rem",
          fontWeight: "bold",
          lineHeight: 1.8,
          color: "#fff",
          marginBottom: "40px",
        }}
      >
        Why TRP Rating Matters
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "20px",
          width: "100%",
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              maxWidth: "350px",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "16px",
              padding: "20px",
              borderRadius: "12px",
              border: "solid 1px #375565",
              backgroundColor: "#1d5f6e",
              color: "#fff",
            }}
          >
            <div
              style={{
                fontSize: "40px",
                color: "#f9f9f9",
              }}
            >
              {feature.icon}
            </div>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {feature.title}
            </div>
            <div
              style={{
                fontSize: "1rem",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              {feature.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
