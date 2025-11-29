
import React, { useState } from 'react';
import { NavLink } from "./NavLink";
import { Menu, X, Notebook, LogOut, Sun, Moon } from 'lucide-react'; 
import { useTheme } from "@/contexts/ThemeContext";

interface User {
  username?: string;
}

interface HeaderProps {
  user: User | null; 
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const logoGradient = "bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600";
  
  const baseLinkClasses = "px-3 py-2 rounded-xl font-medium transition-colors duration-200";
  const activeLinkClasses = "text-blue-600 bg-blue-50/70 border border-blue-200";

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-lg border-b border-gray-100 dark:border-gray-800 transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <Notebook className="w-6 h-6 text-blue-500" />
              <span className={`text-2xl font-extrabold ${logoGradient}`}>NoteShareHub</span>
            </NavLink>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors border border-gray-200 dark:border-gray-700 shadow-sm">
              {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
            </button>
            {user ? (
              <>
                <span className="text-gray-700 dark:text-gray-300 font-medium px-3 py-2">Hello, **{user.username || 'User'}**!</span>
                
                <NavLink 
                    to="/dashboard" 
                    className={`${baseLinkClasses} text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800`}
                    activeClassName={activeLinkClasses}
                >
                    Dashboard
                </NavLink>

                <button
                  onClick={handleLogout} 
                  className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors duration-200 px-3 py-2 rounded-xl font-medium hover:bg-red-50 dark:hover:bg-red-900/50"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavLink 
                    to="/login" 
                    className={`${baseLinkClasses} text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-sm`}
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

          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden transition-all duration-300 ease-out border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95`}>
        <div className="pt-2 pb-3 space-y-2 px-4">
          {user ? (
            <>
              <NavLink 
                to="/dashboard" 
                className="block text-base font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 p-2"
                activeClassName="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
              >
                Dashboard
              </NavLink>
              <button 
                onClick={handleLogout} 
                className="w-full text-left flex items-center space-x-2 p-2 text-base font-medium text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/50"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavLink 
                to="/login" 
                className="block text-base font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 p-2"
                activeClassName="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
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
