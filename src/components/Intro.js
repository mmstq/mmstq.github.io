import React from 'react';

const Intro = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="intro" className="s-intro target-section">
      <div className="row intro-content wide">
        <div className="column">
          <div className="text-pretitle with-line">
            Hello World
          </div>

          <h1 className="text-huge-title">
            I am Mohd Mustak, <br />
            a Flutter Engineer <br />
            & Full Stack<br />
            Developer based <br />
            in India.
          </h1>
        </div>

        <ul className="intro-social">
          <li>
            <a href="https://linkedin.com/in/mohd-mustak-2b4100187" target="_blank" rel="noopener noreferrer">
              Linkedin
            </a>
          </li>
          <li>
            <a href="https://github.com/mmstq" target="_blank" rel="noopener noreferrer">
              Github
            </a>
          </li>
          <li>
            <a href="https://play.google.com/store/apps/developer?id=mmstq" target="_blank" rel="noopener noreferrer">
              Playstore
            </a>
          </li>
          <li>
            <a href="https://linktr.ee/mmstq" target="_blank" rel="noopener noreferrer">
              Linktree
            </a>
          </li>
        </ul>
      </div>

      <a 
        href="#about" 
        className="intro-scrolldown smoothscroll"
        onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd" clipRule="evenodd">
          <path
            d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
        </svg>
      </a>
    </section>
  );
};

export default Intro; 