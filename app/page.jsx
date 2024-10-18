import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-xl py-12 px-4 bg-white bg-opacity-75 shadow-md rounded-lg text-center">
        <h1 className="text-5xl font-extrabold mb-8 text-gray-800">
          Bine ati venit la <br /> Teste de cultura generala
        </h1>
        <p className="text-lg mb-8 text-gray-600">
          Descoperiți cât de bine cunoașteți lumea înconjurătoare!
        </p>
        <Link
          href="/categories"
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Incepeti acum
        </Link>
      </div>
    </div>
  );
}
