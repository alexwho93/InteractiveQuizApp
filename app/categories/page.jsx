import Link from "next/link";
import { getQuestions } from "/app/data/getQuestions";

export default async function Categories() {
  const questions = await getQuestions();
  const categories = Object.keys(questions);

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
