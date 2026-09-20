import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, CreditCard, Settings, ShieldAlert, LogOut } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-mono">
              S
            </div>
            <span>SaaS<span className="text-indigo-400">Core</span></span>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600/10 text-indigo-400 font-medium text-sm transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </Link>
            <Link
              href="/dashboard/users"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 font-medium text-sm transition-all"
            >
              <Users className="w-4 h-4" />
              <span>User Roles (RBAC)</span>
            </Link>
            <Link
              href="/dashboard/billing"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 font-medium text-sm transition-all"
            >
              <CreditCard className="w-4 h-4" />
              <span>Stripe Billing</span>
            </Link>
            <Link
              href="/dashboard/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 font-medium text-sm transition-all"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Admin Panel</span>
            </Link>
          </nav>
        </div>

        {/* Bottom User Profile / Logout */}
        <div className="pt-6 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm">
              DM
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">Deep Mondal</p>
              <p className="text-xs text-indigo-400 font-mono">Admin Role</p>
            </div>
          </div>
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-slate-800 px-8 flex items-center justify-between bg-slate-900/20 backdrop-blur-md sticky top-0 z-20">
          <h1 className="text-lg font-semibold text-white">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              ● System Active
            </span>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}