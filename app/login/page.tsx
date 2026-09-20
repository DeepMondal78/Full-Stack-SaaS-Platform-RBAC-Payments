"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

 const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Backend theke asha JWT token ebong role save kora
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        alert("Login Successful!");
        router.push("/products"); 
      } else {
        alert(data.message || "Invalid credentials!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center px-6 transition-colors">
      <div className="max-w-md w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-xl backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back</h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs text-center mb-6">Enter your credentials to access your account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com" 
              required
              className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition shadow-inner"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required
              className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition shadow-inner"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition shadow-lg shadow-blue-600/20 text-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}