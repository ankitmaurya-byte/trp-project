// @ts-nocheck
import React from "react";
import { X, Bell } from "lucide-react";

interface NotificationItem {
  id: number;
  title: string;
  jobTitle: string;
  count: number;
  isRead: boolean;
}

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationSidebar = ({ isOpen, onClose }: NotificationSidebarProps) => {
  const notifications: NotificationItem[] = [
    {
      id: 1,
      title: "New Applications",
      jobTitle: "TCS - Javascript",
      count: 29,
      isRead: false,
    },
    {
      id: 2,
      title: "New Applications",
      jobTitle: "TCS - Javascript",
      count: 29,
      isRead: false,
    },
    {
      id: 3,
      title: "New Applications",
      jobTitle: "TCS - Javascript",
      count: 29,
      isRead: false,
    },
    {
      id: 4,
      title: "New Applications",
      jobTitle: "TCS - Javascript",
      count: 29,
      isRead: true,
    },
    {
      id: 5,
      title: "New Applications",
      jobTitle: "TCS - Javascript",
      count: 29,
      isRead: true,
    },
  ];

  return (
    <div
      className={`fixed inset-y-0 right-0 w-[400px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >
      {/* Header */}
      <div className="border-b border-[#153d52]/20 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#0077b4]" />
          <h2 className="text-lg font-medium text-[#153d52]">Notification</h2>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="overflow-y-auto h-[calc(100vh-64px)] scrollbar-hide">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-[#153d52]/10 hover:bg-gray-50 cursor-pointer ${
              !notification.isRead ? "bg-blue-50/50" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    !notification.isRead ? "bg-[#0077b4]" : "bg-gray-300"
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex gap-1 text-sm text-[#153d52]">
                  <span className="font-medium">{notification.count}</span>
                  <span>{notification.title}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  has been added to{" "}
                  <span className="text-[#0077b4]">
                    {notification.jobTitle}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overlay
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      )} */}
    </div>
  );
};

export default NotificationSidebar;
