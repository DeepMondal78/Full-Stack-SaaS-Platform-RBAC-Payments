'use client';
import React from 'react';
import { Users, CreditCard, Activity, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">Welcome back, Deep! 👋</h2>
          <p className="text-slate-400 text-sm">Here is your live SaaS performance metrics and webhook sync status.</p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-semibold">
          PLAN: PRO SAAS ($29/mo)
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-sm font-medium">Total Active Users</span>
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">2,450</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center">+12% <ArrowUpRight className="w-3 h-3" /></span>
          </div>
          <p className="text-xs text-slate-500">Synced with PostgreSQL</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-sm font-medium">Monthly Recurring Revenue</span>
            <CreditCard className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">$14,280</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center">+8.4% <ArrowUpRight className="w-3 h-3" /></span>
          </div>
          <p className="text-xs text-slate-500">Stripe Webhooks Verified</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-sm font-medium">API Request Latency</span>
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">42ms</span>
            <span className="text-xs text-emerald-400 font-medium">Optimal</span>
          </div>
          <p className="text-xs text-slate-500">Redis Caching Layer Active</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-sm font-medium">RBAC Security Status</span>
            <ShieldCheck className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">Secure</span>
            <span className="text-xs text-purple-400 font-medium">JWT Valid</span>
          </div>
          <p className="text-xs text-slate-500">Granular permissions enforced</p>
        </div>
      </div>

      {/* Architecture Simulation Section */}
      <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-400" />
          <span>Distributed System & Webhook Logs</span>
        </h3>
        <div className="space-y-3 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-slate-300">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">POST</span>
              <span>/api/v1/stripe/webhook - customer.subscription.created</span>
            </div>
            <span className="text-slate-500">200 OK (18ms)</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-slate-300">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">GET</span>
              <span>/api/v1/auth/rbac/verify-permission - Role: ADMIN</span>
            </div>
            <span className="text-slate-500">200 OK (12ms)</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-slate-300">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">REDIS</span>
              <span>Rate limit sliding window check - Key: user_9824_limit</span>
            </div>
            <span className="text-slate-500">Allowed (Hits: 14/100)</span>
          </div>
        </div>
      </div>
    </div>
  );
}