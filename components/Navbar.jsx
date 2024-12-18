"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const isCurrentPage = (href) => href === pathname;
  const linkStyles =
    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0";
  const linkStylesActive =
    "block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 active";
  return (
    <nav className="bg-white border-gray-200 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div
          className="hidden w-full md:block md:w-auto mx-auto"
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                href="/"
                className={isCurrentPage("/") ? linkStylesActive : linkStyles}
              >
                Acasa
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className={
                  isCurrentPage("/categories") ? linkStylesActive : linkStyles
                }
              >
                Categorii
              </Link>
            </li>
            <li>
              <Link
                href="/add-question"
                className={
                  isCurrentPage("/add-question") ? linkStylesActive : linkStyles
                }
              >
                Adauga Intrebari
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
