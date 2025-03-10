// @ts-nocheck

import React, { useState } from "react";
import { Search, Clock, User2 } from "lucide-react";

interface CandidateProfile {
  id: string;
  name: string;
  company: string;
  role: string;
  location: string;
  experience: string;
  timestamp: string;
  time: string;
}

interface SearchHistory {
  query: string;
  timestamp: string;
  time: string;
}

const CandidateSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");

  const searchHistory: SearchHistory[] = [
    { query: "UX Designer", timestamp: "17 June 2023", time: "6:29 PM" },
    { query: "UX Designer", timestamp: "17 June 2023", time: "6:29 PM" },
    { query: "UX Designer", timestamp: "17 June 2023", time: "6:29 PM" },
    { query: "UX Designer", timestamp: "17 June 2023", time: "6:29 PM" },
    { query: "UX Designer", timestamp: "17 June 2023", time: "6:29 PM" },
    { query: "UX Designer", timestamp: "17 June 2023", time: "6:29 PM" },
  ];

  const savedProfiles: CandidateProfile[] = [
    {
      id: "1",
      name: "Girish Purswani",
      company: "TCS",
      role: "UI UX Designer",
      location: "Mumbai, India",
      experience: "5 Yrs 3 Months",
      timestamp: "17 June 2023",
      time: "6:29 PM",
    },
    // Duplicate entries for demonstration
    {
      id: "2",
      name: "Girish Purswani",
      company: "TCS",
      role: "UI UX Designer",
      location: "Mumbai, India",
      experience: "5 Yrs 3 Months",
      timestamp: "17 June 2023",
      time: "6:29 PM",
    },
    {
      id: "3",
      name: "Girish Purswani",
      company: "TCS",
      role: "UI UX Designer",
      location: "Mumbai, India",
      experience: "5 Yrs 3 Months",
      timestamp: "17 June 2023",
      time: "6:29 PM",
    },
    {
      id: "4",
      name: "Girish Purswani",
      company: "TCS",
      role: "UI UX Designer",
      location: "Mumbai, India",
      experience: "5 Yrs 3 Months",
      timestamp: "17 June 2023",
      time: "6:29 PM",
    },
    {
      id: "5",
      name: "Girish Purswani",
      company: "TCS",
      role: "UI UX Designer",
      location: "Mumbai, India",
      experience: "5 Yrs 3 Months",
      timestamp: "17 June 2023",
      time: "6:29 PM",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <User2 className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-800">
          Candidate search
        </h1>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === "search" ? "bg-white text-gray-800" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("search")}
        >
          Candidate search
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === "advance" ? "bg-white text-gray-800" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("advance")}
        >
          Advance search
        </button>
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="You can try searching for skills, Job titles, etc"
          className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-lg">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">History</h2>
            </div>
            <button className="text-blue-600">view all</button>
          </div>

          <div className="space-y-4">
            {searchHistory.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <span className="text-blue-600 hover:underline cursor-pointer">
                  {item.query}
                </span>
                <span className="text-gray-500 text-sm">
                  {item.timestamp} • {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <User2 className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Saved Profiles</h2>
            </div>
            <button className="text-blue-600">view all</button>
          </div>

          <div className="space-y-4">
            {savedProfiles.map((profile) => (
              <div key={profile.id} className="py-2 border-b border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-blue-600 hover:underline cursor-pointer font-medium">
                    {profile.name}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {profile.timestamp} • {profile.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>
                    {profile.company} - {profile.role}
                  </span>
                  <span>•</span>
                  <span>{profile.location}</span>
                  <span>•</span>
                  <span>{profile.experience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;
