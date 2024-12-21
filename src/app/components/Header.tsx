"use client";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isSignedIn } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      toast.success("Welcome back!");
    }
  }, [isSignedIn]);

  if (!mounted) return null;

  const handleSignInToast = () => toast.success("Welcome! Please sign in.");
  const handleSignUpToast = () => toast.success("Create an account to get started.");

  return (
    <header className="w-full  bg-transparent shadow-md relative">
      <Toaster position="bottom-left" reverseOrder={true} />
      <div className="flex justify-between items-center max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <h1 className="font-bold text-lg sm:text-2xl gap-1 flex items-center">
            <span className="text-blue-500">Nest</span>
            <span className="text-slate-700">Scout</span>
          </h1>
        </Link>
        <form className="flex items-center bg-slate-100 dark:bg-transparent border px-2 py-2 md:px-24 rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full sm:w-64 text-black dark:text-white"
          />
          <button className="">
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-slate-700 focus:outline-none"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        <ul className="hidden md:flex items-center gap-4">
          <Link href="/">
            <li className="text-slate-700 hover:text-blue-700 rounded-lg px-3 py-2">
              Home
            </li>
          </Link>
          <Link href="/about">
            <li className="text-slate-700 hover:text-blue-700 rounded-lg px-3 py-2">
              About
            </li>
          </Link>

          <li>
            <div
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex items-center justify-center h-10 w-10 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {theme === "dark" ? (
                <Sun className="text-yellow-500 w-5 h-5" />
              ) : (
                <Moon className="text-gray-800 w-5 h-5" />
              )}
            </div>
          </li>

          <SignedOut>
            <Link href="/sign-up" onClick={handleSignUpToast}>
              <Button className="text-lg font-medium bg-gradient-to-b from-blue-400 to-blue-700 text-white rounded-md transition-all duration-300 hover:opacity-80">
                SignUp
              </Button>
            </Link>
            <Link href="/sign-in" onClick={handleSignInToast}>
              <Button className="text-lg font-medium text-black bg-white border rounded-md transition-all duration-300 hover:bg-slate-200 opacity-80">
                LogIn
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <Link href="/create/listing">
              <Button>Dashboard</Button>
            </Link>
            <UserButton />
          </SignedIn>
        </ul>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-black md:hidden shadow-lg z-50">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <Link
                href="/"
                className="block py-2 hover:text-blue-600 dark:hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block py-2 hover:text-blue-600 dark:hover:text-blue-600"
              >
                About
              </Link>

              <div
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-between py-2 cursor-pointer"
              >
                <span>Switch Theme</span>
                {theme === "dark" ? (
                  <Sun className="text-yellow-500 w-5 h-5" />
                ) : (
                  <Moon className="text-gray-800 w-5 h-5" />
                )}
              </div>

              <SignedOut>
                <div className="flex flex-col gap-2">
                  <Link href="/sign-up" onClick={handleSignUpToast}>
                    <Button className="w-full text-lg font-medium bg-gradient-to-b from-blue-400 to-blue-700 text-white rounded-md transition-all duration-300 hover:opacity-80">
                      SignUp
                    </Button>
                  </Link>
                  <Link href="/sign-in" onClick={handleSignInToast}>
                    <Button className="w-full text-lg font-medium text-black bg-white border rounded-md transition-all duration-300 hover:bg-slate-200 opacity-80">
                      LogIn
                    </Button>
                  </Link>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="flex flex-col gap-2">
                  <Link href="/create-listing">
                    <Button className="w-full">Dashboard</Button>
                  </Link>
                  <div className="flex justify-center py-2">
                    <UserButton />
                  </div>
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
