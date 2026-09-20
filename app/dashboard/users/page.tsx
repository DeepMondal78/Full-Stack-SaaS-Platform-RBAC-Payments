'use client';
import React, { useState } from 'react';
import { ShieldCheck, UserPlus, Lock, Search, MoreVertical } from 'lucide-react';

const usersList = [
  { id: 1, name: "Deep Mondal", email: "deep@saascore.io", role: "ADMIN", status: "Active", plan: "Enterprise" },
  { id: 2, name: "Ankit Sharma", email: "ankit@devmail.com", role: "MANAGER", status: "Active", plan: "Pro SaaS" },
  { id: 3, name: "Priya Sen", email: "priya@techcorp.in", role: "USER", status: "Active", plan: "Starter" },
  { id: 4, name: "Rahul Roy", email: "rahul@startup.co", role: "USER", status: "Suspended", plan: "Starter" },
];

export default function UsersPage() {
  const [roleFilter, setRoleFilter] = useState("ALL");

  const filteredUsers = roleFilter === "ALL" 
    ? usersList 
    : usersList.filter(u => u.role === roleFilter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Role-Based Access Control (RBAC)</h2>
          <p className="text-slate-400 text-sm">Manage user permissions and granular security boundaries across your organization.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/25">
          <UserPlus className="w-4 h-4" />
          <span>Invite New User</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {["ALL", "ADMIN", "MANAGER", "USER"].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                roleFilter === role
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search users or emails..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-slate-900/40 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4 pl-6">User Details</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Subscription Plan</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="font-medium text-white">{user.name}</div>
                    <div className="text-xs text-slate-500 font-mono">{user.email}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-mono ${
                      user.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                      user.role === 'MANAGER' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      <Lock className="w-3 h-3" />
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300 font-medium">{user.plan}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      ● {user.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}