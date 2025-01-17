import React from "react";
import { IconType } from "react-icons";
import { AiFillAlipaySquare } from "react-icons/ai"; // Example icon
import { IoIosCopy } from "react-icons/io";
import trpScoreImage from "../../assets/frame-19.png";
type BenefitDetail = {
  icon: IconType;
  title: string;
  description: string;
};

const details: BenefitDetail[] = [
  {
    icon: AiFillAlipaySquare,
    title: "Personalized Insights",
    description:
      "Receive tailored recommendations based on your unique profile.",
  },
  {
    icon: AiFillAlipaySquare,
    title: "Personalized Insights",
    description:
      "Receive tailored recommendations based on your unique profile.",
  },
  {
    icon: AiFillAlipaySquare,
    title: "Personalized Insights",
    description:
      "Receive tailored recommendations based on your unique profile.",
  },
  {
    icon: AiFillAlipaySquare,
    title: "Personalized Insights",
    description:
      "Receive tailored recommendations based on your unique profile.",
  },
  // Additional details...
];

const Benefits = (props: {}) => {
  return (
    <div className="w-full h-full flex mx-auto justify-center ">
      <div className=" w-[50%] h-[693px]">
        <div className="ml-auto max-w-[683px] w-full h-full  flex flex-col justify-evenly items-center">
          <h1 className="text-[48px] font-bold text-[#153d52] leading-[1.5]">
            How TRP Benefits You
          </h1>
          <div className="flex flex-col items-stretch gap-10 px-5 w-full md:w-[562px]">
            {details.map((detail, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="flex ">
                  <detail.icon className="text-3xl text-[#153d52]" />
                  <h2 className="text-[20px] font-semibold leading-[1.7] text-[#153d52]">
                    {detail.title}
                  </h2>
                </div>

                <p className="text-[14px] leading-[1.7] text-[#153d52] text-left">
                  {detail.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-tl-lg w-[50%] h-[693px] flex-grow-0 ml-[81px] bg-gradient-to-b from-[#153d52] to-[#0077b4] pt-10 flex flex-col items-center justify-between">
        <div className="flex w-full items-center justify-between px-10">
          <button className="h-[48px] flex flex-row justify-start items-center gap-4  p-2 px-6 rounded-xl bg-white">
            <IoIosCopy />
            Resume
          </button>
          <h3 className="max-w-[242px] w-[242px] h-[129px] font-poppins text-[24px] mr-6 font-semibold leading-[1.8] text-left text-white">
            Increase chances to connect with Recruiters.
          </h3>{" "}
        </div>
        <div>
          <img
            src={trpScoreImage}
            alt=""
            className="w-[363px] h-[375px] mt-[149px] mx-[147px] ml-[173px] object-contain rounded-t-[15.7px] bg-white"
          />{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default Benefits;
