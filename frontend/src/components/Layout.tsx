import { Outlet, useNavigate } from "react-router-dom";
import TrpButton from "./TrpButton";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <div className="Rectangle-7 bg-gray-100 w-screen min-h-screen">
      {/* Header Section */}
      <header className="Rectangle-7 w-full h-[75px] flex justify-between bg-blue-900 items-center flex-grow-0 mb-[40px] px-[40px] py-[20px]">
        <div>trp loogo</div>
        <div className="flex gap-4">
          <div>trp</div>
          <div>jobs</div>
          <div>Employers</div>
          <div onClick={() => navigate("/login")}>
            <TrpButton type="white">sign in</TrpButton>
          </div>
          <div>
            <TrpButton type="blue">signup</TrpButton>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* Nested routes will be rendered here */}
      </main>
    </div>
  );
};

export default Layout;
