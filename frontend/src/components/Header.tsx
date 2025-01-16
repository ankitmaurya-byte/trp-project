import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/trp_logo/logo-white@3x.png";
import { HiMenu } from "react-icons/hi"; // Using react-icons for the menu icon

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle Menu for small screens
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-screen  h-[75px] fixed left-0 top-0 bg-white mx-auto">
      <div className="h-full px-6 py-5 flex justify-between items-center ">
        {/* Logo */}
        <div>
          <img src={logo} alt="TRP Logo" className="w-16 h-16" />
        </div>

        {/* Navigation and Buttons */}
        <nav className="  h-[35px]  flex justify-between items-center gap-12 ">
          {/* Nav buttons */}
          <button
            onClick={() => navigate("/")}
            className="w-[34px] h-[21px] flex-grow-0 opacity-80 font-poppins text-[14px] font-medium text-[#153d52] text-center"
          >
            TRP
          </button>
          <button
            onClick={() => navigate("/jobs")}
            className="w-[34px] h-[21px] flex-grow-0 opacity-80 font-poppins text-[14px] font-medium text-[#153d52] text-center"
          >
            Jobs
          </button>
          <button
            onClick={() => navigate("/employers")}
            className="w-[34px] h-[21px] flex-grow-0 opacity-80 font-poppins text-[14px] font-medium text-[#153d52] text-center"
          >
            Employers
          </button>
          {/* Auth Buttons */}
          <div className="w-64 h-[35px] flex flex-row justify-around items-center gap-[20px] p-0">
            <button
              className="w-[104px] h-[35px] flex flex-row justify-center items-center gap-[10px] px-[23px]  rounded-[8px] border border-[rgba(21,61,82,0.2)] bg-white"
              onClick={() => navigate("/login")}
            >
              <span className=" h-[21px] font-poppins text-[14px] font-medium text-[#153d52] text-center">
                Sign in
              </span>
            </button>
            <button
              className="w-[104px] h-[35px] flex flex-row justify-center items-center gap-[10px] px-[23px]  rounded-[8px] border border-[#0077b4] bg-[#0077b4]"
              onClick={() => navigate("/register")}
            >
              <span className="font-poppins text-[14px] font-medium text-white text-center">
                Sign Up
              </span>{" "}
            </button>
          </div>
        </nav>

        {/* Menu Button for small screens */}
        <button
          className="sm:hidden text-[#153d52] p-2"
          onClick={handleMenuToggle}
        >
          <HiMenu size={30} />
        </button>
      </div>

      {/* Menu for small screens */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white p-4 shadow-lg">
          <button
            className="block w-full text-[#153d52] py-2 font-medium"
            onClick={() => {
              navigate("/");
              setIsMenuOpen(false);
            }}
          >
            TRP
          </button>
          <button
            className="block w-full text-[#153d52] py-2 font-medium"
            onClick={() => {
              navigate("/jobs");
              setIsMenuOpen(false);
            }}
          >
            Jobs
          </button>
          <button
            className="block w-full text-[#153d52] py-2 font-medium"
            onClick={() => {
              navigate("/employers");
              setIsMenuOpen(false);
            }}
          >
            Employers
          </button>
          <button
            className="block w-full text-[#153d52] py-2 font-medium"
            onClick={() => {
              navigate("/login");
              setIsMenuOpen(false);
            }}
          >
            Sign In
          </button>
          <button
            className="block w-full text-[#153d52] py-2 font-medium"
            onClick={() => {
              navigate("/register");
              setIsMenuOpen(false);
            }}
          >
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
