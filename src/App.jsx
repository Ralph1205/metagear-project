import { useEffect, useState } from "react";
import supabase from "./supabase";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";

export default function App() {
  const [session, setSession] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // NEW: Search and Category State
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session),
    );
    return () => subscription.unsubscribe();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} added to loadout!`);
  };

  const viewDetails = (product) => {
    setSelectedProduct(product);
    setCurrentPage("details");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        // Pass searchQuery here so Home.jsx can filter the 100 items
        return (
          <Home
            addToCart={addToCart}
            onViewDetails={viewDetails}
            searchQuery={searchQuery}
          />
        );
      case "details":
        return (
          <ProductDetails
            product={selectedProduct}
            addToCart={addToCart}
            setPage={setCurrentPage}
          />
        );
      case "cart":
        return <Cart cartItems={cart} setPage={setCurrentPage} />;
      case "checkout":
        return <Checkout cartItems={cart} setPage={setCurrentPage} />;
      case "login":
        return <Login setPage={setCurrentPage} />;
      case "admin":
        return <AdminDashboard setPage={setCurrentPage} />;
      default:
        return (
          <Home
            addToCart={addToCart}
            onViewDetails={viewDetails}
            searchQuery={searchQuery}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Header
        session={session}
        setPage={setCurrentPage}
        cartCount={cart.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} // Passes function to update search from Header
      />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
}
