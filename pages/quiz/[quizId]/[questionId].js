import { useState, useEffect } from "react";
import { questionsAll } from "./_questions";
import { useParams } from "next/navigation";

export default function Question() {
  const path = useParams();

  const [categories, setCategories] = useState(path.quizId);
  const [questions, setQuestions] = useState(questionsAll[categories]);
  const [questionNumber, setQuestionNumber] = useState(path.questionId);
  const [index, setIndex] = useState(0);

  return (
    <div className="h-screen flex items-center justify-center">
      <form className="max-w-lg mx-auto py-6 px-8 bg-white shadow-md rounded-lg">
        <fieldset className="grid grid-cols-2 auto-rows-auto gap-4 text-lg">
          <legend className="text-xl font-semibold mb-4 text-center col-span-2">
            (Intrebarea nr. {String(Number(index) + 1)}) <br />
            {questions[index].question}
          </legend>
          <div className="flex flex-col col-span-1 gap-4 w-max">
            <label>
              <input
                className="mr-1"
                type="radio"
                name="user-answer"
                value={questions[index].a}
              />
              {questions[index].a}
            </label>
            <label>
              <input
                className="mr-1"
                type="radio"
                name="user-answer"
                value={questions[index].b}
              />
              {questions[index].b}
            </label>
          </div>
          <div className="flex flex-col col-span-1 gap-4 w-max">
            <label>
              <input
                className="mr-1"
                type="radio"
                name="user-answer"
                value={questions[index].c}
              />
              {questions[index].c}
            </label>
            <label className="block mb-4">
              <input
                className="mr-1"
                type="radio"
                name="user-answer"
                value={questions[index].d}
              />
              {questions[index].d}
            </label>
          </div>

          <input
            type="button"
            value="Submit"
            onClick={() => index < questions.length - 1 && setIndex(index + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer col-span-2"
          />
        </fieldset>
      </form>
    </div>
  );
}
