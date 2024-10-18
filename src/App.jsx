import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductId } from "./pages/ProductId";
import { Cart } from "./pages/Cart";
import { CartProvider } from "./context/CartProvider";
import { SuccessPage } from "./pages/SuccesPage";
import { TopBar } from "./components/TopBar";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import UserPanel from "./pages/UserPanel";
import { AboutUs } from "./pages/AboutUs";
import { AdminPanel } from "./pages/AdminPanel";
import { ContactForm } from "./pages/ContactForm";

export const App = () => {
  const location = useLocation();

  const hideHeaderAndNavbar = location.pathname === "/success"; 

  return (
    <CartProvider>
      {/* Condiciona la visibilidad del TopBar y Navbar */}
      {!hideHeaderAndNavbar && <TopBar />}
      {!hideHeaderAndNavbar && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductId />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userpanel" element={<UserPanel />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
      
      {/* El Footer siempre se mostrará */}
      <Footer />
    </CartProvider>
  );
};
