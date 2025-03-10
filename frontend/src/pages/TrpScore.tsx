// @ts-nocheck
import React, { useState } from "react";
import { LineChart } from "lucide-react";

interface ScoreCard {
  title: string;
  score: number;
  selected?: boolean;
  progressColor: string;
}

interface Skill {
  name: string;
}

const TrpScore = () => {
  const [scoreCards, setScoreCards] = useState<ScoreCard[]>([
    {
      title: "Skills",
      score: 70,
      selected: true,
      progressColor: "bg-green-500",
    },
    { title: "Experience", score: 60, progressColor: "bg-yellow-500" },
    { title: "Education", score: 10, progressColor: "bg-red-500" },
    { title: "Certification", score: 50, progressColor: "bg-yellow-500" },
    { title: "Location", score: 80, progressColor: "bg-green-500" },
  ]);

  const skills: Skill[] = [
    { name: "Direct Taxation" },
    { name: "Indirect Taxation" },
    { name: "Internal Audit" },
    { name: "Audit" },
    { name: "Statutory Audit" },
    { name: "Financial Management" },
    { name: "Accounting" },
    { name: "Compulsory Tax Audit" },
  ];

  const responsibilities = [
    "Take full ownership and responsibility of projects to every detail and every step of the product journey.",
    "Keen interest in all aspects of designs from sketching wireframes to visual perfection to prototypes",
    "Understand design specifications and user psychology",
    "Conduct concept and usability testing and gather feedback",
    "Develop wireframes and prototypes around customer needs",
  ];

  const selectCard = (index: number) => {
    setScoreCards((cards) =>
      cards.map((card, i) => ({
        ...card,
        selected: i === index,
      }))
    );
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <LineChart className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-800">TRP</h1>
      </div>

      <p className="text-gray-500 italic mb-8">
        Your TRP score can also be low due to unfilled information in your
        profile
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Pie Chart */}
        <div className="relative w-48 h-48">
          <div
            className="w-full h-full rounded-full bg-blue-500"
            style={{ clipPath: "inset(0 25% 0 0)" }}
          />
          <div className="absolute bottom-0 left-0">
            <p className="text-gray-600">Your TRP score is</p>
            <p className="text-4xl font-bold text-gray-800">70</p>
          </div>
        </div>

        {/* Score Cards */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <p className="col-span-full text-gray-600 mb-2">
            Select any 1 to view more
          </p>
          {scoreCards.map((card, index) => (
            <div
              key={index}
              className={`p-6 bg-white rounded-lg cursor-pointer ${
                card.selected ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => selectCard(index)}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">{card.title}</span>
                <span className="text-gray-400">ⓘ</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mb-4">
                <div
                  className={`h-full rounded-full ${card.progressColor}`}
                  style={{ width: `${card.score}%` }}
                />
              </div>
              <p className="text-3xl font-bold text-gray-800">{card.score}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Skills</h2>
        <div className="mb-6">
          <h3 className="text-gray-600 mb-4">Top Skills in Demand</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-50 rounded-full text-gray-600 text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          {responsibilities.map((resp, index) => (
            <div key={index} className="flex items-center gap-2 mb-3">
              <span className="text-gray-400">-</span>
              <p className="text-gray-600">{resp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrpScore;
