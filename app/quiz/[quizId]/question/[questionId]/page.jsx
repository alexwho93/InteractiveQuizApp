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
    const localData = JSON.parse(localStorage.getItem("questions")) || "";
    let localQuestions;
    if (Object.keys(localData).includes(quizId)) {
      localQuestions = localData[quizId];
    }

    fetch(`/api/questions/${quizId}`)
      .then((res) => res.json())
      .then((allData) => {
        localQuestions
          ? setQuestions([...allData.data, ...localQuestions])
          : setQuestions([...allData.data]);
        setLoading(false);
      });
  }, []);

  // wait for data
  if (isLoading) return <p>Loading...</p>;
  if (!questions) return <p>No data</p>;

  // when questions are finished
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
