export default function Hero() {
  const heroImage =
    "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1000";

  return (
    <section className="bg-white border-b overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[600px]">
        <div className="flex flex-col justify-center px-12 py-16 bg-black text-white">
          <span className="inline-block bg-cyan-500 text-black text-[10px] font-black px-3 py-1 rounded-full mb-6 w-fit uppercase tracking-widest">
            Next-Gen Hardware
          </span>
          <h2 className="text-7xl font-black mb-6 leading-[0.9] uppercase tracking-tighter">
            Forge Your <br /> <span className="text-cyan-500">Empire.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-sm font-medium">
            Equip yourself with elite-grade computer components and peripherals.
            Built for operators, by operators.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-black px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-cyan-500 transition-all">
              View Inventory
            </button>
          </div>
        </div>

        {/* Right Side: Unsplash Cinematic PC Image */}
        <div className="relative">
          <img
            src={heroImage}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Gaming Setup"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
