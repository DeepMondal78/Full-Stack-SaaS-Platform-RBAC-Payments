"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Add Product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !quantity) return;

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
          quantity: parseInt(quantity),
        }),
      });

      if (res.ok) {
        setName("");
        setPrice("");
        setQuantity("");
        fetchProducts();
      }
    } catch (err) {
      console.error("Error adding product:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate stats
  const totalItems = products.length;
  const totalStock = products.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white pb-16">
      
      {/* Top Navigation Bar */}
      <nav className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/30">
              S
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Inventory Management</h1>
              <p className="text-xs text-slate-400">Spring Boot & MongoDB Synced</p>
            </div>
          </div>
          
          <Link 
            href="/" 
            className="text-xs font-medium bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 px-4 py-2 rounded-xl transition shadow-sm text-slate-200 flex items-center gap-2"
          >
            <span>&larr;</span> Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800/80 p-5 rounded-2xl shadow-xl">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Products</p>
            <p className="text-3xl font-extrabold text-white mt-1">{totalItems}</p>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800/80 p-5 rounded-2xl shadow-xl">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Stock Units</p>
            <p className="text-3xl font-extrabold text-blue-400 mt-1">{totalStock} <span className="text-sm font-normal text-slate-400">units</span></p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form (4 Columns) */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl shadow-xl backdrop-blur-md sticky top-24">
              <h2 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span> 
                Add New Product
              </h2>
              
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Product Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Wireless Controller" 
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition text-white placeholder-slate-600 shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Price (Tk)</label>
                  <input 
                    type="number" 
                    step="any"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 3500" 
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition text-white placeholder-slate-600 shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Quantity</label>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 25" 
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition text-white placeholder-slate-600 shadow-inner"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition shadow-lg shadow-blue-600/25 disabled:opacity-50 mt-2 text-sm cursor-pointer"
                >
                  {submitting ? "Saving to Database..." : "Save Product"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Product Grid (8 Columns) */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-white tracking-tight">Active Inventory</h2>
              <span className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl font-mono">
                Live Data Feed
              </span>
            </div>

            {loading ? (
              <div className="text-slate-500 py-24 text-center bg-slate-900/20 rounded-2xl border border-slate-900">
                <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                Loading inventory from backend...
              </div>
            ) : products.length === 0 ? (
              <div className="bg-slate-900/20 border border-dashed border-slate-800 rounded-2xl p-16 text-center text-slate-500">
                <p className="text-base font-medium text-slate-400">No products found</p>
                <p className="text-xs mt-1">Use the form on the left to add your first database entry.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl hover:border-slate-700 hover:bg-slate-900 transition-all shadow-lg flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition">{product.name}</h3>
                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      </div>
                      <p className="text-blue-400 font-bold text-xl mt-1">Tk. {product.price}</p>
                    </div>
                    
                    <div className="mt-5 pt-3 border-t border-slate-800/60 flex justify-between items-center text-xs text-slate-400">
                      <span>Stock: <strong className="text-slate-200 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">{product.quantity} units</strong></span>
                      <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] text-slate-500 font-mono">
                        ID: {product.id.substring(0, 6)}...
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}