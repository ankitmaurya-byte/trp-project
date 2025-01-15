import { Outlet, useNavigate } from "react-router-dom";

import Header from "../pages/Header";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Header Section */}
      <Header />
      {/* Main Content Section */}

      <Outlet />
    </>
  );
};

export default Layout;
