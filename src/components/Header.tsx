// src/components/Header.tsx (NEW FILE FOR THE VISUAL NAVBAR LAYOUT)

import React, { useState } from 'react';
import { NavLink } from "./NavLink"; // Imports the utility from the same folder
import { Menu, X, Notebook, LogOut } from 'lucide-react'; 

// NOTE: Ensure your User type definition is consistent across the project
interface User {
  username?: string;
}

interface HeaderProps {
  user: User | null; 
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Gradient for the logo
  const logoGradient = "bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600";
  
  // Base styling for all NavLink items
  const baseLinkClasses = "px-3 py-2 rounded-xl font-medium transition-colors duration-200";
  // Active state styling applied via the Navlink utility
  const activeLinkClasses = "text-blue-600 bg-blue-50/70 border border-blue-200";

  return (
    // Applied soft glassmorphism effect (bg-white/90 + backdrop-blur) and soft shadow
    <nav className="sticky top-0 z-40 w-full backdrop-blur-sm bg-white/90 shadow-lg border-b border-gray-100 transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo/Title */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <Notebook className="w-6 h-6 text-blue-500" />
              <span className={`text-2xl font-extrabold ${logoGradient}`}>NoteShareHub</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {user ? ( // Logged In View (e.g., Dashboard)
              <>
                <span className="text-gray-700 font-medium px-3 py-2">Hello, **{user.username || 'User'}**!</span>
                
                <NavLink 
                    to="/dashboard" 
                    className={`${baseLinkClasses} text-gray-700 hover:text-blue-500 hover:bg-gray-100`}
                    activeClassName={activeLinkClasses}
                >
                    Dashboard
                </NavLink>

                <button
                  onClick={handleLogout} 
                  className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors duration-200 px-3 py-2 rounded-xl font-medium hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : ( // Logged Out View (Landing Page)
              <>
                <NavLink 
                    to="/login" 
                    className={`${baseLinkClasses} text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 shadow-sm`}
                    activeClassName={activeLinkClasses}
                >
                    Login
                </NavLink>

                <NavLink 
                  to="/register" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-lg 
                             text-white bg-gradient-to-r from-purple-500 to-blue-600 
                             hover:from-purple-600 hover:to-blue-700 transition-all duration-250 ease-in-out"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors border border-gray-200 shadow-sm"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden transition-all duration-300 ease-out border-t border-gray-200 bg-white/95`}>
        <div className="pt-2 pb-3 space-y-2 px-4">
          {user ? (
            <>
              <NavLink 
                to="/dashboard" 
                className="block text-base font-medium text-gray-700 rounded-xl hover:bg-gray-50 p-2"
                activeClassName="bg-blue-100 text-blue-700"
              >
                Dashboard
              </NavLink>
              <button 
                onClick={handleLogout} 
                className="w-full text-left flex items-center space-x-2 p-2 text-base font-medium text-red-500 rounded-xl hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavLink 
                to="/login" 
                className="block text-base font-medium text-gray-700 rounded-xl hover:bg-gray-50 p-2"
                activeClassName="bg-blue-100 text-blue-700"
              >
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                className="w-full text-center block px-3 py-2 text-base font-medium text-white rounded-xl bg-blue-500 hover:bg-blue-600"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;