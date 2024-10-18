"use client";
import { useState, useEffect } from "react";

export default function AddQuestionForm() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState({
    category: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setCategories(Object.keys(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetching error:", error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...newQuestion.options];
    newAnswers[index] = value;
    setNewQuestion({ ...newQuestion, options: newAnswers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Storage Object
    let parsedStorage;
    const storage = localStorage.getItem("questions") || "";
    if (storage) {
      parsedStorage = JSON.parse(storage);
    }

    // Form Object
    const formObj = {
      [newQuestion.category]: [
        {
          question: newQuestion.question,
          options: newQuestion.options,
          correct_answer: newQuestion.correctAnswer,
        },
      ],
    };

    // Combine objects and set to local
    localStorage.setItem(
      "questions",
      JSON.stringify(mergeObjects(parsedStorage, formObj))
    );

    alert("Intrebare noua adaugata!");

    function mergeObjects(obj1, obj2) {
      const merged = { ...obj1 };
      for (const category in obj2) {
        if (merged[category]) {
          merged[category] = [...merged[category], ...obj2[category]];
        } else {
          merged[category] = obj2[category];
        }
      }
      return merged;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-75 shadow-md rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Adauga Intrebare Noua</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <select
            name="category"
            value={newQuestion.category}
            onChange={handleInputChange}
            required
            className="border p-2"
          >
            <option value="">Selecteaza o categorie</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="question"
            placeholder="Intrebare?"
            value={newQuestion.question}
            onChange={handleInputChange}
            required
            className="border p-2"
          />

          {newQuestion.options.map((options, index) => (
            <input
              key={index}
              type="text"
              name={`answer${index}`}
              placeholder={`Raspuns ${index + 1}`}
              value={options}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              required
              className="border p-2"
            />
          ))}

          <select
            name="correctAnswer"
            value={newQuestion.correctAnswer}
            onChange={handleInputChange}
            required
            className="border p-2"
          >
            <option value="">Raspuns Corect</option>
            {newQuestion.options.map((options, index) => (
              <option key={index} value={options}>
                {options}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-700 transition duration-300"
          >
            Trimite
          </button>
        </form>
      </div>
    </div>
  );
}
