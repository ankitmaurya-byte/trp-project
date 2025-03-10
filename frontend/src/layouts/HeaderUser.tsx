// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  MessageSquare,
  BriefcaseBusiness,
  Users,
  LayoutDashboard,
  Bell,
  Settings,
  Menu,
  X,
  ChartCandlestick,
} from "lucide-react";
import trpLogo from "../assets/trp_white_logo/logo.png";
import NotificationSidebar from "./NotificationSidebar";
import { useLocation, useNavigate } from "react-router-dom";

interface NavigationItem {
  title: string;
  icon: React.ComponentType;
  navigation: string;
}

const HeaderUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useSelector((state: RootState) => state.user.user);
  console.log(role);

  const defaultNavigationDetails: NavigationItem[] = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      navigation: `/dashboard/${role}`,
    },
    {
      title: "Jobs",
      icon: BriefcaseBusiness,
      navigation: "/track-jobPost",
    },
    {
      title: "Candidate",
      icon: Users,
      navigation: "/candidate/search",
    },
  ];
  const [navigationDetails, setNavigationDetails] = useState(
    defaultNavigationDetails
  );
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (role === "candidate") {
      const updatedNav = [...defaultNavigationDetails].slice(0, -2);

      console.log(updatedNav);
      updatedNav.splice(1, 0, {
        title: "TRP",
        icon: ChartCandlestick,
        navigation: "/dashboard/trp-score",
      });
      updatedNav.splice(2, 0, {
        ...defaultNavigationDetails[1],
        navigation: "/job-search",
      });

      setNavigationDetails(updatedNav);
    }
  }, [role]);

  const [active, setActive] = useState(() => {
    const path = location.pathname;
    return navigationDetails.findIndex((item) => item.navigation === path) || 0;
  });

  return (
    <>
      <header className="w-full bg-[#0077b4] h-[52px] fixed top-0 z-30">
        <div className="max-w-[1366px] h-full mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-10">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <div className="w-[42px] h-[43px] flex items-center">
              <img
                src={trpLogo}
                alt="TRP Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex w-auto lg:w-[38%] items-center justify-center gap-8">
            {navigationDetails.map((item, index) => (
              <button
                key={item.title}
                onClick={() => {
                  setActive(index);
                  navigate(item.navigation);
                }}
                className={`flex items-center gap-2 ${
                  index === active
                    ? "font-semibold text-white"
                    : "font-normal text-white/80"
                } hover:text-white transition-colors`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.title}</span>
              </button>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="text-white hover:text-white/80 p-1">
              <MessageSquare className="w-5 h-5" />
            </button>
            <button
              className="text-white hover:text-white/80 p-1 relative"
              onClick={() => setIsNotificationOpen(true)}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
                5
              </span>
            </button>
            <button className="text-white hover:text-white/80 p-1">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden fixed inset-0 top-[52px] bg-[#0077b4] transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="flex flex-col p-4">
            {navigationDetails.map((item, index) => (
              <button
                key={item.title}
                onClick={() => {
                  setActive(index);
                  navigate(item.navigation);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 py-4 px-2 ${
                  index === active
                    ? "font-semibold text-white"
                    : "font-normal text-white/80"
                } hover:text-white transition-colors`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-[52px]" />

      {/* Notification Sidebar */}
      <NotificationSidebar
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[52px] bg-black/50 z-20"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default HeaderUser;
