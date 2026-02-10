import { useState } from "react";
import supabase from "../supabase";

export default function Login({ setPage }) {
  const [adminName, setAdminName] = useState(""); // Used instead of email for Admin
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // --- FIXED ADMIN CREDENTIALS ---
  const FIXED_ADMIN_NAME = "COMMANDER"; // Change this to your desired name
  const SECRET_ADMIN_EMAIL = "admin@metagear.com"; // The email you created in Supabase

  const handleAdminAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if the entered name matches your fixed name
      if (adminName.toUpperCase() !== FIXED_ADMIN_NAME) {
        throw new Error("Invalid Admin Identification");
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: SECRET_ADMIN_EMAIL, // Log in with the hidden email
        password: password,
      });

      if (error) throw error;
      setPage("home");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 text-gray-900 text-center">
          {isAdminMode ? "Admin Console" : "MetaGear Access"}
        </h2>

        {!isAdminMode ? (
          <div className="space-y-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border-2 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all border-gray-200"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                className="w-6"
                alt="G"
              />
              Continue with Google
            </button>
            <button
              onClick={() => setIsAdminMode(true)}
              className="w-full text-xs text-gray-400 uppercase tracking-widest hover:text-black"
            >
              Admin Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleAdminAuth} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
                Admin Name
              </label>
              <input
                type="text"
                placeholder="ENTER ADMIN NAME"
                className="w-full p-3 border border-gray-200 rounded-lg outline-none uppercase"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border border-gray-200 rounded-lg outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              disabled={loading}
              className="w-full bg-black text-white font-bold py-4 rounded-lg uppercase tracking-widest"
            >
              {loading ? "Verifying..." : "Authorize"}
            </button>
            <button
              type="button"
              onClick={() => setIsAdminMode(false)}
              className="w-full text-xs text-gray-400 text-center uppercase mt-2"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
