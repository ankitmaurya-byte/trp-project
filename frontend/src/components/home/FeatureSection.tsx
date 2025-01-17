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
    <div className=" w-full h-[741px] flex flex-col justify-start items-start gap-10 mt-14 pt-[79px] px-10 bg-[#153d52] mx-auto">
      <div className="max-w-[1366px] w-full h-full m-auto">
        <div className="w-full text-center font-poppins text-3xl sm:text-4xl font-bold leading-[1.8] text-white mb-10">
          Why TRP Rating Matters
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="h-[201px] flex flex-col justify-start items-stretch gap-4 p-5 rounded-xl border border-[#375565]  text-white"
            >
              <div className="text-[40px] text-[#f9f9f9] text-start">
                {feature.icon}
              </div>
              <div className=" text-start text-lg font-semibold">
                {feature.title}
              </div>
              <div className="text-sm text-start">{feature.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
