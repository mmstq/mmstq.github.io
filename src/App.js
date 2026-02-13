import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Intro from './components/Intro';
import About from './components/About';
import Works from './components/Works';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

// Import styles in correct order
import './styles/css/vendor.css';
import './styles/css/styles.css';
import './styles/react-additions.css';

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
    <div className="App">
      {isLoading && <Preloader />}
      <div className="s-pagewrap">
        <div className="circles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
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
  );
}

export default App; 