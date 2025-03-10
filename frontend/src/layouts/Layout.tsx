// @ts-nocheck
import { Outlet, useNavigate } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import HeaderUser from "./HeaderUser";

export const UnAuthLayout = () => {
  return (
    <>
      {/* Header Section */}
      <Header />
      {/* Main Content Section */}
      <Outlet />
      <Footer />
    </>
  );
};
export const UserLayout = () => {
  return (
    <>
      {/* Header Section */}
      <HeaderUser />
      {/* Main Content Section */}
      <Outlet />
      <Footer />
    </>
  );
};
