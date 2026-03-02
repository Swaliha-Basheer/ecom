import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative flex items-center justify-between border border-slate-700 mx-4 px-6 py-4 rounded-full text-white bg-black">
      
      {/* LEFT - Logo */}
      <div className="flex items-center">
        <a href="/" className="flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <circle cx="4.706" cy="16" r="4.706" fill="#fff" />
            <circle cx="16.001" cy="4.706" r="4.706" fill="#fff" />
            <circle cx="16.001" cy="27.294" r="4.706" fill="#fff" />
            <circle cx="27.294" cy="16" r="4.706" fill="#fff" />
          </svg>
          <span className="text-lg font-semibold">Silitech</span>
        </a>
      </div>

      {/* CENTER - Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {["Home", "Products", "About", "Contact"].map((item) => (
          <a
            key={item}
            href="#"
            className="relative overflow-hidden h-6 group"
          >
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              {item}
            </span>
            <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300">
              {item}
            </span>
          </a>
        ))}
      </div>

      {/* RIGHT - Login Button (Desktop) */}
      <div className="hidden md:flex items-center">
        <button className="border border-gray-400 hover:bg-gray-800 px-5 py-2 rounded-full text-sm font-medium transition">
          Login
        </button>
      </div>

      {/* MOBILE HAMBURGER */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-black flex flex-col items-center gap-6 py-6 md:hidden rounded-2xl">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <a key={item} href="#" className="hover:text-indigo-400">
              {item}
            </a>
          ))}
          <button className="border border-slate-600 hover:bg-slate-800 px-5 py-2 rounded-full text-sm font-medium transition">
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;