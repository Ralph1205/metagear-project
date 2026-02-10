import { useEffect, useState } from "react";
import supabase from "../supabase";
import ProductCard from "./ProductCard";

export default function ProductGrid({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center font-mono text-white">
        SCANNING INVENTORY...
      </div>
    );

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <h3 className="text-2xl font-black uppercase mb-8 border-l-4 border-cyan-500 pl-4 text-gray-800">
        Available Gear
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((item) => (
          // IMPORTANT: We pass the item as a prop named "product"
          <ProductCard key={item.id} product={item} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}
