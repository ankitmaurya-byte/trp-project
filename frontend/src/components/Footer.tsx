import React from "react";
import logo from "../assets/trp_logo/logo-white.png";
import { ImLinkedin } from "react-icons/im";

const Footer: React.FC = () => {
  return (
    <footer className="w-screen h-[195px] bg-[#153d52] p-10 ">
      <div className="w-full flex justify-between items-center text-white">
        <img src={logo} alt="TRP Logo" className="w-20 h-auto" />

        <div className="flex gap-10">
          <button className="text-white">Home</button>
          <button className="text-white">TRP</button>
          <button className="text-white">Employers</button>
          <button className="text-white">Terms & Conditions</button>
          <button className="text-white">Privacy Policy</button>
        </div>

        <div className="text-white">
          <ImLinkedin size={24} />
        </div>
      </div>

      <div className="w-full my-4 ">
        <hr className="border-t border-gray-500" />
      </div>

      <div className="container mx-auto">
        <span className="w-full h-[25px] flex-grow-0  mt-5 opacity-80 font-poppins text-[14px] font-normal leading-[1.8] text-left text-white">
          © 2024 TheReadyPull. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
