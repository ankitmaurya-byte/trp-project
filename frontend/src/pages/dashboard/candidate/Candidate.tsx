// @ts-nocheck
import React from "react";
import {
  Briefcase,
  Users,
  X,
  CheckSquare,
  Bookmark,
  Building2,
  GraduationCap,
  BookOpen,
} from "lucide-react";

const CandidateDashboard = () => {
  const stats = [
    {
      icon: <Briefcase className="w-6 h-6 text-blue-500" />,
      title: "Total Jobs applied",
      value: "200",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Visited your profile",
      value: "100",
    },
    {
      icon: <X className="w-6 h-6 text-blue-500" />,
      title: "Rejected",
      value: "80",
    },
    {
      icon: <CheckSquare className="w-6 h-6 text-blue-500" />,
      title: "Profile shortlisted",
      value: "300",
    },
    {
      icon: <Bookmark className="w-6 h-6 text-blue-500" />,
      title: "Saved Jobs",
      value: "300",
    },
  ];

  const journey = [
    {
      title: "UI UX Designer",
      company: "ProCreator Design agency",
      type: "Full-Time",
      period: "Oct 2021 - Present",
      location: "Mumbai, Maharashtra, India",
    },
    {
      title: "UX Designer",
      company: "TransformHub",
      type: "Internship",
      period: "Oct 2020 - Oct 2021",
      location: "Mumbai, Maharashtra, India",
    },
    {
      title: "Jai Hind College",
      type: "Information Technology",
      period: "2014-2018",
      isEducation: true,
    },
  ];

  const companies = [
    "Facebook",
    "Mercedes",
    "Sketch",
    "Microsoft",
    "BMW",
    "Netflix",
    "Slack",
    "Figma",
    "Google",
    "Mastercard",
  ];

  const skills = [
    "Direct Taxation",
    "Indirect Taxation",
    "Internal Audit",
    "Audit",
    "Statutory Audit",
    "Financial Management",
    "Accounting",
    "Compulsory Tax Audit",
    "Consultancy",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Building2 className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span>Looking for an active jobs</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Your profile is 20% complete</span>
            <span className="text-blue-500 cursor-pointer">Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <span>TRP score:</span>
            <span className="text-green-500">70%</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              {stat.icon}
              <span className="text-gray-400 cursor-pointer">ⓘ</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-2">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Journey Timeline */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-800">Journey</h2>
            </div>
            <button className="text-blue-500">
              <BookOpen className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            {journey.map((item, index) => (
              <div
                key={index}
                className="mb-8 relative pl-8 border-l-2 border-gray-200 last:mb-0"
              >
                <div className="absolute -left-1 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                {!item.isEducation && (
                  <p className="text-gray-600 text-sm">
                    {item.company} •{" "}
                    <span className="text-gray-400">{item.type}</span>
                  </p>
                )}
                {item.isEducation ? (
                  <p className="text-gray-600 text-sm">
                    Graduation •{" "}
                    <span className="text-gray-400">{item.type}</span>
                  </p>
                ) : null}
                <p className="text-gray-400 text-sm">{item.period}</p>
                {item.location && (
                  <p className="text-gray-400 text-sm">{item.location}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Top Hiring Companies */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-800">
                Top Hiring Companies
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {companies.map((company, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-50 rounded-full text-gray-600 text-sm"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>

          {/* Top Skills in Demand */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-800">
                Top Skills in Demand
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-50 rounded-full text-gray-600 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
