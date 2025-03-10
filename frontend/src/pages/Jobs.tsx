// @ts-nocheck

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Share2,
  Filter,
  BookmarkIcon,
} from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  isRemote: boolean;
  salary: string;
  postedTime: string;
  companyLogo: string;
  isSaved: boolean;
  recruiter?: {
    name: string;
    phone: string;
  };
  responsibilities?: string[];
  requirements?: string[];
}

const JobsPage = () => {
  const [activeTab, setActiveTab] = useState("Recommended");
  const [savedState, setSavedState] = useState<{ [key: number]: boolean }>({});
  const [selectedJob, setSelectedJob] = useState<number>(1);
  const [activeDetailTab, setActiveDetailTab] = useState("Job Description");

  const jobs: Job[] = [
    {
      id: 1,
      title: "Sr. Auditer",
      company: "Marqetrix Web Solutions",
      location: "Hyderabad, Telangana",
      isRemote: true,
      salary: "4.5 lakhs - 8.5 lakhs",
      postedTime: "1 day ago",
      companyLogo: "/api/placeholder/48/48",
      isSaved: false,
      recruiter: {
        name: "Rakesh Singh",
        phone: "+91 824421696",
      },
      responsibilities: [
        "Take full ownership and responsibility of projects to every detail and every step of the product.",
        "Keen interest in all aspects of designs from sketching wireframes to visual perfection",
        "Understand design specifications and user psychology",
        "Conduct concept and usability testing and gather feedback",
        "Develop wireframes and prototypes around customer needs",
      ],
      requirements: [
        "A portfolio of UI/UX design work for web, mobile & graphics platforms",
        "Knowledge of Adobe XD & Photoshop is mandatory",
      ],
    },
    {
      id: 1,
      title: "Sr. Auditer",
      company: "Marqetrix Web Solutions",
      location: "Hyderabad, Telangana",
      isRemote: true,
      salary: "4.5 lakhs - 8.5 lakhs",
      postedTime: "1 day ago",
      companyLogo: "/api/placeholder/48/48",
      isSaved: false,
      recruiter: {
        name: "Rakesh Singh",
        phone: "+91 824421696",
      },
      responsibilities: [
        "Take full ownership and responsibility of projects to every detail and every step of the product.",
        "Keen interest in all aspects of designs from sketching wireframes to visual perfection",
        "Understand design specifications and user psychology",
        "Conduct concept and usability testing and gather feedback",
        "Develop wireframes and prototypes around customer needs",
      ],
      requirements: [
        "A portfolio of UI/UX design work for web, mobile & graphics platforms",
        "Knowledge of Adobe XD & Photoshop is mandatory",
      ],
    },
    {
      id: 1,
      title: "Sr. Auditer",
      company: "Marqetrix Web Solutions",
      location: "Hyderabad, Telangana",
      isRemote: true,
      salary: "4.5 lakhs - 8.5 lakhs",
      postedTime: "1 day ago",
      companyLogo: "/api/placeholder/48/48",
      isSaved: false,
      recruiter: {
        name: "Rakesh Singh",
        phone: "+91 824421696",
      },
      responsibilities: [
        "Take full ownership and responsibility of projects to every detail and every step of the product.",
        "Keen interest in all aspects of designs from sketching wireframes to visual perfection",
        "Understand design specifications and user psychology",
        "Conduct concept and usability testing and gather feedback",
        "Develop wireframes and prototypes around customer needs",
      ],
      requirements: [
        "A portfolio of UI/UX design work for web, mobile & graphics platforms",
        "Knowledge of Adobe XD & Photoshop is mandatory",
      ],
    },
  ];

  const tabs = ["Recommended", "Jobs applied", "Saved"];
  const detailTabs = ["Job Description", "Message recruiter", "About company"];

  const toggleSaved = (jobId: number) => {
    setSavedState((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  const selectedJobData = jobs.find((job) => job.id === selectedJob);

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      <div className="mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Column */}
          <div className="flex-1 w-5/12">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Recommended Jobs
            </h1>

            {/* Search Bar */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 ${
                    activeTab === tab
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className={`bg-white rounded-lg border p-6 cursor-pointer ${
                    selectedJob === job.id ? "border-blue-500" : ""
                  }`}
                  onClick={() => setSelectedJob(job.id)}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-12 h-12 rounded"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {job.title}{" "}
                          {job.isRemote && (
                            <span className="text-gray-500">(Remote)</span>
                          )}
                        </h3>
                        <p className="text-gray-600">{job.company}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.postedTime}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <button
                        className="p-2 hover:bg-gray-50 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaved(job.id);
                        }}
                      >
                        <BookmarkIcon
                          className={`w-5 h-5 ${
                            savedState[job.id]
                              ? "fill-blue-500 text-blue-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-50 rounded-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Share2 className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Job Details */}
          {selectedJobData && (
            <div className=" w-full bg-white rounded-lg border p-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedJobData.companyLogo}
                  alt={selectedJobData.company}
                  className="w-16 h-16 rounded"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {selectedJobData.title}
                    {selectedJobData.isRemote && (
                      <span className="text-gray-500"> (Remote)</span>
                    )}
                  </h2>
                  <p className="text-gray-600">{selectedJobData.company}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-800 font-medium">
                  ₹ {selectedJobData.salary}
                </p>
                <p className="text-gray-500">{selectedJobData.location}</p>
              </div>

              <div className="flex gap-4 border-b mb-6">
                {detailTabs.map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 ${
                      activeDetailTab === tab
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveDetailTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeDetailTab === "Job Description" && (
                <div>
                  {selectedJobData.recruiter && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        About recruiter
                      </h3>
                      <p className="text-gray-600">
                        {selectedJobData.recruiter.name}
                      </p>
                      <p className="text-gray-600">
                        {selectedJobData.recruiter.phone}
                      </p>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Roles & Responsibilities:
                    </h3>
                    {selectedJobData.responsibilities?.map((resp, index) => (
                      <div key={index} className="flex items-start gap-2 mb-2">
                        <span className="text-gray-400">-</span>
                        <p className="text-gray-600">{resp}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Requirements:
                    </h3>
                    {selectedJobData.requirements?.map((req, index) => (
                      <div key={index} className="flex items-start gap-2 mb-2">
                        <span className="text-gray-400">-</span>
                        <p className="text-gray-600">{req}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      Apply
                    </button>
                    <button
                      className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
                      onClick={() => toggleSaved(selectedJobData.id)}
                    >
                      {savedState[selectedJobData.id] ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
