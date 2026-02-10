export default function Cart({ cartItems = [], setPage, setCart }) {
  // Logic to remove a single item from the cart
  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0),
    0,
  );

  return (
    <div className="p-12 max-w-5xl mx-auto min-h-screen text-white bg-black">
      {/* Header with Unit Count */}
      <div className="flex justify-between items-end mb-12 border-b-2 border-gray-800 pb-6">
        <div>
          <h2 className="text-5xl font-black uppercase italic tracking-tighter">
            Your Loadout
          </h2>
          <p className="text-cyan-500 font-mono text-[10px] tracking-[0.3em] uppercase mt-2">
            System Scan: {cartItems.length} Units Detected
          </p>
        </div>
        <button
          onClick={() => setPage("home")}
          className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
        >
          [ Continue Shopping ]
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-32 bg-gray-900/30 rounded-[40px] border-2 border-dashed border-gray-800">
          <p className="text-gray-600 font-black uppercase tracking-widest mb-8">
            Inventory Empty // No Gear Assigned
          </p>
          <button
            onClick={() => setPage("home")}
            className="bg-white text-black font-black px-10 py-4 rounded-full uppercase text-xs tracking-widest hover:bg-cyan-400 transition-all active:scale-95"
          >
            Access Store
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* List of Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="group bg-gray-900/50 border border-gray-800 rounded-3xl p-6 flex justify-between items-center hover:border-cyan-500/50 transition-all shadow-xl"
              >
                <div className="flex gap-6 items-center">
                  <div className="relative">
                    <img
                      src={item.image_url}
                      className="w-24 h-24 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500 border border-gray-700"
                      alt={item.name}
                    />
                  </div>
                  <div>
                    <p className="font-black text-xl text-white uppercase tracking-tight leading-none">
                      {item.name}
                    </p>
                    <p className="text-cyan-400 font-black mt-2">
                      ₱{Number(item.price).toLocaleString()}
                    </p>
                    <p className="text-[9px] text-gray-600 uppercase font-mono mt-3 tracking-widest">
                      Status: Ready for Dispatch
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                  className="p-4 rounded-2xl bg-gray-800/50 text-gray-500 hover:bg-red-500/10 hover:text-red-500 transition-all"
                  title="Remove Unit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white text-black p-8 rounded-[40px] sticky top-24">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-6 border-b-2 border-black pb-4">
                Summary
              </h3>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <span>Subtotal</span>
                  <span>₱{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <span>Duty Fees</span>
                  <span>₱0.00</span>
                </div>
                <div className="flex justify-between text-2xl font-black pt-4 border-t border-gray-100">
                  <span>TOTAL</span>
                  <span>₱{total.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => setPage("checkout")}
                className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-cyan-500 hover:text-black transition-all shadow-xl active:scale-95"
              >
                Initialize Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
