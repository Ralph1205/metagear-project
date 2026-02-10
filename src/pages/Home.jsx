import { useState, useEffect } from "react";
import supabase from "../supabase";
import Hero from "../sections/Hero";
import ProductGrid from "../sections/ProductGrid";

export default function Home({ addToCart, onViewDetails, searchQuery }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // FILTER LOGIC: This filters your 100+ items based on the search bar or category clicks
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description &&
        p.description.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <main className="bg-white min-h-screen">
      {/* UI LOGIC: Hide the Hero section when the user is searching 
         to make space for the results. 
      */}
      {!searchQuery && <Hero />}

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Dynamic Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-l-8 border-black pl-6">
          <div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">
              {searchQuery
                ? `Results for: ${searchQuery}`
                : "Current Inventory"}
            </h2>
            <p className="text-gray-400 font-mono text-xs uppercase tracking-[0.3em] mt-2">
              MetaGear // Verified Hardware
            </p>
          </div>
          <div className="text-right">
            <span className="bg-gray-100 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
              {filteredProducts.length} Units Online
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-80 bg-gray-50 animate-pulse rounded-[30px]"
              />
            ))}
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <ProductGrid
                products={filteredProducts}
                addToCart={addToCart}
                onViewDetails={onViewDetails}
              />
            ) : (
              <div className="py-20 text-center">
                <h3 className="text-2xl font-black text-gray-200 uppercase italic">
                  No Gear Matches Your Current Search
                </h3>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
