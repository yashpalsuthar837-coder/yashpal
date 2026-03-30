import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Services from './components/Services';
import Quote from './components/Quote';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';

// Lazy load 3D background for performance
const Background3D = lazy(() => import('./components/Background3D'));

function App() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      <LoadingScreen />
      <CustomCursor />
      
      <Suspense fallback={<div className="fixed inset-0 bg-[#020617]" />}>
        <Background3D />
      </Suspense>

      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Services />
        <Quote />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
