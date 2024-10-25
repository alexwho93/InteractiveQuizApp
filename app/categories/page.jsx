"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState(null);
  const [isLoading, setLoading] = useState(true);

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

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    );
  if (!categories)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-lg text-red-500">No categories found.</p>
      </div>
    );

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-3xl py-12 px-36 bg-white bg-opacity-75 shadow-md rounded-lg text-center">
        <h1 className="text-5xl font-extrabold mb-8 text-gray-800">
          Categorii
        </h1>
        <ul className="text-2xl text-sky-600 flex flex-col items-center gap-4">
          {categories.map((category) => (
            <li key={category}>
              <Link className="hover:opacity-70" href={`/quiz/${category}`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
