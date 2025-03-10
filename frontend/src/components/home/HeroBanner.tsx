import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import netflix from "../../assets/Netflix_Logo_RGB.png";
import youtube from "../../assets/youtube.png";

type Props = {};

const HeroBanner: React.FC<Props> = () => {
  const [location, setLocation] = useState("");
  const [tittle, setTittle] = useState("");
  return (
    <>
      {/* Title */}
      <h3 className="font-poppins text-5xl font-bold text-[#153d52] leading-[1.5] w-[799px] h-[72px] mx-auto mt-24 pt-0 mb-5">
        Your Passport to Career Success
      </h3>

      {/* Subtitle */}
      <p className="font-poppins text-lg text-[#153d52] w-[796px] h-[62px] mx-auto leading-[1.7] text-center mb-14">
        TRP is a revolutionary tool designed to empower job seekers like you. By
        analyzing real-time market data, it provides personalized insights into
        your career potential.
      </p>

      {/* Job Search Section */}
      <div className="w-[990px] mx-auto h-[262px] flex flex-col justify-center items-center gap-12 p-8 rounded-2xl shadow-[0_0_7px_0_rgba(0,0,0,0.1)] bg-white mb-20">
        {/* Heading */}
        <div className="h-[86px] self-stretch flex-grow-0 flex flex-col justify-start items-center gap-3 p-0">
          <h5 className="font-poppins text-[28px] font-bold text-[#153d52] leading-[1.8] w-[355px] h-[50px]">
            Find your job with us!
          </h5>

          <p className="font-poppins text-sm text-[#153d52] leading-[1.7] w-[615px] h-[24px]">
            Unlock career opportunities with TRP Jobs. Take control of your
            career with a single click!
          </p>
        </div>
        {/* Search Form */}
        <div className="flex w-[926px] h-[70px] gap-4 justify-between items-center ">
          {/* Job Title Input */}
          <div className="w-[420px] h-[24px] font-poppins text-sm font-normal leading-[1.7] text-left text-[#153d52]">
            <div className="w-[211px] h-[24px] font-poppins text-sm font-normal leading-[1.7] text-left text-[#153d52]">
              Enter job title, skills, industry...
            </div>{" "}
            <input
              type="text"
              value={tittle}
              onChange={(e) => setTittle(e.currentTarget.value)}
              placeholder="Eg: UI/UX Designer, Figma etc"
              className="w-full h-[24px] font-poppins text-sm font-normal leading-[1.7] text-left text-[#153d52] bg-white outline-none border-b border-gray-300"
            />
          </div>
          <div className="w-[420px] h-[24px] font-poppins text-sm font-normal leading-[1.7] text-left text-[#153d52]">
            <div className="w-[205px] h-[24px] font-poppins text-sm font-normal leading-[1.7] text-left text-[#153d52]">
              Location
            </div>{" "}
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.currentTarget.value)}
              placeholder="Eg: Mumbai, Delhi etc"
              className="w-full h-[24px] font-poppins text-sm font-normal leading-[1.7] text-left text-[#153d52] bg-white outline-none border-b border-gray-300"
            />
          </div>

          {/* Search Button */}
          <div className="col-span-1">
            <button className="w-[54px] h-[76px] flex flex-col justify-center text-white items-start gap-1 py-3 px-5 rounded-lg bg-[#0077b4]">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* Trusted Companies */}
      <div className="w-[1113px] h-[99px] flex flex-col justify-start items-center gap-8 p-0 mx-auto">
        <h3 className=" h-[41px] flex-grow-0 font-poppins text-2xl font-bold leading-[1.7] text-left text-[#153d52]">
          Trusted by 200+ companies including
        </h3>
        <div className="logos-container w-[81.48%] max-w-[1113px] h-[26px] flex flex-row justify-start items-center gap-[62px] p-0  overflow-hidden [animation:slide-left_15s_linear_infinite] [&_img]:[animation:slide-left_15s_linear_infinite] mx-auto">
          {/* Replace with logo images */}
          <img src={netflix} alt="Amazon" className="max-w-[100px]" />
          <img src={youtube} alt="Netflix" className="max-w-[100px]" />
          <img src={netflix} alt="Meta" className="max-w-[100px]" />
          <img src={youtube} alt="Google" className="max-w-[100px]" />
          <img src={netflix} alt="Google" className="max-w-[100px]" />
          <img src={youtube} alt="Google" className="max-w-[100px]" />
          <img src={netflix} alt="Google" className="max-w-[100px]" />

          {/* Duplicating the same logos to create the seamless loop effect */}
          <img src={youtube} alt="Amazon" className="max-w-[100px]" />
          <img src={netflix} alt="Netflix" className="max-w-[100px]" />
          <img src={youtube} alt="Meta" className="max-w-[100px]" />
          <img src={netflix} alt="Google" className="max-w-[100px]" />
          <img src={youtube} alt="Google" className="max-w-[100px]" />
          <img src={netflix} alt="Google" className="max-w-[100px]" />
          <img src={youtube} alt="Google" className="max-w-[100px]" />
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
