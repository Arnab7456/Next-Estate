import React from "react";
import { Twitter, Linkedin, Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-transparent  text-inherit  py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-6">
          <div className="text-lg font-bold text-inherit">Nest Scout</div>

          <div className="mt-4 md:mt-0 flex flex-wrap justify-center space-x-6">
            <Link href="/" className="hover:text-blue-500">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-500">
              About Us
            </Link>
            <Link href="/services" className="hover:text-blue-500">
              Services
            </Link>
            <Link href="/contact" className="hover:text-blue-500">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-6">
          <Link
            href="https://x.com/Arnab_devops"
            target="_blank"
            className="hover:text-blue-500"
          >
            <Twitter size={24} />
          </Link>
          <Link
            href="https://www.github.com/Arnab7456"
            target="_blank"
            className="hover:text-blue-500"
          >
            <Github size={24} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/arnab-das7456/"
            target="_blank"
            className="hover:text-blue-500"
          >
            <Linkedin size={24} />
          </Link>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          &copy; 2024 Nest Scout. All rights reserved. | Crafted with ❤️ by
          Arnab
        </div>
      </div>
    </footer>
  );
};

export default Footer;
