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
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/questions/categories");
        const data = await res.json();
        Object.keys(data).length !== 0 && setCategories(data);
      } catch (error) {
        console.error("Fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  const handleAnswerChange = (index, value) => {
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: prevQuestion.options.map((option, i) =>
        i === index ? value : option
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing questions from local storage
    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || {};

    // Update questions with the new question
    const updatedQuestions = {
      ...storedQuestions,
      [newQuestion.category]: [
        ...(storedQuestions[newQuestion.category] || []),
        {
          question: newQuestion.question,
          options: newQuestion.options,
          correct_answer: newQuestion.correctAnswer,
        },
      ],
    };

    // Save updated questions to local storage
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));

    alert("Intrebare noua adaugata!");

    // Clear the form fields
    setNewQuestion({
      category: "",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-75 shadow-md rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Adauga Intrebare Noua</h1>
        {isLoading ? (
          <p className="text-gray-500 text-2xl">Loading categories...</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <select
              name="category"
              value={newQuestion.category}
              onChange={handleInputChange}
              required
              className="border p-2"
            >
              <option value="">
                {categories.length === 0
                  ? "Nu s-au gasit categorii"
                  : "Selecteaza o categorie"}
              </option>
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
        )}
      </div>
    </div>
  );
}
