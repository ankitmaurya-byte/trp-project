// @ts-nocheck
import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const JobSearch = () => {
  const [activeTab, setActiveTab] = useState("Recommended");
  const [searchQuery, setSearchQuery] = useState("");
  const [minSalary, setMinSalary] = useState("10,000");
  const [maxSalary, setMaxSalary] = useState("50,000");

  return (
    <div className="grid grid-cols-12 gap-8 p-6">
      {/* Left Column - Filters */}
      <div className="col-span-4 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Recommended Jobs
        </h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center border rounded-lg">
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "Recommended" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("Recommended")}
          >
            Recommended
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "Jobs Applied" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("Jobs Applied")}
          >
            Jobs Applied
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "Saved" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("Saved")}
          >
            Saved
          </button>
        </div>

        {/* Filter Sections */}
        {["Job category", "Skills", "Location", "Job type"].map((filter) => (
          <div key={filter} className="border-b pb-4">
            <button className="w-full flex justify-between items-center py-2">
              <span className="text-gray-700">{filter}</span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        ))}

        {/* Salary Range */}
        <div className="border-b pb-4">
          <button className="w-full flex justify-between items-center py-2">
            <span className="text-gray-700">Salary Range</span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Minimum
              </label>
              <input
                type="text"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Maximum
              </label>
              <input
                type="text"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="col-span-2">
              <select className="w-full p-2 border rounded text-gray-600">
                <option>Per month</option>
                <option>Per year</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 text-blue-600">Cancel</button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded">
            Apply
          </button>
        </div>
      </div>

      {/* Right Column - TRP Info */}
      <div className="col-span-8">
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Did you know
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            If your resume not getting the attention it deserves? It might be
            time to check the "TRP" ratings of your resume! Just like TV shows
            have TRP ratings to gauge their popularity, your resume's "TRP"
            (Talent, Relevance, Presentation) can determine how well it
            resonates with recruiters.
          </p>
          <div className="flex justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              Check your TRP Rating
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
