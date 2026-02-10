import supabase from "../supabase";

export default function Header({
  session,
  setPage,
  cartCount = 0,
  searchQuery,
  setSearchQuery, // These allow the header to talk to the rest of the app
}) {
  const isAdmin = session?.user?.user_metadata?.role === "admin";

  // Category List
  const categories = ["All", "GPU", "Keyboards", "Monitors", "Mice", "Audio"];

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto gap-4">
        {/* Logo Section */}
        <div
          className="flex items-center gap-2 cursor-pointer min-w-fit transition-opacity hover:opacity-80"
          onClick={() => {
            setPage("home");
            setSearchQuery(""); // Reset search when clicking logo
          }}
        >
          <img
            src="/logo.png"
            alt="MetaGear Logo"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-xl font-black uppercase tracking-tighter hidden md:block">
            MetaGear
          </h1>
        </div>

        {/* FUNCTIONAL SEARCH BAR */}
        <div className="flex-1 max-w-2xl">
          <div className="relative group">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search loadout..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-black bg-gray-50 transition-all font-medium"
            />
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-6">
          {isAdmin && (
            <button
              onClick={() => setPage("admin")}
              className="text-[10px] uppercase font-black text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors tracking-widest"
            >
              Admin
            </button>
          )}

          <button
            onClick={() => setPage("cart")}
            className="relative flex items-center hover:scale-110 transition-transform"
          >
            <img
              src="/cart.png"
              alt="Cart"
              className="w-8 h-8 object-contain"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

          {session ? (
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                setPage("home");
              }}
              className="text-xs font-black uppercase tracking-widest hover:text-cyan-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setPage("login")}
              className="bg-black text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* NEW: FUNCTIONAL CATEGORY BAR */}
      <div className="bg-gray-50 border-t overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 flex gap-8 py-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSearchQuery(cat === "All" ? "" : cat)}
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all pb-1 border-b-2 ${
                searchQuery === cat || (cat === "All" && searchQuery === "")
                  ? "border-cyan-500 text-black"
                  : "border-transparent text-gray-400 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
