"use client";

import { useEffect, useState } from "react";

type Player = {
  username: string;
  score: number;
};

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("leaderboard") || "[]");

    const sorted = data.sort((a: Player, b: Player) => b.score - a.score);
    setPlayers(sorted);
  }, []);

  const top3 = players.slice(0, 3);
  const rest = players.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-white mb-2">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-300">
            Top performers ranked by score
          </p>
        </div>

        {/* PODIUM */}
        <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-12">

          {/* 2nd */}
          {top3[1] && (
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl text-center w-60 h-64 flex flex-col justify-end shadow-xl">
              <div className="text-3xl">🥈</div>
              <h2 className="text-white font-bold text-xl mt-2">
                {top3[1].username}
              </h2>
              <p className="text-gray-300">Score: {top3[1].score}</p>
            </div>
          )}

          {/* 1st */}
          {top3[0] && (
            <div className="bg-gradient-to-b from-yellow-300/30 to-yellow-500/20 backdrop-blur-lg border border-yellow-300 p-8 rounded-2xl text-center w-64 h-72 flex flex-col justify-end shadow-2xl scale-110">
              <div className="text-5xl">👑</div>
              <h2 className="text-white font-bold text-2xl mt-2">
                {top3[0].username}
              </h2>
              <p className="text-yellow-200 font-bold">
                Score: {top3[0].score}
              </p>
            </div>
          )}

          {/* 3rd */}
          {top3[2] && (
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl text-center w-60 h-64 flex flex-col justify-end shadow-xl">
              <div className="text-3xl">🥉</div>
              <h2 className="text-white font-bold text-xl mt-2">
                {top3[2].username}
              </h2>
              <p className="text-gray-300">Score: {top3[2].score}</p>
            </div>
          )}

        </div>

        {/* REST OF USERS */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-2xl">

          <h2 className="text-white text-2xl font-bold mb-4">
            📊 All Rankings
          </h2>

          {players.length === 0 ? (
            <p className="text-gray-300">No scores yet.</p>
          ) : (
            <div className="space-y-3">
              {players.map((p, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold">
                      #{index + 1}
                    </span>
                    <span className="text-white">
                      {p.username}
                    </span>
                  </div>

                  <span className="text-green-300 font-bold">
                    {p.score}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}