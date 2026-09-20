"use client";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Add Product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          price: parseFloat(price), 
          stock: parseInt(stock, 10) 
        }),
      });

      if (res.ok) {
        alert("Product added successfully!");
        setName("");
        setPrice("");
        setStock("");
        fetchProducts(); // Refresh list
      } else {
        alert("Failed to add product.");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">SaaS Inventory / Products</h1>

        {/* Add Product Form */}
        <form onSubmit={handleAddProduct} className="bg-gray-900 p-6 rounded-lg mb-8 shadow-md border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-800 border border-gray-700 p-2 rounded text-white"
            />
            <input
              type="number"
              placeholder="Price ($)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="bg-gray-800 border border-gray-700 p-2 rounded text-white"
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              className="bg-gray-800 border border-gray-700 p-2 rounded text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded font-medium transition"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>

        {/* Product List */}
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.length === 0 ? (
            <p className="text-gray-400">No products found.</p>
          ) : (
            products.map((p) => (
              <div key={p.id} className="bg-gray-900 border border-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold text-blue-400">{p.name}</h3>
                <p className="text-gray-300">Price: ${p.price}</p>
                <p className="text-gray-300">Stock: {p.stock}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}