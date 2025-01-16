import { Outlet, useNavigate } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const navigate = useNavigate();
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

export default Layout;
