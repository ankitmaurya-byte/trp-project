// @ts-nocheck

import React from "react";
import {
  MapPin,
  Clock,
  Eye,
  Settings,
  Share2,
  Copy,
  Edit,
  MessageCircle,
} from "lucide-react";

const KanbanBoard = () => {
  const columns = [
    { title: "Saved", count: "01" },
    { title: "Application Received", count: "01" },
    { title: "To Interview", count: "01" },
    { title: "Shortlisted", count: "01" },
    { title: "Selected", count: "01" },
  ];

  const candidates = [
    {
      name: "Anuradha Rohra",
      location: "Mumbai, India",
      experience: "5 Yrs 3 Months",
    },
  ];

  return (
    <div className="max-w-full p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">TCS - UI UX Designer</h1>
          <Copy className="w-4 h-4 cursor-pointer" />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Active</span>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5" />
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Post this Job
          </button>
          <Settings className="w-5 h-5 cursor-pointer" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-6">
        <button className="flex items-center gap-2 text-blue-600">
          <Share2 className="w-4 h-4" /> Share list
        </button>
        <button className="flex items-center gap-2 text-blue-600">
          <Edit className="w-4 h-4" /> Edit Rows
        </button>
        <button className="flex items-center gap-2 text-blue-600">
          <Copy className="w-4 h-4" /> Saved searches
        </button>
        <button className="flex items-center gap-2 text-blue-600">
          <MessageCircle className="w-4 h-4" /> View Recommended
        </button>
      </div>

      {/* Kanban Board */}
      <div className="relative">
        <div className="overflow-x-auto pb-6">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {columns.map((column, columnIndex) => (
              <div
                key={column.title}
                className="w-80 flex-shrink-0 bg-gray-50 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{column.title}</h3>
                  <span className="text-gray-600">{column.count}</span>
                </div>
                <div className="space-y-4">
                  {/* Repeat candidate cards per column */}
                  {[...Array(3)].map((_, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="bg-white rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium mb-2">Anuradha Rohra</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              Mumbai, India
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />5 Yrs 3 Months
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            Resume
                          </button>
                          <button>
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom scrollbar styling */}
        <style jsx global>{`
          ::-webkit-scrollbar {
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}</style>
      </div>
    </div>
  );
};

export default KanbanBoard;
