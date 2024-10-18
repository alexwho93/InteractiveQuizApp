import Link from "next/link";

export default function Quiz({ params }) {
  const categories = params.quizId;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-12 max-w-2xl py-6 px-8 bg-white bg-opacity-75 shadow-md rounded-lg text-center">
        <h1 className="text-5xl font-extrabold  text-gray-800">
          Ai selectat categoria
        </h1>
        <div className="text-4xl font-medium">{categories.toUpperCase()}</div>
        <Link
          className="text-3xl font-medium text-sky-600 mb-6 hover:opacity-70"
          href={`/quiz/${categories}/question/1`}
        >
          Click pentru a incepe
        </Link>
      </div>
    </div>
  );
}
