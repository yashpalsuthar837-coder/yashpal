import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Resume from './Resume';
import Contact from './Contact';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Use a small timeout to ensure everything is rendered
        const timeoutId = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [hash]);

  const sections = [
    { id: 'hero', component: <Hero /> },
    { id: 'about', component: <About /> },
    { id: 'skills', component: <Skills /> },
    { id: 'projects', component: <Projects /> },
    { id: 'experience', component: <Experience /> },
    { id: 'resume', component: <Resume /> },
    { id: 'contact', component: <Contact /> },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.6,
            delayChildren: 0.5,
          },
        },
      }}
    >
      {sections.map((section) => (
        <motion.div
          key={section.id}
          variants={{
            hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {section.component}
        </motion.div>
      ))}
    </motion.div>
  );
}
