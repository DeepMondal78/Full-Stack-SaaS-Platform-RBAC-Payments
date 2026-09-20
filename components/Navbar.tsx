"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  // Page load hole ager state check korbe
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  };

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50 px-6 py-4 transition-colors">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-blue-500/30">
            S
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">SaaS Platform</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
          <Link href="/products" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Products</Link>
          <Link href="/#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Features</Link>
          <Link href="/#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Pricing</Link>
        </nav>

        {/* Right Actions: Theme Toggle & Auth Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Dark / Light Mode Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
            title="Toggle Theme"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* Login Button */}
          <Link 
            href="/login" 
            className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white px-3 py-2 transition"
          >
            Login
          </Link>

          {/* Register Button */}
          <Link 
            href="/register" 
            className="text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl transition shadow-lg shadow-blue-600/20"
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}