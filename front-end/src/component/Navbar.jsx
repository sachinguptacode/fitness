import React, { useState } from 'react';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[#0b1120] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-white text-2xl font-bold">G</div>
            <span className="text-white text-xl font-semibold">TailGrids</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {['Home', 'About Us', 'Services', 'Blog', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm hover:text-gray-300 transition duration-200"
              >
                {item}
              </a>
            ))}

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search here..."
                className="px-4 py-1 rounded-full text-sm bg-[#0f172a] placeholder-gray-400 text-white focus:outline-none"
              />
              <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-4 pb-4 space-y-4 bg-[#0b1120]">
          {['Home', 'About Us', 'Services', 'Blog', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-sm text-white hover:text-gray-300"
            >
              {item}
            </a>
          ))}
          {/* Mobile search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full px-4 py-2 rounded-full text-sm bg-[#0f172a] placeholder-gray-400 text-white focus:outline-none"
            />
            <FiSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;