import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faLinkedin, faGithub, faGooglePlay, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <section id="contact" className="s-contact target-section">
      <div className="row contact-top">
        <div className="column lg-12">
          <h2 className="text-pretitle">
            Get In Touch
          </h2>

          <p className="h1">
            I love to hear from you.
            Whether you have a question, hire me or just
            want to chat about app, website, AI — shoot me a message.
          </p>
        </div>
      </div>

      <div className="row contact-bottom">
        <div className="column lg-6 md-12 tab-12 contact-block">
          <h3 className="text-pretitle">Reach me at</h3>
          <ul className="skills-list" style={{ justifyContent: 'flex-start' }}>
            <li>
              <a href="mailto:mohdmushtak59@gmail.com" className="mailtoui" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FontAwesomeIcon icon={faEnvelope} style={{ color: '#DB4437' }} /> Email
              </a>
            </li>
            <li>
              <a href="https://wa.me/917011152375" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FontAwesomeIcon icon={faWhatsapp} style={{ color: '#25D366' }} /> WhatsApp
              </a>
            </li>
            <li>
              <a href="https://t.me/mmstq" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FontAwesomeIcon icon={faTelegram} style={{ color: '#2CA5E0' }} /> Telegram
              </a>
            </li>
          </ul>
        </div>
        <div className="column lg-6 md-12 tab-12 contact-block">
          <h3 className="text-pretitle">Social</h3>
          <ul className="skills-list" style={{ justifyContent: 'flex-start' }}>
            <li>
              <a href="https://linkedin.com/in/mohdmustak" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FontAwesomeIcon icon={faLinkedin} style={{ color: '#0077B5' }} /> LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/mmstq" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FontAwesomeIcon icon={faGithub} style={{ color: 'var(--color-text-dark)' }} /> GitHub
              </a>
            </li>
            <li>
              <a href="https://play.google.com/store/apps/developer?id=mmstq" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FontAwesomeIcon icon={faGooglePlay} style={{ color: '#2899e4ff' }} /> Play Store
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact; 