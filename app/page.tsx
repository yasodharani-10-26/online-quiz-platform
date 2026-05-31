"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-6">

      <div className="w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10">

        {/* HERO SECTION */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
            🚀 Online Quiz Platform
          </h1>

          <p className="text-gray-600 text-lg md:text-xl">
            Test your knowledge, track progress, and compete with others in real-time.
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl shadow hover:scale-105 transition">
            <h2 className="text-xl font-bold mb-2">⚡ Fast Quiz</h2>
            <p className="text-gray-600 text-sm">
              Instant loading questions with smooth experience.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl shadow hover:scale-105 transition">
            <h2 className="text-xl font-bold mb-2">🏆 Leaderboard</h2>
            <p className="text-gray-600 text-sm">
              Compete with others and see top scorers.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-2xl shadow hover:scale-105 transition">
            <h2 className="text-xl font-bold mb-2">📊 Analytics</h2>
            <p className="text-gray-600 text-sm">
              Track your performance and improvement.
            </p>
          </div>

        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">

          <Link
            href="/quiz"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-center font-bold shadow-lg transition"
          >
            🎯 Start Quiz
          </Link>

          <Link
            href="/admin"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl text-center font-bold shadow-lg transition"
          >
            ⚙️ Admin Panel
          </Link>

          <Link
            href="/leaderboard"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl text-center font-bold shadow-lg transition"
          >
            🏆 Leaderboard
          </Link>

        </div>

        {/* FOOTER TEXT */}
        <p className="text-center text-gray-500 mt-10 text-sm">
          Built with Next.js ⚡ | Modern Quiz Experience
        </p>

      </div>

    </main>
  );
}