import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = {
    about: {
      title: "About",
      path: "/about",
    },
    academics: {
      title: "Academics",
      path: "/academics",
    },
    faculty: {
      title: "Faculty",
      path: "/faculty",
    },
    facilities: {
      title: "Facilities",
      path: "/facilities",
    },
  };

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/tce-logo.png" alt="IT Department" className="h-8 w-10" />
            <span className="font-bold text-3xl">TCE IT</span>
          </Link>

          <div className="hidden md:flex space-x-4 text-xl">
            {Object.entries(navItems).map(([key, item]) => (
              <Link
                key={key}
                to={item.path}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#00FF1A] hover:text-black transition-colors duration-200"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[#00FF1A] hover:text-black transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black">
          {Object.entries(navItems).map(([key, item]) => (
            <Link
              key={key}
              to={item.path}
              className="block px-3 py-2 text-base font-medium text-white hover:bg-[#00FF1A] hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
