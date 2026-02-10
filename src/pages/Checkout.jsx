import { useState } from "react";

export default function Checkout({ cartItems, setPage, clearCart }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "COD",
  });

  // Calculate Total
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert("Your loadout is empty!");

    setLoading(true);

    // Simulate API Call / Order Processing
    setTimeout(() => {
      alert(
        `ORDER CONFIRMED! \nThank you, ${formData.fullName}. Your gear is being prepared for deployment.`,
      );
      setLoading(false);

      // Reset App State
      if (clearCart) clearCart();
      setPage("home");
    }, 2000);
  };

  if (cartItems.length === 0 && !loading) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-4xl font-black uppercase italic mb-4">
          Loadout Empty
        </h2>
        <button
          onClick={() => setPage("home")}
          className="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-screen items-start">
      {/* Left: Shipping Details */}
      <section>
        <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-8 border-b-4 border-black pb-4">
          Checkout
        </h2>
        <form onSubmit={handlePlaceOrder} className="grid gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Recipient Name
            </label>
            <input
              required
              name="fullName"
              type="text"
              placeholder="e.g. John Doe"
              className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-cyan-500 transition-all font-bold"
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Shipping Address
            </label>
            <input
              required
              name="address"
              type="text"
              placeholder="Street, Barangay, House No."
              className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-cyan-500 transition-all font-bold"
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                City
              </label>
              <input
                required
                name="city"
                type="text"
                placeholder="Cabanatuan"
                className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-cyan-500 transition-all font-bold"
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Postal Code
              </label>
              <input
                required
                name="postalCode"
                type="text"
                placeholder="3100"
                className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-cyan-500 transition-all font-bold"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-[32px] mt-4 border-2 border-dashed border-gray-200">
            <h4 className="text-xs font-black uppercase tracking-widest mb-4">
              Payment Method
            </h4>
            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 bg-black text-white p-4 rounded-xl font-bold text-xs uppercase italic"
              >
                Cash on Delivery
              </button>
              <button
                type="button"
                className="flex-1 border-2 border-gray-200 text-gray-400 p-4 rounded-xl font-bold text-xs uppercase"
                disabled
              >
                GCash (Offline)
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="bg-black text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-cyan-500 hover:text-black transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            {loading ? "Verifying Transaction..." : "Confirm Deployment"}
          </button>
        </form>
      </section>

      {/* Right: Order Summary */}
      <section className="bg-gray-50 rounded-[40px] p-10 border-2 border-gray-100 h-fit sticky top-24">
        <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
          Order Summary
          <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-500">
            {cartItems.length}
          </span>
        </h3>

        <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.image_url}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase leading-none">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase font-mono">
                    UID: {item.id}
                  </p>
                </div>
              </div>
              <p className="font-black text-sm text-cyan-600">
                ₱{item.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-black pt-6 space-y-2">
          <div className="flex justify-between text-gray-400 uppercase font-bold text-[10px] tracking-widest">
            <span>Subtotal</span>
            <span>₱{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-400 uppercase font-bold text-[10px] tracking-widest">
            <span>Shipping</span>
            <span className="text-green-500 font-black">FREE</span>
          </div>
          <div className="flex justify-between text-2xl font-black pt-4">
            <span>TOTAL</span>
            <span className="text-black">₱{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
