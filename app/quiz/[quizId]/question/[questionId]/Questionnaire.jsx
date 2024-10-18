"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FinalScore from "./FinalScore";

function Questionnaire({ question, category, questionId, questionsLength }) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const increaseScore = () => {
    if (!sessionStorage.getItem("score")) {
      sessionStorage.setItem("score", "0");
    }
    sessionStorage.setItem(
      "score",
      String(Number(sessionStorage.getItem("score")) + 1)
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    const answer = e.currentTarget.elements.userAnswer.value;

    if (question.correct_answer === answer) {
      setIsCorrect(true);
      increaseScore();
    }

    setShowFeedback(true);
  }

  return questionId > questionsLength ? (
    <FinalScore totalQuestions={questionsLength} />
  ) : (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl py-6 px-8 bg-white bg-opacity-75 shadow-md rounded-lg"
    >
      <fieldset className="grid grid-cols-2 auto-rows-auto gap-6 text-2xl items-center">
        <legend className="text-3xl font-extrabold text-center col-span-2 text-gray-800 mb-8">
          <span className="text-2xl">
            (Intrebarea nr. {questionId} din {questionsLength})
          </span>
          <br />
          {question.question}
        </legend>
        <div className="grid grid-cols-2 gap-4 col-span-2">
          {question.options.map((option) => (
            <label key={option}>
              <input
                className="mr-2 h-6 w-6 text-sky-600 border-gray-300 focus:ring-sky-500 cursor-pointer"
                type="radio"
                name="userAnswer"
                value={option}
                required
              />
              {option}
            </label>
          ))}
        </div>

        {
          <div className="text-center col-span-2" hidden={!showFeedback}>
            {isCorrect ? (
              <span className="text-green-500">Corect!</span>
            ) : (
              <span className="text-red-500">
                Gresit! Raspunsul corect este {question.correct_answer}
              </span>
            )}
          </div>
        }

        {showFeedback ? (
          <Link
            href={`/quiz/${category}/question/${Number(questionId) + 1}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer col-span-2 w-64 mx-auto text-center"
          >
            Next
          </Link>
        ) : (
          <input
            type="submit"
            value="Submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer col-span-2 w-64 mx-auto"
          />
        )}
      </fieldset>
    </form>
  );
}

export default Questionnaire;
