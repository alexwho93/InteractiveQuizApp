import "./globals.css";
import Navbar from "@components/Navbar";
import { ScoreProvider } from "@context/ScoreContext";

export const metadata = {
  title: " Interactive Quiz App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 h-screen flex flex-col items-center justify-center">
        <Navbar />
        <ScoreProvider>{children}</ScoreProvider>
      </body>
    </html>
  );
}
