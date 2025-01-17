import React from "react";
import netflix from "../../assets/Netflix_Logo_RGB.png";
import youtube from "../../assets/youtube.png";
import { FaArrowRight } from "react-icons/fa6";
type JobDetail = {
  logo: string;
  time: string;
  location: string;
  title: string;
};

const jobDetails: JobDetail[] = [
  {
    logo: youtube,
    time: "6 Hours",
    location: "Mumbai, India",
    title: "User Experience Designer",
  },
  {
    logo: netflix,
    time: "2 Hours",
    location: "Pune, India",
    title: "Backend Developer",
  },
  {
    logo: youtube,
    time: "4 Hours",
    location: "Bangalore, India",
    title: "Frontend Developer",
  },
  {
    logo: netflix,
    time: "2 Hours",
    location: "Pune, India",
    title: "Backend Developer",
  },
  {
    logo: youtube,
    time: "4 Hours",
    location: "Bangalore, India",
    title: "Frontend Developer",
  },
];

const Jobs: React.FC = () => {
  return (
    <div className="max-w-[1280px] w-full mx-auto flex flex-col justify-start items-center my-10 gap-10 p-5 bg-white">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#153d52]">
          Find your next ideal job with us!
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          Get ahead of the competition - be an early applicant and secure your
          dream job today!
        </p>
      </div>
      {/* Job Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobDetails.map((job, index) => (
          <div
            key={index}
            className="flex flex-col justify-between p-5 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Logo and Apply Button */}
            <div className="flex justify-between items-center">
              <img
                src={job.logo}
                alt={`${job.title} logo`}
                className="w-16 h-auto"
              />
              <button className="px-4 py-2 text-sm font-medium text-[#0077b4] border border-gray-300 rounded-md hover:bg-gray-100">
                Apply
              </button>
            </div>

            {/* Job Details */}
            <div className="flex justify-between items-end mt-4">
              <div>
                <h2 className="text-lg text-start font-semibold text-[#153d52]">
                  {job.title}
                </h2>
                <p className="text-sm text-start text-gray-500">
                  {job.location}
                </p>
              </div>
              <span className="text-sm text-gray-400">{job.time} ago</span>
            </div>
          </div>
        ))}
      </div>
      {/* Footer Section */}
      <button className="px-3 py-2 text-sm font-semibold text-[#0077b4] hover:underline inline-flex gap-2 items-center">
        View All Jobs <FaArrowRight />
      </button>
    </div>
  );
};

export default Jobs;
