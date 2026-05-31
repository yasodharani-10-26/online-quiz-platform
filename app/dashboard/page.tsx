"use client";

import { useEffect, useState } from "react";

type Player = {
  username: string;
  score: number;
};

type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function DashboardPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const leaderboard = JSON.parse(
      localStorage.getItem("leaderboard") || "[]"
    );
    const qs = JSON.parse(localStorage.getItem("questions") || "[]");

    setPlayers(leaderboard);
    setQuestions(qs);
  }, []);

  const totalAttempts = players.length;

  const avgScore =
    players.length > 0
      ? (
          players.reduce((acc, p) => acc + p.score, 0) /
          players.length
        ).toFixed(1)
      : 0;

  const maxScore =
    players.length > 0
      ? Math.max(...players.map((p) => p.score))
      : 0;

  const minScore =
    players.length > 0
      ? Math.min(...players.map((p) => p.score))
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-white mb-2">
            📊 Dashboard
          </h1>
          <p className="text-gray-300">
            Quiz performance analytics overview
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl text-center">
            <h2 className="text-gray-300">Users</h2>
            <p className="text-3xl font-bold text-white">
              {players.length}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl text-center">
            <h2 className="text-gray-300">Questions</h2>
            <p className="text-3xl font-bold text-white">
              {questions.length}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl text-center">
            <h2 className="text-gray-300">Avg Score</h2>
            <p className="text-3xl font-bold text-green-400">
              {avgScore}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl text-center">
            <h2 className="text-gray-300">Attempts</h2>
            <p className="text-3xl font-bold text-yellow-400">
              {totalAttempts}
            </p>
          </div>

        </div>

        {/* PERFORMANCE BARS */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-10">

          <h2 className="text-white text-2xl font-bold mb-6">
            📈 Performance Overview
          </h2>

          <div className="space-y-4">

            {/* MAX */}
            <div>
              <div className="flex justify-between text-white mb-1">
                <span>Max Score</span>
                <span>{maxScore}</span>
              </div>
              <div className="w-full bg-gray-700 h-3 rounded-full">
                <div
                  className="h-3 bg-green-500 rounded-full"
                  style={{ width: `${maxScore * 10}%` }}
                />
              </div>
            </div>

            {/* AVG */}
            <div>
              <div className="flex justify-between text-white mb-1">
                <span>Average Score</span>
                <span>{avgScore}</span>
              </div>
              <div className="w-full bg-gray-700 h-3 rounded-full">
                <div
                  className="h-3 bg-blue-500 rounded-full"
                  style={{ width: `${Number(avgScore) * 10}%` }}
                />
              </div>
            </div>

            {/* MIN */}
            <div>
              <div className="flex justify-between text-white mb-1">
                <span>Min Score</span>
                <span>{minScore}</span>
              </div>
              <div className="w-full bg-gray-700 h-3 rounded-full">
                <div
                  className="h-3 bg-red-500 rounded-full"
                  style={{ width: `${minScore * 10}%` }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* INSIGHTS */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">

          <h2 className="text-white text-2xl font-bold mb-4">
            🧠 Insights
          </h2>

          {players.length === 0 ? (
            <p className="text-gray-300">
              No data available yet.
            </p>
          ) : (
            <ul className="text-gray-300 space-y-2">
              <li>
                🔥 Total quiz attempts: {totalAttempts}
              </li>
              <li>
                📊 Average performance is {avgScore}
              </li>
              <li>
                🏆 Highest score recorded: {maxScore}
              </li>
              <li>
                📉 Lowest score recorded: {minScore}
              </li>
              <li>
                🎯 Total questions created: {questions.length}
              </li>
            </ul>
          )}

        </div>

      </div>

    </div>
  );
}