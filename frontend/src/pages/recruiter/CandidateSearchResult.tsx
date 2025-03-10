// @ts-nocheck

import React, { useState } from "react";
import {
  Filter,
  Save,
  RotateCcw,
  BookOpen,
  MapPin,
  Clock,
  GraduationCap,
  Briefcase,
} from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  experience: string;
  noticePeriod: string;
  currentSalary: string;
  expectedSalary: string;
  education: string;
  university: string;
  educationLocation: string;
  educationPeriod: string;
  skills: string[];
  preferredLocation: string;
  score: number;
}

const CandidateSearchResults = () => {
  const [searchQuery, setSearchQuery] = useState("Java");
  const [selectedCount, setSelectedCount] = useState(50);
  const [totalCandidates, setTotalCandidates] = useState(3000);

  const candidates: Candidate[] = [
    {
      id: "1",
      name: "Girish Purswani",
      role: "Sr. User Experience Designer at Alphabet",
      location: "Mumbai, India",
      experience: "5 Yrs 3 Months",
      noticePeriod: "30 days notice period",
      currentSalary: "51ac",
      expectedSalary: "12lac",
      education: "Computer Science",
      university: "Port City International University",
      educationLocation: "Mumbai, India",
      educationPeriod: "June 2019 - June 2019",
      skills: ["Java", "+31 more skills"],
      preferredLocation: "Mumbai only",
      score: 70,
    },
    // Duplicate entries with different scores
    {
      id: "2",
      name: "Girish Purswani",
      role: "Sr. User Experience Designer at Alphabet",
      location: "Mumbai, India",
      experience: "5 Yrs 3 Months",
      noticePeriod: "30 days notice period",
      currentSalary: "51ac",
      expectedSalary: "12lac",
      education: "Computer Science",
      university: "Port City International University",
      educationLocation: "Mumbai, India",
      educationPeriod: "June 2019 - June 2019",
      skills: ["Java", "+31 more skills"],
      preferredLocation: "Mumbai only",
      score: 20,
    },
    {
      id: "3",
      name: "Girish Purswani",
      role: "Sr. User Experience Designer at Alphabet",
      location: "Mumbai, India",
      experience: "5 Yrs 3 Months",
      noticePeriod: "30 days notice period",
      currentSalary: "51ac",
      expectedSalary: "12lac",
      education: "Computer Science",
      university: "Port City International University",
      educationLocation: "Mumbai, India",
      educationPeriod: "June 2019 - June 2019",
      skills: ["Java", "+31 more skills"],
      preferredLocation: "Mumbai only",
      score: 50,
    },
  ];

  const filters = [
    { name: "Job Title", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Location", icon: <MapPin className="w-4 h-4" /> },
    { name: "Skills", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Industries", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Years of Experience", icon: <Clock className="w-4 h-4" /> },
    { name: "Gender", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Contact Available", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Education", icon: <GraduationCap className="w-4 h-4" /> },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 border-r bg-white p-6">
        <div className="space-y-6">
          <div>
            <label className="text-gray-700">Keyword or Boolean search</label>
            <div className="flex mt-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 p-2 border rounded-l"
              />
              <button className="px-4 py-2 bg-white border border-l-0 rounded-r text-blue-600">
                clear
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filters.map((filter) => (
              <div
                key={filter.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {filter.icon}
                  <span className="text-gray-700">{filter.name}</span>
                </div>
                <button className="p-1">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-blue-600">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-blue-600">
              <Save className="w-4 h-4" />
              Save search
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-blue-600">
              <RotateCcw className="w-4 h-4" />
              reset
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-6 py-2 bg-white rounded border text-blue-600">
              Save Candidates
            </button>
            <button className="px-6 py-2 bg-white rounded border text-blue-600">
              Bulk Email
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <input type="checkbox" className="w-4 h-4" />
          <span>Select all</span>
          <span className="text-gray-600">
            {selectedCount} profiles selected from the {totalCandidates}{" "}
            candidates.
          </span>
          <button className="text-blue-600">
            Select all {totalCandidates} candidates
          </button>
        </div>

        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-start gap-4">
                <input type="checkbox" className="w-4 h-4 mt-2" />
                <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white text-xl">
                  {candidate.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{candidate.name}</h3>
                      <p className="text-gray-600">{candidate.role}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">TRP score:</div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-16 h-1 rounded ${getScoreColor(
                              candidate.score
                            )}`}
                          />
                          <span className="font-medium">
                            {candidate.score}%
                          </span>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-blue-600 border rounded">
                        Save this candidate
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{candidate.location}</span>
                      <span>•</span>
                      <span>{candidate.experience}</span>
                      <span>•</span>
                      <span>{candidate.noticePeriod}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Current {candidate.currentSalary}</span>
                      <span>&</span>
                      <span>Expected {candidate.expectedSalary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>
                        {candidate.education} at {candidate.university}
                      </span>
                      <span>•</span>
                      <span>{candidate.educationLocation}</span>
                      <span>•</span>
                      <span>{candidate.educationPeriod}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {candidate.skills.map((skill, index) => (
                        <span key={index} className="text-blue-600">
                          {skill}
                          {index < candidate.skills.length - 1 && " "}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        Preferred location is {candidate.preferredLocation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateSearchResults;
