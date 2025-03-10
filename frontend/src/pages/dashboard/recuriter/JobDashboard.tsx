// @ts-nocheck
import React, { useState, useEffect } from "react";
import {
  Briefcase,
  FileText,
  CheckCircle,
  UserCheck,
  Search,
  Info,
  Bell,
  Settings,
} from "lucide-react";
import { useAppDispatch } from "../../../store/store";
import { fetchJobsThunk } from "../../../store/actions/jobActions";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Types
interface Salary {
  min: number;
  max: number;
}

interface HiredCandidate {
  candidate: string;
  date: string;
  time: string;
  _id: string;
}

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requiredCandidate: number;
  skills: string[];
  experience: number;
  totalApplications: number;
  type: string;
  locationType: string;
  recruiter: string;
  status: string;
  hiredCandidates: HiredCandidate[];
  postDate: string;
  createdAt: string;
  updatedAt: string;
  salary: Salary;
}

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}
const PageHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div className="flex items-center gap-3 mb-4 md:mb-0">
        <Briefcase className="text-blue-600" size={24} />
        <h1 className="text-2xl font-bold text-gray-800">Jobs</h1>
      </div>
      <button
        onClick={() => navigate("/job-post")}
        className="px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded-md flex items-center justify-center gap-2 hover:bg-blue-50 transition duration-200"
      >
        <span>+</span>
        <span>New Job</span>
      </button>
    </div>
  );
};

const SummaryCard: React.FC<SummaryCardProps> = ({ icon, title, value }) => (
  <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-4 text-gray-700">
        {icon}
        <div className="flex items-center justify-between w-full">
          <span className="text-sm">{title}</span>
          <Info size={16} className="text-gray-400" />
        </div>
      </div>
      <span className="text-3xl font-bold text-gray-800">{value}</span>
    </div>
  </div>
);

const FilterSection: React.FC<{
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: "all" | "paused";
  setActiveFilter: (filter: "all" | "paused") => void;
}> = ({ searchTerm, setSearchTerm, activeFilter, setActiveFilter }) => (
  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <div className="relative flex-grow md:max-w-xs">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={16} className="text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <div className="flex space-x-2">
      <button
        className={`px-4 py-2 rounded-md text-sm ${
          activeFilter === "all"
            ? "bg-blue-100 text-blue-600"
            : "bg-white text-gray-600 hover:bg-gray-100"
        }`}
        onClick={() => setActiveFilter("all")}
      >
        All
      </button>
      <button
        className={`px-4 py-2 rounded-md text-sm ${
          activeFilter === "paused"
            ? "bg-blue-100 text-blue-600"
            : "bg-white text-gray-600 hover:bg-gray-100"
        }`}
        onClick={() => setActiveFilter("paused")}
      >
        Show only Paused or closed jobs
      </button>
    </div>
  </div>
);

const JobsTable: React.FC<{
  jobs: Job[];
  isLoading: boolean;
  isError: boolean;
}> = ({ jobs, isLoading, isError }) => {
  if (isLoading) {
    return (
      <div className="w-full p-8 flex justify-center">
        <p className="text-gray-500">Loading jobs data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full p-8 flex justify-center">
        <p className="text-red-500">
          Failed to load jobs data. Please try again.
        </p>
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="w-full p-8 flex justify-center">
        <p className="text-gray-500">No jobs found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-md border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Location
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total Applications
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Required Candidates
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Shortlisted
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Hired
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {jobs.map((job) => (
            <tr key={job._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                {job.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {job.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {job.totalApplications}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    job.status === "open"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {job.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {job.requiredCandidate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {/* Using a placeholder for shortlisted since it's not in the data */}
                {job.totalApplications > 0
                  ? Math.floor(job.totalApplications * 0.3)
                  : 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {job.hiredCandidates.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main Component
const JobDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "paused">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();

  const fetchAllJobs = async () => {
    const result = await dispatch(fetchJobsThunk());
    return result.payload.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["AllJobs"],
    queryFn: fetchAllJobs,
  });

  // Filter jobs based on active filter and search term
  const filteredJobs = React.useMemo(() => {
    if (!data?.jobs) return [];

    return data.jobs.filter((job: Job) => {
      // Apply status filter
      if (activeFilter === "paused" && job.status !== "closed") {
        return false;
      }

      // Apply search term filter
      if (searchTerm.trim() !== "") {
        const term = searchTerm.toLowerCase();
        return (
          job.title.toLowerCase().includes(term) ||
          job.company.toLowerCase().includes(term) ||
          job.location.toLowerCase().includes(term)
        );
      }

      return true;
    });
  }, [data?.jobs, activeFilter, searchTerm]);

  // Calculate summary metrics
  const totalJobs = data?.jobs?.length || 0;
  const totalApplications =
    data?.jobs?.reduce(
      (sum: number, job: Job) => sum + job.totalApplications,
      0
    ) || 0;
  const totalShortlisted =
    data?.jobs?.reduce((sum: number, job: Job) => {
      // Using a simple estimation for shortlisted since it's not in the data
      return (
        sum +
        (job.totalApplications > 0
          ? Math.floor(job.totalApplications * 0.3)
          : 0)
      );
    }, 0) || 0;
  const totalHired =
    data?.jobs?.reduce(
      (sum: number, job: Job) => sum + job.hiredCandidates.length,
      0
    ) || 0;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <main className="px-4 py-6 md:px-6 lg:px-8">
        <PageHeader />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <SummaryCard
            icon={<Briefcase className="text-blue-600" size={20} />}
            title="Total Jobs Posted"
            value={isLoading ? 0 : totalJobs}
          />
          <SummaryCard
            icon={<FileText className="text-blue-600" size={20} />}
            title="Total Applications Received"
            value={isLoading ? 0 : totalApplications}
          />
          <SummaryCard
            icon={<CheckCircle className="text-blue-600" size={20} />}
            title="Total Shortlisted (pipeline)"
            value={isLoading ? 0 : totalShortlisted}
          />
          <SummaryCard
            icon={<UserCheck className="text-blue-600" size={20} />}
            title="Candidates Hired"
            value={isLoading ? 0 : totalHired}
          />
        </div>

        <FilterSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <JobsTable
          jobs={filteredJobs}
          isLoading={isLoading}
          isError={isError}
        />
      </main>
    </div>
  );
};

export default JobDashboard;
