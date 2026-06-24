import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./sections/Hero";
import { Piercings } from "./sections/Piercings";
import { Shop } from "./sections/Shop";
import { Booking } from "./sections/Booking";
import { Hygiene } from "./sections/Hygiene";
import { Faq } from "./sections/Faq";
import { Testimonials } from "./sections/Testimonials";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { AdminPage } from "./admin/AdminPage";

function SiteHome() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader show={loading} />
      <div className="bg-ink min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Piercings />
          <Shop />
          <Booking />
          <Hygiene />
          <Faq />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SiteHome />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
