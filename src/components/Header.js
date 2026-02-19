import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
        threshold: 0
      }
    );

    const sections = ['intro', 'about', 'works', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <header className="s-header">
      <div className="header-mobile">
        <span className="mobile-home-link">
          <a href="#intro" onClick={(e) => { e.preventDefault(); scrollToSection('intro'); }}>
            Mohd.
          </a>
        </span>
        <a
          className={`mobile-menu-toggle ${isMenuOpen ? 'is-clicked' : ''}`}
          href="#0"
          onClick={(e) => { e.preventDefault(); toggleMenu(); }}
        >
          <span>Menu</span>
        </a>
      </div>

      <div className="row wide main-nav-wrap">
        <nav className="column lg-12 main-nav">
          <ul>
            <li>
              <a
                href="#intro"
                className="home-link"
                onClick={(e) => { e.preventDefault(); scrollToSection('intro'); }}
              >
                Mohd.
              </a>
            </li>
            <li className={activeSection === 'intro' ? 'current' : ''}>
              <a
                href="#intro"
                className="smoothscroll"
                onClick={(e) => { e.preventDefault(); scrollToSection('intro'); }}
              >
                Intro
              </a>
            </li>
            <li className={activeSection === 'about' ? 'current' : ''}>
              <a
                href="#about"
                className="smoothscroll"
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              >
                About
              </a>
            </li>
            <li className={activeSection === 'works' ? 'current' : ''}>
              <a
                href="#works"
                className="smoothscroll"
                onClick={(e) => { e.preventDefault(); scrollToSection('works'); }}
              >
                Works
              </a>
            </li>
            <li className={activeSection === 'contact' ? 'current' : ''}>
              <a
                href="#contact"
                className="smoothscroll"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              >
                Say Hello
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 