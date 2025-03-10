// @ts-nocheck
import React from "react";

import {
  Briefcase,
  ChevronRight,
  TrendingUp,
  Users,
  FileText,
  Search,
  Clock,
  Circle,
  Bell,
} from "lucide-react";
import { fetchJobsThunk } from "../../../store/actions/jobActions";
import { RootState, useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}

interface SavedSearchItem {
  search: string;
  date: string;
  time: string;
}

const StatCard = ({ icon, title, value }: StatCardProps) => (
  <div className="w-full flex flex-col items-start p-4 sm:p-5 rounded-xl border border-[#153d52]/20">
    <div className="w-12 h-12 sm:w-[60px] sm:h-[60px] p-2 sm:p-3">{icon}</div>
    <div className="w-full sm:w-[139px] flex flex-col items-start">
      <div className="w-full h-6 flex items-center justify-between">
        <span className="text-sm sm:text-base">{title}</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
      </div>
      <div className="text-2xl sm:text-[32px] font-bold leading-[1.7] text-[#153d52]">
        {value || 0}
      </div>
    </div>
  </div>
);

const SavedSearchCard = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => {
  const savedSearches: SavedSearchItem[] = [
    { search: "React Developer", date: "17 June 2023", time: "6:29 PM" },
    { search: "UI Designer", date: "17 June 2023", time: "4:15 PM" },
    { search: "Product Manager", date: "16 June 2023", time: "2:45 PM" },
    { search: "DevOps Engineer", date: "16 June 2023", time: "1:30 PM" },
  ];

  return (
    <div className="w-full lg:w-1/2 flex flex-col p-4 sm:p-5 rounded-xl border border-[#153d52]/20">
      <div className="w-full h-6 flex justify-between items-center mb-4 sm:mb-6">
        <div className="flex items-center gap-2 text-[#153d52]">
          {icon}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <button className="text-xs sm:text-sm text-[#0077b4] hover:underline">
          View all
        </button>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4">
        {savedSearches.map((item, index) => (
          <div
            key={index}
            className="w-full min-h-[40px] flex flex-col sm:flex-row justify-between items-start sm:items-center py-2"
          >
            <span className="text-xs sm:text-sm text-[#153d52] mb-1 sm:mb-0">
              {item.search}
            </span>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <span>{item.date}</span>
              <Circle className="w-1 h-1 fill-current" />
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const JobsTable = ({ jobs }) => (
  <div className="w-full overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="p-4 text-left text-sm text-gray-500">Job Title</th>
          <th className="p-4 text-left text-sm text-gray-500">Company</th>
          <th className="p-4 text-left text-sm text-gray-500">Location</th>
          <th className="p-4 text-left text-sm text-gray-500">Type</th>
          <th className="p-4 text-left text-sm text-gray-500">Status</th>
          <th className="p-4 text-left text-sm text-gray-500">Salary Range</th>
        </tr>
      </thead>
      <tbody>
        {jobs?.map((job) => (
          <tr key={job._id} className="border-b border-gray-200">
            <td className="p-4 text-sm">{job.title || "N/A"}</td>
            <td className="p-4 text-sm">{job.company || "N/A"}</td>
            <td className="p-4 text-sm">{job.location || "N/A"}</td>
            <td className="p-4 text-sm capitalize">
              {job.locationType || "N/A"}
            </td>
            <td className="p-4">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  job.status === "open"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {job.status || "N/A"}
              </span>
            </td>
            <td className="p-4 text-sm">
              ${job.salary?.min?.toLocaleString() || "0"} - $
              {job.salary?.max?.toLocaleString() || "0"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RecruiterDashboard = () => {
  // Use the actual jobs data from your JSON
  const recruiter = useSelector(
    (state: RootState) => state.recruiter.recruiter
  );
  const dispatch = useAppDispatch();
  // fetch all job made by recruiter and set to redux state
  // make a react query
  const fetchAllJobs = async () => {
    const result = await dispatch(fetchJobsThunk());
    return result.payload.data;
  };

  const jobsData = useQuery({
    queryKey: ["AllJobs"],
    queryFn: fetchAllJobs,
    staleTime: 0,
  });

  const stats = [
    {
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-[#0077b4]" />,
      title: "Total Job Posts",
      value: jobsData?.data?.jobs?.length || 0,
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#0077b4]" />,
      title: "Total Applications",
      value:
        jobsData?.data?.jobs?.reduce(
          (acc, job) => acc + (job.totalApplications || 0),
          0
        ) || 0,
    },
    {
      icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-[#0077b4]" />,
      title: "Active Jobs",
      value:
        jobsData?.data?.jobs?.filter((job) => job.status === "open")?.length ||
        0,
    },
    {
      icon: <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-[#0077b4]" />,
      title: "Hired Candidates",
      value:
        jobsData?.data?.jobs?.reduce(
          (acc, job) => acc + (job.hiredCandidates?.length || 0),
          0
        ) || 0,
    },
  ];

  return (
    <div className="w-full max-w-[1366px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="text-[#0077b4] text-xl sm:text-2xl font-semibold">
            TRP
          </div>
          <h1 className="text-lg sm:text-xl font-medium">Dashboard</h1>
        </div>
        <button className="px-3 py-1 sm:w-28 sm:h-10 flex items-center justify-center sm:px-5 sm:py-2 rounded-full border border-[#153d52]/20 bg-white hover:bg-gray-50 transition-colors text-sm">
          Reports
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8 px-0 sm:px-4 lg:px-10">
        <SavedSearchCard
          title="Saved Searches"
          icon={<Search className="w-4 h-4 sm:w-5 sm:h-5" />}
        />
        <SavedSearchCard
          title="Recent Notifications"
          icon={<Bell className="w-4 h-4 sm:w-5 sm:h-5" />}
        />
      </div>

      <div className="px-0 sm:px-4 lg:px-10">
        <JobsTable jobs={jobsData?.data?.jobs || []} />
      </div>
    </div>
  );
};

export default RecruiterDashboard;
