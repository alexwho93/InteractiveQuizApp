import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-xl py-12 px-4 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-16">
          Bine ati venit la <br /> Teste de cultura generala
        </h1>
        <Link
          className="text-3xl font-medium mb-6 text-sky-600 hover:opacity-70"
          href="/categories"
        >
          Vezi categorii
        </Link>
      </div>
    </div>
  );
}
