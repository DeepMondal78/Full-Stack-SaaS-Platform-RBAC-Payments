'use client';
import React from 'react';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "$9",
    period: "per month",
    description: "Ideal for individual developers and small personal projects.",
    features: [
      "Standard User Role Access",
      "Up to 1,000 API requests/day",
      "Basic Analytics Dashboard",
      "Community Support"
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Pro SaaS",
    price: "$29",
    period: "per month",
    description: "Built for growing teams needing granular RBAC and webhooks.",
    features: [
      "Admin, Manager & User Roles",
      "Unlimited API Requests",
      "Stripe Webhook Integration",
      "Redis Caching & Rate Limiting",
      "Priority Email Support"
    ],
    highlighted: true,
    cta: "Upgrade to Pro",
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "Maximum security, custom architecture support, and dedicated scaling.",
    features: [
      "Custom RBAC Permissions",
      "Dedicated Microservices Support",
      "Advanced Audit Logs",
      "99.9% SLA Guarantee",
      "24/7 Dedicated Support"
    ],
    highlighted: false,
    cta: "Contact Sales",
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-950 relative overflow-hidden px-4 border-t border-slate-900">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Invest In <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Production-Ready Code</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-base">
            Choose the perfect tier to unlock full webhook checkout simulations and role management workflows.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-3xl p-8 transition-all duration-300 relative ${
                plan.highlighted 
                  ? 'bg-gradient-to-b from-indigo-950/40 to-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-600/10 lg:-translate-y-2' 
                  : 'bg-slate-900/50 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-sm">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/dashboard"
                  className={`w-full inline-flex items-center justify-center py-3.5 rounded-xl font-semibold transition-all shadow-lg ${
                    plan.highlighted
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25'
                      : 'bg-slate-800 hover:bg-slate-700 text-white shadow-slate-900/50'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}