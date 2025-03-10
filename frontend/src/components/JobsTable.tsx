// @ts-nocheck
import React, { useState } from "react";
import { Search, Briefcase } from "lucide-react";

interface JobData {
  title: string;
  location: string;
  totalApplications: number;
  totalViewed: number;
  totalMessages: number;
  shortlisted: number;
  rejected: number;
}

const JobsTable = () => {
  const [showPaused, setShowPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const jobsData: JobData[] = [
    {
      title: "TCS - Java script",
      location: "Mumbai",
      totalApplications: 80,
      totalViewed: 100,
      totalMessages: 2,
      shortlisted: 20,
      rejected: 10,
    },
    {
      title: "TCS - Java script",
      location: "Mumbai",
      totalApplications: 80,
      totalViewed: 100,
      totalMessages: 2,
      shortlisted: 20,
      rejected: 10,
    },
    {
      title: "TCS - Java script",
      location: "Mumbai",
      totalApplications: 80,
      totalViewed: 100,
      totalMessages: 2,
      shortlisted: 20,
      rejected: 10,
    },
    {
      title: "TCS - Java script",
      location: "Mumbai",
      totalApplications: 80,
      totalViewed: 100,
      totalMessages: 2,
      shortlisted: 20,
      rejected: 10,
    },
    {
      title: "TCS - Java script",
      location: "Mumbai",
      totalApplications: 80,
      totalViewed: 100,
      totalMessages: 2,
      shortlisted: 20,
      rejected: 10,
    },
    {
      title: "TCS - Java script",
      location: "Mumbai",
      totalApplications: 80,
      totalViewed: 100,
      totalMessages: 2,
      shortlisted: 20,
      rejected: 10,
    },
    {
      title: "TCS - Java script",
      location: "Mumbai",
      totalApplications: 80,
      totalViewed: 100,
      totalMessages: 2,
      shortlisted: 20,
      rejected: 10,
    },
    {
      title: "TCS - Java script",
      location: "Mumbai",
      totalApplications: 80,
      totalViewed: 100,
      totalMessages: 2,
      shortlisted: 20,
      rejected: 10,
    },
    {
      title: "TCS - Java script",
      location: "Mumbai",
      totalApplications: 80,
      totalViewed: 100,
      totalMessages: 2,
      shortlisted: 20,
      rejected: 10,
    },
    {
      title: "TCS - Java script",
      location: "Mumbai",
      totalApplications: 80,
      totalViewed: 100,
      totalMessages: 2,
      shortlisted: 20,
      rejected: 10,
    },
    // ... your existing job data
  ];

  return (
    <div className="bg-white rounded-xl border border-[#153d52]/20 p-4 sm:p-6 h-[498px] w-full max-w-[1366px] flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 shrink-0">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#0077b4]" />
          <h2 className="text-base sm:text-lg font-medium text-[#153d52]">
            Jobs
          </h2>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6 shrink-0">
        <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto">
          <button
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm whitespace-nowrap ${
              !showPaused
                ? "bg-[#0077b4] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setShowPaused(false)}
          >
            All
          </button>
          <button
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm whitespace-nowrap ${
              showPaused
                ? "bg-[#0077b4] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setShowPaused(true)}
          >
            Paused or closed jobs
          </button>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b4]/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table Container with Custom Scrollbar */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto scrollbar-hide">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className="text-left text-xs sm:text-sm text-gray-500">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Total Application</th>
                <th className="px-4 py-3 font-medium">Total Viewed</th>
                <th className="px-4 py-3 font-medium">Total Messages</th>
                <th className="px-4 py-3 font-medium">Shortlisted</th>
                <th className="px-4 py-3 font-medium">Rejected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {jobsData.map((job, index) => (
                <tr
                  key={index}
                  className="text-xs sm:text-sm text-gray-600 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 sm:py-4">
                    <a href="#" className="text-[#0077b4] hover:underline">
                      {job.title}
                    </a>
                  </td>
                  <td className="px-4 py-3 sm:py-4">{job.location}</td>
                  <td className="px-4 py-3 sm:py-4">{job.totalApplications}</td>
                  <td className="px-4 py-3 sm:py-4">{job.totalViewed}</td>
                  <td className="px-4 py-3 sm:py-4">{job.totalMessages}</td>
                  <td className="px-4 py-3 sm:py-4">{job.shortlisted}</td>
                  <td className="px-4 py-3 sm:py-4">{job.rejected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobsTable;
