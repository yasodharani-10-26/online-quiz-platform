"use client";

import { useEffect, useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const savedQuestions = JSON.parse(
      localStorage.getItem("questions") || "[]"
    );

    setQuestions(savedQuestions);
  }, []);

  useEffect(() => {
    if (score !== null) return;

    if (timeLeft === 0) {
      submitQuiz();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, score]);

  const submitQuiz = () => {
    if (!username.trim()) {
      alert("Please enter your name");
      return;
    }

    let total = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        total++;
      }
    });

    setScore(total);

    const leaderboard = JSON.parse(
      localStorage.getItem("leaderboard") || "[]"
    );

    leaderboard.push({
      username,
      score: total,
    });

    localStorage.setItem(
      "leaderboard",
      JSON.stringify(leaderboard)
    );
  };

  const progress =
    questions.length > 0
      ? (answers.filter(Boolean).length /
          questions.length) *
        100
      : 0;

  const getBadge = () => {
    if (score === null) return "";

    if (score === questions.length)
      return "👑 Quiz Master";
    if (score >= questions.length * 0.8)
      return "🏅 Expert";
    if (score >= questions.length * 0.5)
      return "⭐ Intermediate";

    return "🚀 Beginner";
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="text-2xl font-bold text-center">
            No Questions Available
          </h1>
          <p className="text-center text-gray-500 mt-2">
            Add questions from Admin Panel
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-5xl font-bold text-center mb-6">
          🎯 Online Quiz Challenge
        </h1>

        <div className="grid md:grid-cols-2 gap-4 mb-6">

          <div className="bg-red-100 border border-red-300 p-4 rounded-xl">
            <h2 className="font-bold text-red-600">
              ⏳ Time Left: {timeLeft}s
            </h2>
          </div>

          <div className="bg-blue-100 border border-blue-300 p-4 rounded-xl">
            <h2 className="font-bold text-blue-700">
              📝 Answered: {answers.filter(Boolean).length}/{questions.length}
            </h2>
          </div>

        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">
              Progress
            </span>

            <span className="font-semibold">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full bg-gray-300 h-4 rounded-full">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="Enter Your Name"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full border p-4 rounded-xl mb-8"
        />

        {questions.map((q, index) => (
          <div
            key={index}
            className="bg-gray-50 border rounded-2xl p-6 mb-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-4">
              {index + 1}. {q.question}
            </h2>

            <div className="space-y-3">
              {q.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-purple-50"
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => {
                      const newAnswers = [...answers];
                      newAnswers[index] = option;
                      setAnswers(newAnswers);
                    }}
                  />

                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={submitQuiz}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl text-lg font-bold hover:scale-[1.02] transition"
        >
          Submit Quiz 🚀
        </button>

        {score !== null && (
          <div className="mt-8 bg-green-100 border border-green-300 rounded-2xl p-8 text-center">

            <h2 className="text-4xl font-bold text-green-700 mb-3">
              🎉 Your Score: {score}/{questions.length}
            </h2>

            <p className="text-2xl font-bold mb-2">
              {getBadge()}
            </p>

            <p className="text-gray-600">
              Great job, {username}!
            </p>

          </div>
        )}
      </div>
    </div>
  );
}