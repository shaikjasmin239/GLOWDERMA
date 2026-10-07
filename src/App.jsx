import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Layout
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import GlowGuide from './components/GlowGuide.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

// Pages
import Home from './pages/Home.jsx';
import SkinAnalysis from './pages/SkinAnalysis.jsx';
import SkinProfile from './pages/SkinProfile.jsx';
import Routine from './pages/Routine.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Ingredients from './pages/Ingredients.jsx';
import Journal from './pages/Journal.jsx';
import Learn from './pages/Learn.jsx';
import ArticleDetails from './pages/ArticleDetails.jsx';
import About from './pages/About.jsx';

// Page transition wrapper
function PageTransition({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// App layout with scroll-to-top
function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <PageTransition>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/skin-analysis" element={<SkinAnalysis />} />
          <Route path="/skin-profile" element={<SkinProfile />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:slug" element={<ArticleDetails />} />
          <Route path="/about" element={<About />} />
          {/* 404 fallback */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center pt-20" style={{ background: '#FFFDF9' }}>
              <div className="text-center max-w-md px-6">
                <div className="w-16 h-16 mx-auto mb-6 opacity-20">
                  <svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" stroke="#C6A46C" strokeWidth="1.5"/><circle cx="32" cy="32" r="5" fill="#C6A46C"/></svg>
                </div>
                <h1 className="font-display text-4xl text-espresso mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Page Not Found</h1>
                <p className="text-mocha/60 font-sans text-sm mb-6" style={{ fontWeight: 300 }}>
                  The page you're looking for doesn't exist. Let's get you back to your ritual.
                </p>
                <a href="/" className="btn-primary inline-flex">Return Home</a>
              </div>
            </div>
          } />
        </Routes>
      </PageTransition>
      <Footer />
      <GlowGuide />
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <BrowserRouter>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      {loaded && <AppLayout />}
    </BrowserRouter>
  );
}
