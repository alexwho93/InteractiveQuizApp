"use client";

import { useState, useEffect } from "react";
import { useScore } from "@context/ScoreContext";
import { notFound } from "next/navigation";
import Questionnaire from "@components/Questionnaire";
import FinalScore from "@components/FinalScore";

export default function Question({ params }) {
  const [questions, setQuestions] = useState(null);
  const [localQuestions, setLocalQuestions] = useState(null);
  const { setScore } = useScore();
  const [isLoading, setLoading] = useState(true);
  const { quizId, questionId } = params;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/questions/${quizId}`);
        const allData = await res.json();

        const localData = JSON.parse(localStorage.getItem("questions")) || {};
        const localQuestions = quizId in localData ? localData[quizId] : [];

        setQuestions([...allData.data, ...localQuestions]);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId]);

  // Wait for data
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    );
  if (!questions)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-lg text-red-500">
          No data found for this quiz.
        </p>
      </div>
    );

  // When questions are finished
  const question = questions[questionId - 1];
  if (!question && questions.length + 1 >= questionId && questionId > 0) {
    return <FinalScore totalQuestions={questions.length}></FinalScore>;
  } else if (!question) {
    return notFound();
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Questionnaire
        question={questions[questionId - 1]}
        questionId={questionId}
        questionsLength={questions.length}
        nextLink={`/quiz/${quizId}/question/${Number(questionId) + 1}`}
        increaseScore={() => setScore((prevScore) => prevScore + 1)}
      />
    </div>
  );
}
