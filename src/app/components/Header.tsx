"use client";
import { FaSearch } from "react-icons/fa";
import { Sun, Moon} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className=" w-full backdrop-blur-lg bg-transparent shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto py-3">
        <Link href="/">
          <h1 className="font-bold text-lg sm:text-2xl gap-1 flex items-center">
            <span className="text-blue-500">Nest</span>
            <span className="text-slate-700">Scout</span>
          </h1>
        </Link>

        <form className="bg-slate-100 px-10 py-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-32 sm:w-64 text-slate-600"
          />
          <button className="ml-2">
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <ul className="flex items-center gap-4">
          <Link href="/">
            <li className="hidden md:inline text-slate-700 hover:text-blue-700 rounded-lg px-3 py-2">
              Home
            </li>
          </Link>
          <Link href="/about">
            <li className="hidden md:inline text-slate-700 hover:text-blue-700 rounded-lg px-3 py-2">
              About
            </li>
          </Link>

          <li>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme("light")}
                className={`p-2 rounded-lg ${
                  theme === "light" ? "bg-blue-200" : "hover:bg-slate-300"
                }`}
                aria-label="Light Mode"
              >
                <Sun className="text-yellow-500 w-5 h-5" />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`p-2 rounded-lg ${
                  theme === "dark" ? "bg-blue-200" : "hover:bg-slate-300"
                }`}
                aria-label="Dark Mode"
              >
                <Moon className="text-gray-800 w-5 h-5" />
              </button>
            </div>
          </li>
              
          <SignedOut>
            <Link href="/sign-up">
              <Button className="text-lg font-medium bg-gradient-to-b from-blue-400 to-blue-700 text-white rounded-md transition-all duration-300 hover:opacity-80">
                SignUp
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button className="text-lg font-medium text-black bg-white border rounded-md transition-all duration-300 hover:bg-slate-200 opacity-80">
                LogIn
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <Link href="/create-listing">
                <Button> Dashboard</Button>
            </Link>
            <UserButton />
          </SignedIn>
        </ul>
      </div>
    </header>
  );
}
