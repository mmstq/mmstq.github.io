import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

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
            Whether you have a question or just
            want to chat about design, tech & art — shoot me a message.
          </p>
        </div>
      </div>

      <div className="row contact-bottom">
        <div className="column lg-3 md-5 tab-6 stack-on-550 contact-block">
          <h3 className="text-pretitle">Reach me at</h3>
          <p className="contact-links">
            <a href="mailto:mohdmushtak59@gmail.com" className="mailtoui">
              <FontAwesomeIcon icon={faGoogle} style={{ color: '#DB4437' }} />
              Mail
            </a> <br />
            <a href="https://wa.me/917011152375" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} style={{ color: '#25D366' }} />
              WhatsApp
            </a>
          </p>
        </div>
        <div className="column lg-4 md-5 tab-6 stack-on-550 contact-block">
          <h3 className="text-pretitle">Social</h3>
          <ul className="contact-social">
            <li>
              <a href="https://linkedin.com/in/mohd-mustak-2b4100187" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/mmstq" target="_blank" rel="noopener noreferrer">
                Github
              </a>
            </li>
            <li>
              <a href="https://play.google.com/store/apps/developer?id=mmstq" target="_blank" rel="noopener noreferrer">
                Play Store
              </a>
            </li>
            <li>
              <a href="#0">App Store</a>
            </li>
          </ul>
        </div>
        <div className="column lg-4 md-12 contact-block">
          <a 
            href="mailto:mohdmushtak59@gmail.com"
            className="mailtoui btn btn--medium u-fullwidth contact-btn"
          >
            Say Hello.
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact; 