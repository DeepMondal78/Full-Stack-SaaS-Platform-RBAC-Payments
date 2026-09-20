'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-element',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white px-4 pt-20">
      {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Top Badge */}
        <div className="hero-element inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>Next-Gen SaaS Architecture with RBAC & Stripe</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-element text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
          Scale Your Business With <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Enterprise-Grade Security
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-element max-w-2xl mx-auto text-slate-400 text-lg sm:text-xl">
          A production-ready SaaS platform featuring granular Role-Based Access Control, automated subscription billing, and lightning-fast performance.
        </p>

        {/* CTA Buttons */}
        <div className="hero-element flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-600/25"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
          >
            <span>Explore Architecture</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="hero-element pt-12 border-t border-slate-900 grid grid-cols-2 md:grid-cols-3 gap-6 text-slate-500 text-sm">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span>Secure RBAC & JWT</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Stripe Webhooks Integration</span>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>Lightning Fast UI</span>
          </div>
        </div>

      </div>
    </section>
  );
}