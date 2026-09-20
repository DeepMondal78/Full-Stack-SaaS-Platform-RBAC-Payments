'use client';
import React from 'react';
import { Shield, Zap, Lock, RefreshCw, Cpu, Server } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-6 h-6 text-indigo-400" />,
    title: "Role-Based Access Control (RBAC)",
    description: "Granular permissions for Admin, Manager, and User roles. Secure routes and protect sensitive API endpoints effortlessly."
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-purple-400" />,
    title: "Automated Stripe Webhooks",
    description: "End-to-end subscription lifecycle handling: trial starts, successful renewals, upgrades, and cancellations with zero double-charge edge cases."
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "High-Performance Caching",
    description: "Optimized response times using Redis caching and sliding-window rate limiting to prevent API abuse."
  },
  {
    icon: <Lock className="w-6 h-6 text-emerald-400" />,
    title: "Secure JWT Authentication",
    description: "Robust token-based authentication workflow ensuring secure session management across client and server."
  },
  {
    icon: <Cpu className="w-6 h-6 text-pink-400" />,
    title: "Modern Tech Stack",
    description: "Built with Next.js App Router, TypeScript, Tailwind CSS, Prisma ORM, and PostgreSQL for maximum scalability."
  },
  {
    icon: <Server className="w-6 h-6 text-blue-400" />,
    title: "Production-Ready Architecture",
    description: "Structured cleanly following enterprise standards, designed to catch recruiter attention and showcase real engineering depth."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-950 relative overflow-hidden px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Engineered For <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Scale & Security</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg">
            Every feature is meticulously designed to solve real-world backend and frontend challenges that recruiters look for.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12-h-12 w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center mb-6 group-hover:bg-indigo-600/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}