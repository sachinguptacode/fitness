import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

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
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm transition duration-200 ${
                    isActive ? 'text-blue-400' : 'hover:text-gray-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
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
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-sm ${
                  isActive ? 'text-blue-400' : 'text-white hover:text-gray-300'
                }`
              }
            >
              {item.label}
            </NavLink>
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
