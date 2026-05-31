"use client";

import { useEffect, useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function AdminPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("questions") || "[]");
    setQuestions(saved);
  }, []);

  const handleOptionChange = (value: string, index: number) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addQuestion = () => {
    if (!question || options.some((o) => !o) || !answer) {
      alert("Please fill all fields");
      return;
    }

    const newQuestion: Question = {
      question,
      options,
      answer,
    };

    const updated = [...questions, newQuestion];
    setQuestions(updated);
    localStorage.setItem("questions", JSON.stringify(updated));

    // reset
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");

    alert("✅ Question Added Successfully!");
  };

  const clearAll = () => {
    localStorage.removeItem("questions");
    setQuestions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-white mb-2">
            ⚙️ Admin Panel
          </h1>
          <p className="text-gray-300">
            Create and manage quiz questions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* FORM CARD */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-2xl font-bold text-white mb-6">
              ➕ Add New Question
            </h2>

            <input
              type="text"
              placeholder="Enter Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3 rounded-xl mb-4 bg-white/20 text-white placeholder-gray-300 outline-none"
            />

            <div className="space-y-3 mb-4">
              {options.map((opt, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(e.target.value, index)
                  }
                  className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
                />
              ))}
            </div>

            <input
              type="text"
              placeholder="Correct Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-3 rounded-xl mb-6 bg-white/20 text-white placeholder-gray-300 outline-none"
            />

            <button
              onClick={addQuestion}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              🚀 Add Question
            </button>

            <button
              onClick={clearAll}
              className="w-full mt-3 bg-red-500/80 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition"
            >
              🗑️ Clear All Questions
            </button>

          </div>

          {/* QUESTIONS LIST */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl overflow-auto max-h-[600px]">

            <h2 className="text-2xl font-bold text-white mb-6">
              📋 Questions ({questions.length})
            </h2>

            {questions.length === 0 ? (
              <p className="text-gray-300">
                No questions added yet.
              </p>
            ) : (
              <div className="space-y-4">
                {questions.map((q, index) => (
                  <div
                    key={index}
                    className="bg-white/10 p-4 rounded-xl border border-white/20"
                  >
                    <h3 className="text-white font-bold">
                      {index + 1}. {q.question}
                    </h3>

                    <ul className="text-gray-300 text-sm mt-2">
                      {q.options.map((opt, i) => (
                        <li key={i}>• {opt}</li>
                      ))}
                    </ul>

                    <p className="text-green-300 mt-2 text-sm">
                      ✅ Answer: {q.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}