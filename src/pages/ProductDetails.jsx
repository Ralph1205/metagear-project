export default function ProductDetails({ product, addToCart, setPage }) {
  if (!product)
    return (
      <div className="p-20 text-center uppercase font-black">
        No Gear Selected
      </div>
    );

  return (
    <div className="p-12 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 animate-in fade-in duration-500">
      <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border-2 border-gray-100">
        <img
          src={product.image_url}
          className="w-full h-full object-cover"
          alt={product.name}
        />
      </div>
      <div className="flex flex-col gap-6">
        <button
          onClick={() => setPage("home")}
          className="text-xs font-bold uppercase text-gray-400 hover:text-black w-fit"
        >
          ← Back to Fleet
        </button>
        <h2 className="text-5xl font-black uppercase tracking-tighter">
          {product.name}
        </h2>
        <p className="text-3xl text-cyan-600 font-black">
          ₱{Number(product.price).toLocaleString()}
        </p>
        <div className="h-px bg-gray-200 w-full"></div>
        <p className="text-gray-600 text-lg leading-relaxed">
          {product.description ||
            "High-performance MetaGear peripheral designed for elite operators."}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="bg-black text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-xl"
        >
          Add to Gear Loadout
        </button>
      </div>
    </div>
  );
}
