"use client";

import { useEffect } from "react";
import Link from "next/link";

function FinalScore({ totalQuestions }) {
  const score =
    typeof window !== "undefined" ? sessionStorage.getItem("score") : 0;
  const feedbackMessage =
    score / totalQuestions > 0.8
      ? "Excelent! Ai făcut o treabă grozavă!"
      : "Bine lucrat! Continuă să exersezi și vei deveni și mai bun!";

  useEffect(() => {
    sessionStorage.setItem("score", "0");
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-3xl py-12 px-16 bg-white bg-opacity-75 shadow-md rounded-lg text-center">
        <h1 className="text-5xl font-extrabold mb-8 text-gray-800">
          Punctajul Final
        </h1>
        <p className="text-3xl text-gray-700 mb-4">
          Punctaj: <span className="text-green-500">{score}</span>
        </p>
        <p className="text-2xl text-gray-700 mb-4">
          Numărul de răspunsuri corecte:{" "}
          <span className="text-green-500">{score}</span> din {totalQuestions}
        </p>
        <p className="text-xl text-gray-600">{feedbackMessage}</p>
        <Link
          className="block text-3xl font-medium text-sky-600 mt-4 hover:opacity-70"
          href={`/categories`}
        >
          Intoarcete la categorii
        </Link>
      </div>
    </div>
  );
}

export default FinalScore;
