import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Intro from './components/Intro';
import About from './components/About';
import Works from './components/Works';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';

// Import styles in correct order
import './styles/css/styles.css';
import './styles/toggle.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Remove preload class and show content
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.remove('ss-preload');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div className="App">
        {isLoading && <Preloader />}
        <ThemeToggle />
        <div className="s-pagewrap">
          <div className="circles">
          </div>

          <Header />

          <main className="s-content">
            <Intro />
            <About />
            <Works />
            <Contact />
          </main>

          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App; 