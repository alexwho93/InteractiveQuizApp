"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setCategories(Object.keys(data));
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!categories) return <p>No data</p>;

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
