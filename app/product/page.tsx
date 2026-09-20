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

  // Fetch products
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
        fetchProducts(); // Instant reload product list
      }
    } catch (err) {
      console.error("Error adding product:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-6 border-b border-slate-800 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Product Management Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">
              Real-time inventory synced with Java Spring Boot & MongoDB backend.
            </p>
          </div>
          <Link 
            href="/" 
            className="text-sm bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl hover:bg-slate-800 transition shadow-sm text-slate-300"
          >
            &larr; Back to Home
          </Link>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Add Product Form Card */}
          <div className="lg:col-span-1 bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl h-fit shadow-xl backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-400 flex items-center gap-2">
              <span>⚡</span> Add New Product
            </h2>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Product Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mechanical Keyboard" 
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition text-white placeholder-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Price (Tk)</label>
                <input 
                  type="number" 
                  step="any"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 2500" 
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition text-white placeholder-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Quantity</label>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 10" 
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition text-white placeholder-slate-600"
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition shadow-lg shadow-blue-600/20 disabled:opacity-50 mt-2"
              >
                {submitting ? "Saving to Database..." : "Save Product"}
              </button>
            </form>
          </div>

          {/* Right Column: Products Display Grid */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-200">Inventory Items</h2>
              <span className="text-xs bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-slate-400">
                Total: {products.length} Items
              </span>
            </div>

            {loading ? (
              <div className="text-slate-500 py-16 text-center bg-slate-900/20 rounded-2xl border border-slate-900">
                Loading products from backend...
              </div>
            ) : products.length === 0 ? (
              <div className="bg-slate-900/20 border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-500">
                No products found. Fill out the form on the left to add your first product!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl hover:border-slate-700 transition shadow-lg flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">{product.name}</h3>
                      </div>
                      <p className="text-blue-400 font-semibold text-lg">Tk. {product.price}</p>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-slate-800/60 flex justify-between items-center text-xs text-slate-400">
                      <span>Stock: <strong className="text-slate-200">{product.quantity} units</strong></span>
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