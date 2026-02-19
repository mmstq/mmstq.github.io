import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSwift, faAndroid, faPhp, faPython, faApple, faStripe,
  faLaravel, faGooglePlay, faAppStoreIos, faDocker, faGitAlt,
  faLinux, faAws,
  faJs,
  faFlutter,
  faDartLang,
  faJava,
  faReact,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase, faMobileAlt, faFire, faServer, faCode, faSync,
  faCodeBranch, faCreditCard
} from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const languageSkills = [
    { icon: faDartLang, color: '#00B4AB', name: 'Dart' },
    { icon: faJs, color: '#cfef2eff', name: 'JavaScript' },
    { icon: faSwift, color: '#F05138', name: 'Swift' },
    { icon: faPhp, color: '#777BB4', name: 'PHP' },
    { icon: faJava, color: '#777BB4', name: 'PHP' },
    { icon: faPython, color: '#3776AB', name: 'Python' }
  ];

  const frameworkSkills = [
    { icon: faFlutter, color: '#0854f7ff', name: 'Flutter' },
    { icon: faApple, color: '#ffffffff', name: 'iOS' },
    { icon: faAndroid, color: '#3DDC84', name: 'Android' },
    { icon: faStripe, color: '#008CDD', name: 'Stripe' },
    { icon: faReact, color: '#FFCA28', name: 'Firebase' },
    { icon: faLaravel, color: '#FF2D20', name: 'Laravel' },
    { icon: faDatabase, color: '#336791', name: 'PostgreSQL' }
  ];

  const otherSkills = [
    { icon: faGithub, color: '#61DAFB', name: 'REST API' },
    { icon: faGooglePlay, color: '#4d6bd7ff', name: 'Play Store' },
    { icon: faAppStoreIos, color: '#0D96F6', name: 'iOS Store' },
    { icon: faDocker, color: '#2496ED', name: 'Docker' },
    { icon: faGitAlt, color: '#F05032', name: 'Git' },
    { icon: faLinux, color: '#FCC624', name: 'Linux' },
    { icon: faAws, color: '#FF9900', name: 'AWS' },
  ];

  return (
    <section id="about" className="s-about target-section">
      <div className="row about-info wide" data-animate-block>
        <div className="column lg-6 md-12 about-info__pic-block">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/about-photo.png`}
            alt="Mohd Mustak"
            className="about-info__pic"
            data-animate-el
          />
        </div>

        <div className="column lg-6 md-12">
          <div className="about-info__text">
            <h2 className="text-pretitle with-line" data-animate-el>
              About
            </h2>
            <p className="attention-getter" data-animate-el>
              I build reliable solutions that solve real problems and drive growth. From idea to launch, I can deliver end-to-end.
            </p>
            <a
              href="https://docs.google.com/document/d/1qAU7TlKWQGD051blv1xFioC74BDI8PLNcO1wsJZJrXE/edit?tab=t.0"
              className="btn btn--medium u-fullwidth"
              data-animate-el
              target="_blank"
              rel="noopener noreferrer"
            >
              View CV
            </a>
          </div>
        </div>
      </div>

      <div className="row about-expertise" data-animate-block>
        <div className="column lg-12">
          <h2 className="text-pretitle" data-animate-el>Expertise</h2>

          <div className="skills-section">
            <h3 className="skills-subtitle">Languages</h3>
            <ul className="skills-list h1" data-animate-el>
              {languageSkills.map((skill, index) => (
                <li key={index}>
                  <FontAwesomeIcon
                    icon={skill.icon}
                    style={{ color: skill.color }}
                    title={skill.name}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="skills-section">
            <h3 className="skills-subtitle">Frameworks & Tools</h3>
            <ul className="skills-list h1" data-animate-el>
              {frameworkSkills.map((skill, index) => (
                <li key={index}>
                  <FontAwesomeIcon
                    icon={skill.icon}
                    style={{ color: skill.color }}
                    title={skill.name}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="skills-section">
            <h3 className="skills-subtitle">Others</h3>
            <ul className="skills-list h1" data-animate-el>
              {otherSkills.map((skill, index) => (
                <li key={index}>
                  <FontAwesomeIcon
                    icon={skill.icon}
                    style={{ color: skill.color }}
                    title={skill.name}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="row about-timelines" data-animate-block>
        <div className="column lg-6 tab-12">
          <h2 className="text-pretitle" data-animate-el>
            Experience
          </h2>

          <div className="timeline" data-animate-el>
            <div className="timeline__block">
              <div className="timeline__bullet"></div>
              <div className="timeline__header">
                <h4 className="timeline__title">Ulearna Tech (Dubai, UAE - Remote)</h4>
                <h5 className="timeline__meta">Senior Software Engineer (Flutter)</h5>
                <p className="timeline__timeframe">November 2024 - Present</p>
              </div>
              <div className="timeline__desc">
                <p>Lead & developed a property buying, selling, and renting platform for Gulf countries.
                  Achieved 10K+ downloads within the first month without marketing spend. Built the app
                  from scratch with multilingual localization, deep linking, and nearby property search.
                  Published on both iOS and Play Store with 4.5+ rating.</p>
              </div>
            </div>

            <div className="timeline__block">
              <div className="timeline__bullet"></div>
              <div className="timeline__header">
                <h4 className="timeline__title">SwiftAMS (Gurugram)</h4>
                <h5 className="timeline__meta">Senior Software Engineer (Flutter)</h5>
                <p className="timeline__timeframe">August 2023 - October 2024</p>
              </div>
              <div className="timeline__desc">
                <p>Led development of three mobile apps with end-to-end delivery capabilities.
                  Built B2B mobile app boosting business engagement. Implemented Flutter CI/CD pipeline
                  for white-labelled apps. Gained experience with PostgreSQL, NestJS, Docker, AWS (EC2),
                  and Digital Ocean.</p>
              </div>
            </div>

            <div className="timeline__block">
              <div className="timeline__bullet"></div>
              <div className="timeline__header">
                <h4 className="timeline__title">TaskEx (Remote - Australia)</h4>
                <h5 className="timeline__meta">Software Engineer (Flutter)</h5>
                <p className="timeline__timeframe">July 2022 - July 2023</p>
              </div>
              <div className="timeline__desc">
                <p>Built high-performance Flutter app for logistics with advanced navigation and
                  real-time tracking. Integrated Stripe Tap-to-Pay for secure transactions.
                  Designed real-time messaging and calendar features. Delivered cross-platform
                  support for iOS and Android.</p>
              </div>
            </div>

            <div className="timeline__block">
              <div className="timeline__bullet"></div>
              <div className="timeline__header">
                <h4 className="timeline__title">Yasita Creations (Gurugram)</h4>
                <h5 className="timeline__meta">Software Engineer (Flutter)</h5>
                <p className="timeline__timeframe">January 2021 - June 2022</p>
              </div>
              <div className="timeline__desc">
                <p>Digitized manual workflows into an efficient mobile application. Leveraged Firebase
                  for real-time sync, later migrated to Supabase. Implemented Firebase Phone Authentication
                  with OTP. Increased operational efficiency by 40-45%. Developed intelligent inventory
                  and automated task assignment features.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="column lg-6 tab-12">
          <h2 className="text-pretitle" data-animate-el>
            Education
          </h2>

          <div className="timeline" data-animate-el>
            <div className="timeline__block">
              <div className="timeline__bullet"></div>
              <div className="timeline__header">
                <h4 className="timeline__title">Maharishi Dayanand University</h4>
                <h5 className="timeline__meta">Bachelor of Technology in Computer Science</h5>
                <p className="timeline__timeframe">August 2021</p>
              </div>
              <div className="timeline__desc">
                <p>Rohtak, Haryana</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 