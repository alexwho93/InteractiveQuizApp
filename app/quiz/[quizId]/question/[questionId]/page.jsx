import Questionnaire from "./Questionnaire";
import { getQuestions } from "/app/data/getQuestions";
import { notFound } from "next/navigation";

export default async function Question({ params }) {
  const questionsRes = await getQuestions();
  const { quizId, questionId } = params;
  const question = questionsRes[quizId][questionId - 1];

  if (questionId > questionsRes[quizId].length + 1 || questionId <= 0) {
    notFound();
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Questionnaire
        question={question}
        questionId={questionId}
        category={quizId}
        questionsLength={questionsRes[quizId].length}
      />
    </div>
  );
}
