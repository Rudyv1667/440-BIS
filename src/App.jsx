import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import './index.css';
import ProductDetail from './components/ProductDetail';
import ProductGallery from './components/ProductGallery';
import HeroSection from './components/HeroSection';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Contact from './components/Contact'; // Import Contact page

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5 } }
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Landing Page with Hero & Gallery */}
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ScrollToTop />
              <HeroSection />
              <div className="pt-16">
                <div className="max-w-full mx-auto px-4">
                  <section id="products" className="pb-16">
                    <h1 className="text-3xl text-gray-800 font-bold text-center my-8">
                      Nuestros productos
                    </h1>
                    <ProductGallery />
                  </section>
                </div>
              </div>
            </motion.div>
          }
        />

        {/* Product Detail Page */}
        <Route
          path="/product/:id"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ProductDetail />
            </motion.div>
          }
        />

        {/* Contact Page */}
        <Route
          path="/contact"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Contact />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
