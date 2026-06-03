import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? 'text-primary border-b-2 border-primary font-semibold'
      : 'text-slate-600 hover:text-primary transition-colors duration-200';
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-all duration-300">
              <Leaf className="h-6 w-6 text-primary transition-transform duration-500 group-hover:rotate-12" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">
              Plant<span className="text-primary font-black">AI</span>
            </span>
          </Link>
          
          <nav className="flex space-x-8">
            <Link to="/" className={`py-2 px-1 text-sm ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/about" className={`py-2 px-1 text-sm ${isActive('/about')}`}>
              About Project
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
