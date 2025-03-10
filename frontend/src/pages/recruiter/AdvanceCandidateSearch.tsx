// @ts-nocheck

import React, { useState } from "react";
import { Users, GraduationCap, FileText } from "lucide-react";

interface Tag {
  id: string;
  text: string;
}

const AdvanceSearch = () => {
  const [jobTags, setJobTags] = useState<Tag[]>([
    { id: "1", text: "UI Designer" },
    { id: "2", text: "UX Designer" },
  ]);

  const [companyTags, setCompanyTags] = useState<Tag[]>([
    { id: "1", text: "TCS" },
    { id: "2", text: "Infosys" },
    { id: "3", text: "HDFC Bank" },
  ]);

  const removeTag = (tagId: string, type: "job" | "company") => {
    if (type === "job") {
      setJobTags((prev) => prev.filter((tag) => tag.id !== tagId));
    } else {
      setCompanyTags((prev) => prev.filter((tag) => tag.id !== tagId));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-800">
          Candidate search
        </h1>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Candidate search"
          className="px-4 py-2 rounded-full bg-gray-100"
        />
        <button className="px-4 py-2 rounded-full bg-white font-medium">
          Advance search
        </button>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-gray-700">Job Title</label>
              <select className="text-sm text-gray-600">
                <option>Both (current & past)</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Enter Job Title"
              className="w-full p-3 rounded-lg border border-gray-300"
            />
            <div className="flex flex-wrap gap-2">
              {jobTags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {tag.text}
                  <button
                    onClick={() => removeTag(tag.id, "job")}
                    className="text-gray-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="text-gray-700">Skills</label>
            <input
              type="text"
              placeholder="Enter Skills"
              className="w-full p-3 rounded-lg border border-gray-300 mt-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-gray-700">Company</label>
              <select className="text-sm text-gray-600">
                <option>Both (current & past)</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Enter Company"
              className="w-full p-3 rounded-lg border border-gray-300"
            />
            <div className="flex flex-wrap gap-2">
              {companyTags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {tag.text}
                  <button
                    onClick={() => removeTag(tag.id, "company")}
                    className="text-gray-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between">
              <label className="text-gray-700">Industry</label>
              <select className="text-sm text-gray-600">
                <option>Both (current & past)</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Enter Industry"
              className="w-full p-3 rounded-lg border border-gray-300 mt-2"
            />
          </div>

          <div>
            <label className="text-gray-700">Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              className="w-full p-3 rounded-lg border border-gray-300 mt-2"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-gray-800">Education Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-gray-700">Education</label>
              <input
                type="text"
                placeholder="Enter Education"
                className="w-full p-3 rounded-lg border border-gray-300 mt-2"
              />
            </div>

            <div>
              <label className="text-gray-700">Field of Study</label>
              <input
                type="text"
                placeholder="Enter Field of Study"
                className="w-full p-3 rounded-lg border border-gray-300 mt-2"
              />
            </div>

            <div>
              <label className="text-gray-700">Schools</label>
              <input
                type="text"
                placeholder="Enter School name"
                className="w-full p-3 rounded-lg border border-gray-300 mt-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-gray-700">Graduation Year</label>
            <div className="flex gap-4 mt-2">
              <select className="p-3 rounded-lg border border-gray-300">
                <option>From (year)</option>
              </select>
              <select className="p-3 rounded-lg border border-gray-300">
                <option>To (year)</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-gray-800">Additional Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-gray-700">Gender</label>
              <div className="flex gap-6 mt-3">
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" className="w-4 h-4" />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" className="w-4 h-4" />
                  <span>Female</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" className="w-4 h-4" />
                  <span>Other</span>
                </label>
              </div>
            </div>

            <div>
              <label className="text-gray-700">Years of Experience</label>
              <div className="flex gap-4 mt-2">
                <input
                  type="text"
                  placeholder="Minimum"
                  className="w-full p-3 rounded-lg border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Maximum"
                  className="w-full p-3 rounded-lg border border-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700">Languages</label>
              <input
                type="text"
                placeholder="Enter Languages"
                className="w-full p-3 rounded-lg border border-gray-300 mt-2"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 rounded-lg text-blue-600">Cancel</button>
          <button className="px-6 py-2 rounded-lg bg-blue-600 text-white">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvanceSearch;
