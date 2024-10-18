import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-xl py-8 px-36 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-4xl font-medium text-center mb-6">Categorii:</h1>
        <ul className="text-2xl text-sky-600 flex flex-col items-center gap-4">
          <li>
            <Link className="hover:opacity-70" href="/quiz/geografie">
              Geografie
            </Link>
          </li>
          <li>
            <Link className="hover:opacity-70" href="/quiz/sport">
              Sport
            </Link>
          </li>
          <li>
            <Link className="hover:opacity-70" href="/quiz/anatomie">
              Anatomie
            </Link>
          </li>
          <li>
            <Link className="hover:opacity-70" href="/quiz/chimie">
              Chimie
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
