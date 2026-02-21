import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="s-footer">
      <div className="row">
        <div className="column ss-copyright">
          <span>© Copyright Mohd 2025</span>
          <span>Design with ❤️ by Mohd Mustak</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 