'use client';
import React from 'react';
import { CreditCard, Sparkles, CheckCircle2, Zap, ArrowRight } from 'lucide-react';

export default function BillingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Stripe Subscription & Invoicing</h2>
        <p className="text-slate-400 text-sm">Manage your billing cycle, payment methods, and automated webhook subscriptions.</p>
      </div>

      {/* Active Subscription Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Active Plan</span>
            </div>
            <h3 className="text-3xl font-extrabold text-white">Pro SaaS Tier ($29/month)</h3>
            <p className="text-slate-400 text-sm">Your next automatic billing cycle renews on <span className="text-slate-200 font-semibold">October 19, 2026</span>.</p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-600/25">
            <span>Manage Stripe Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-slate-800 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Stripe Webhooks Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero Double-Charge Protection</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Automated Invoices Enabled</span>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-indigo-400" />
          <span>Billing History & Invoices</span>
        </h3>
        
        <div className="space-y-3">
          {[
            { id: "INV-2026-09", date: "Sep 19, 2026", amount: "$29.00", status: "Paid", webhook: "customer.subscription.renewed" },
            { id: "INV-2026-08", date: "Aug 19, 2026", amount: "$29.00", status: "Paid", webhook: "customer.subscription.created" },
          ].map((inv, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="font-semibold text-white text-sm">{inv.id} — <span className="text-indigo-400">{inv.amount}</span></div>
                <div className="text-xs text-slate-500 font-mono">Webhook Event: {inv.webhook}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400">{inv.date}</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                  {inv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}