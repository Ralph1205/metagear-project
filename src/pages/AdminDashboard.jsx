import { useState, useEffect } from "react";
import supabase from "../supabase";

export default function AdminDashboard({ setPage }) {
  const [products, setProducts] = useState([]);
  const [adminSearch, setAdminSearch] = useState(""); // NEW: Search State
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
  });

  const SECRET_ADMIN_EMAIL = "admin@metagear.com";

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email !== SECRET_ADMIN_EMAIL) {
        alert("ACCESS DENIED");
        setPage("home");
      } else {
        setIsAuthorized(true);
        fetchProducts();
      }
    };
    checkAuth();
  }, [setPage]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setProducts(data);
  };

  // NEW: Search Filter Logic
  const filteredInventory = products.filter(
    (item) =>
      item.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
      item.id.toString().includes(adminSearch),
  );

  const massGenerate = async () => {
    if (!window.confirm("Deploy 10 random hardware units?")) return;
    setLoading(true);
    const brands = ["ASUS", "MSI", "Razer", "Corsair", "Logitech"];
    const types = ["GPU", "Keyboard", "Monitor", "Mouse", "Headset"];

    const newItems = Array.from({ length: 10 }).map(() => ({
      name: `${brands[Math.floor(Math.random() * 5)]} ${types[Math.floor(Math.random() * 5)]} Pro`,
      price: Math.floor(Math.random() * 50000) + 5000,
      description: "High-performance gaming equipment.",
      image_url: `https://picsum.photos/seed/${Math.floor(Math.random() * 100) + 200}/800/600`,
    }));

    const { error } = await supabase.from("products").insert(newItems);
    if (!error) fetchProducts();
    setLoading(false);
  };

  const updatePrice = async (id, currentPrice) => {
    const newPrice = prompt("Update Price (PHP):", currentPrice);
    if (newPrice && !isNaN(newPrice)) {
      const { error } = await supabase
        .from("products")
        .update({ price: parseFloat(newPrice) })
        .eq("id", id);
      if (!error) fetchProducts();
    }
  };

  const removeProduct = async (id) => {
    if (window.confirm("Delete this unit?")) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (!error) fetchProducts();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("products")
      .insert([{ ...formData, price: parseFloat(formData.price) }]);
    if (!error) {
      setFormData({ name: "", price: "", description: "", image_url: "" });
      fetchProducts();
    }
    setLoading(false);
  };

  if (!isAuthorized) return null;

  return (
    <div className="max-w-7xl mx-auto p-8 min-h-screen bg-white">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b-8 border-black pb-8">
        <div>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
            Command Center
          </h1>
          <div className="flex gap-4 mt-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">
            <span>Stock: {products.length}</span>
            <span>•</span>
            <span>
              Value: ₱
              {products
                .reduce((acc, curr) => acc + (curr.price || 0), 0)
                .toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={massGenerate}
            className="bg-cyan-400 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-black hover:text-white transition-all"
          >
            + Quick Deploy
          </button>
          <button
            onClick={() => setPage("home")}
            className="bg-black text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
          >
            Exit System
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form Column */}
        <section className="bg-gray-50 p-8 rounded-[40px] border-2 border-gray-100 h-fit sticky top-8">
          <h2 className="text-xl font-black mb-6 uppercase">
            Register New Unit
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Name"
              className="w-full p-4 rounded-xl border-2 font-bold focus:border-cyan-500 outline-none"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              placeholder="Image URL"
              className="w-full p-4 rounded-xl border-2 focus:border-cyan-500 outline-none"
              value={formData.image_url}
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full p-4 rounded-xl border-2 font-black"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Description"
              className="w-full p-4 rounded-xl border-2 h-24 resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <button className="w-full bg-black text-white font-black py-4 rounded-2xl uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all">
              {loading ? "Syncing..." : "Deploy Unit"}
            </button>
          </form>
        </section>

        {/* Inventory Column */}
        <section className="lg:col-span-2">
          {/* SEARCH BOX FUNCTIONALITY */}
          <div className="mb-8 relative">
            <input
              type="text"
              placeholder="SEARCH INVENTORY BY NAME OR UID..."
              className="w-full p-6 bg-gray-100 rounded-3xl border-none outline-none font-black text-lg focus:ring-4 ring-cyan-500/20 transition-all uppercase placeholder:text-gray-300"
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">
              {filteredInventory.length} Matches
            </div>
          </div>

          <div className="grid gap-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredInventory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-3xl hover:border-black group transition-all"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={item.image_url}
                    className="w-16 h-16 object-cover rounded-2xl bg-gray-50 shadow-sm"
                    alt=""
                  />
                  <div>
                    <h3 className="font-black uppercase text-sm leading-tight">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-cyan-600 font-black text-xs">
                        ₱{item.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => updatePrice(item.id, item.price)}
                        className="text-[9px] font-bold text-gray-400 hover:text-black border-b border-transparent hover:border-black"
                      >
                        EDIT PRICE
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeProduct(item.id)}
                  className="p-3 text-gray-200 hover:text-red-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {filteredInventory.length === 0 && (
              <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                <p className="font-black text-gray-300 uppercase tracking-widest text-sm text-center px-10">
                  No Gear Found Matching "{adminSearch}"
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
