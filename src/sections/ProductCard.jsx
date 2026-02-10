export default function ProductCard({ product, addToCart, onViewDetails }) {
  if (!product) return null;

  // 50 Hand-Picked Tech IDs (Motherboards, GPUs, Mice, Keyboards, etc.)
  const techImages = [
    "1714208",
    "2582937",
    "4523002",
    "2115256",
    "777001",
    "3829227",
    "19733",
    "3165335",
    "2582931",
    "374074",
    "546819",
    "2582938",
    "129208",
    "6350711",
    "9072242",
    "791491",
    "163117",
    "2047397",
    "434346",
    "3829226",
    "2399840",
    "572056",
    "1148820",
    "270632",
    "326503",
    "400678",
    "841228",
    "3165339",
    "1267325",
    "117729",
    "164726",
    "2102416",
    "3945657",
    "2582928",
    "2047397",
    "1038916",
    "2582934",
    "1714300",
    "3165337",
    "5082554",
    "4526406",
    "356056",
    "2399840",
    "3861969",
    "707467",
    "68567",
    "5082558",
    "4661145",
    "129208",
    "735911",
  ];

  // Logic: Use the database image if it exists, otherwise pull from our 50-image tech vault
  const imageSource =
    product.image_url && !product.image_url.includes("picsum")
      ? product.image_url
      : `https://images.pexels.com/photos/${techImages[product.id % techImages.length]}/pexels-photo-${techImages[product.id % techImages.length]}.jpeg?auto=compress&cs=tinysrgb&w=800`;

  return (
    <div className="group border-2 border-gray-100 rounded-[32px] overflow-hidden flex flex-col bg-white hover:border-black transition-all duration-500 shadow-sm">
      <div
        className="h-64 bg-gray-100 overflow-hidden cursor-pointer relative"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={imageSource}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt={product.name}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-black/90 text-cyan-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter backdrop-blur-sm">
            Hardware ID: {product.id}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col gap-3">
        <div>
          <h4 className="font-black text-2xl uppercase tracking-tighter leading-none mb-1">
            {product.name}
          </h4>
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
            Category // System Component
          </p>
        </div>

        <div className="flex items-end justify-between mt-4">
          <div className="text-3xl font-black text-black tracking-tighter">
            ₱{product.price?.toLocaleString()}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-cyan-500 hover:text-black transition-all active:scale-95"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
