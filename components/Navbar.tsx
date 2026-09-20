"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50 px-6 py-4 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo with hover scale */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-blue-500/30">
              S
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">SaaS Platform</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
          {["Home", "Products", "Features", "Pricing"].map((item, idx) => {
            const href = item === "Home" ? "/" : item === "Products" ? "/products" : `/#${item.toLowerCase()}`;
            return (
              <motion.div key={item} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href={href} className="hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">
                  {item}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Right Actions (Desktop): Theme Toggle & Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dark / Light Mode Toggle Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
            title="Toggle Theme"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </motion.button>

          {/* Login Button */}
          <Link 
            href="/login" 
            className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white px-3 py-2 transition"
          >
            Login
          </Link>

          {/* Register Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="/register" 
              className="text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl transition shadow-lg shadow-blue-600/20 block"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        {/* Mobile Hamburger & Theme Button */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs"
            title="Toggle Theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.button>
        </div>

      </div>

      {/* Mobile Animated Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3 text-sm"
          >
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
            >
              Products
            </Link>
            <Link 
              href="/#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
            >
              Features
            </Link>
            <Link 
              href="/#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
            >
              Pricing
            </Link>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xs"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-xl bg-blue-600 text-white font-medium text-xs shadow-md shadow-blue-600/20"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}