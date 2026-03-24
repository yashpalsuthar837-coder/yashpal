import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    // Only scroll to top if there is no hash
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  
  return null;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <AnimatePresence>
          {isLoading && <Loader key="loader" />}
        </AnimatePresence>

        <CustomCursor />
        <Navbar />

        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
