import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Hero />
      
      {/* Products page-e jawar button */}
      <div className="text-center py-6">
        <Link 
          href="/products" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
        >
          View Products Management &rarr;
        </Link>
      </div>

      <Features />
      <Pricing />
    </main>
  );
}