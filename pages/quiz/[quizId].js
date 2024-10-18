import Link from "next/link";
import { useRouter } from "next/router";

export default function Quiz(params) {
  const router = useRouter();
  const categories = router.query.quizId;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-xl py-6 px-16 bg-white shadow-md rounded-lg text-center flex flex-col gap-12">
        <h1 className="text-4xl font-bold">Ai selectat categoria</h1>
        <div className="text-4xl font-medium">{categories.toUpperCase()}</div>
        <Link
          className="text-3xl font-medium text-sky-600 mb-6 hover:opacity-70"
          href={`/quiz/${categories}/0`}
        >
          Click pentru a incepe
        </Link>
      </div>
    </div>
  );
}
