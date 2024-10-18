import "./globals.css";
import Navbar from "./Navbar";

export const metadata = {
  title: "Quiz App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
