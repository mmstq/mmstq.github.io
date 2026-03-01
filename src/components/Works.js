import React, { useState, useCallback, useEffect, useRef } from 'react';
import projectsData from '../data/projects.json';
import testamentsData from '../data/testaments.json';
import googlePlayIcon from '../assets/icons/google-play.png';
import appStoreIcon from '../assets/icons/app-store.png';

// Dynamically import all project images
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const allImages = importAll(
  require.context('../assets/project_images', true, /\.(png|jpe?g|webp|svg)$/)
);

const employerImages = importAll(
  require.context('../assets/employer_photos', false, /\.(png|jpe?g|webp|svg)$/)
);

// Helper to get image path from the imported context
const getImage = (projectId, filename) => {
  const key = `${projectId}/${filename}`;
  return allImages[key];
};

// Build full project objects with resolved image paths
const projects = projectsData.map((project) => {
  const logo = project.logo ? getImage(project.id, project.logo) : null;
  const screenshots = [];
  for (let i = 1; i <= project.screenshots; i++) {
    const img = getImage(project.id, `${i}.${project.screenshotExt}`);
    if (img) screenshots.push(img);
  }
  return { ...project, logoSrc: logo, images: screenshots };
});

// Color palette for tech tags
const tagColors = [
  { bg: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', border: 'rgba(99, 102, 241, 0.3)' },
  { bg: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: 'rgba(16, 185, 129, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: 'rgba(239, 68, 68, 0.3)' },
  { bg: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: 'rgba(168, 85, 247, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', border: 'rgba(6, 182, 212, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: 'rgba(34, 197, 94, 0.3)' },
];

const Works = () => {
  const [imageIndices, setImageIndices] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [projectTouchStartX, setProjectTouchStartX] = useState(null);
  const [expandedDesc, setExpandedDesc] = useState({});
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const testimonialTimerRef = useRef(null);

  // Initialize indices
  useEffect(() => {
    const initial = {};
    projects.forEach((p) => {
      // Start at index 1 so there's an image on the left and right (if enough images)
      initial[p.id] = p.images.length > 1 ? 1 : 0;
    });
    setImageIndices(initial);
  }, []);

  const testimonials = testamentsData.recommendations.map((rec) => {
    let avatarSrc = rec.image_url;
    if (avatarSrc && avatarSrc.includes('/')) {
      const filename = avatarSrc.split('/').pop();
      if (employerImages[filename]) {
        avatarSrc = employerImages[filename];
      }
    }
    return {
      name: rec.employer_name,
      position: rec.company,
      avatar: avatarSrc,
      text: rec.text
    };
  });

  // Auto-advance testimonials
  useEffect(() => {
    testimonialTimerRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(testimonialTimerRef.current);
  }, [testimonials.length]);

  const goToTestimonial = (idx) => {
    setActiveTestimonial(idx);
    clearInterval(testimonialTimerRef.current);
    testimonialTimerRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  // Navigate one image at a time
  const nextImage = useCallback((projectId, totalImages) => {
    setImageIndices((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) === totalImages - 1 ? 0 : (prev[projectId] || 0) + 1,
    }));
  }, []);

  const prevImage = useCallback((projectId, totalImages) => {
    setImageIndices((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) === 0 ? totalImages - 1 : (prev[projectId] || 0) - 1,
    }));
  }, []);

  const toggleDesc = (projectId) => {
    setExpandedDesc((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  const handleProjectTouchStart = (e) => {
    setProjectTouchStartX(e.targetTouches[0].clientX);
  };

  const handleProjectTouchEnd = (e, projectId, totalImages) => {
    if (projectTouchStartX === null) return;
    const currentX = e.changedTouches[0].clientX;
    const diff = projectTouchStartX - currentX;

    if (diff > 50) {
      nextImage(projectId, totalImages);
    } else if (diff < -50) {
      prevImage(projectId, totalImages);
    }
    setProjectTouchStartX(null);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const currentX = e.changedTouches[0].clientX;
    const diff = touchStartX - currentX;

    if (diff > 50) {
      goToTestimonial((activeTestimonial + 1) % testimonials.length);
    } else if (diff < -50) {
      goToTestimonial(activeTestimonial === 0 ? testimonials.length - 1 : activeTestimonial - 1);
    }
    setTouchStartX(null);
  };

  return (
    <>
      <section id="works" className="s-works target-section">
        <div className="row works-portfolio">
          <div className="column lg-12" data-animate-block>
            <h2 className="text-pretitle" data-animate-el>
              Recent Works
            </h2>
            <p className="h1" data-animate-el>
              Here are some of my favorite projects I have done lately. Feel free to check them out.
            </p>

            <div className="project-grid">
              {projects.map((project) => {
                const currentCenter = imageIndices[project.id] || 0;
                const totalImages = project.images.length;
                const hasMultipleImages = totalImages > 1;
                // Each image = 33.333% width. Center currentCenter in the middle slot.
                const translatePercent = (1 - currentCenter) * 33.333;
                const isDescExpanded = expandedDesc[project.id];
                return (
                  <div key={project.id} className="project-card" data-animate-el>
                    {/* Screenshot carousel area */}
                    <div className="project-card__gallery">
                      <div
                        className="project-card__image-wrapper"
                        onTouchStart={handleProjectTouchStart}
                        onTouchEnd={(e) => handleProjectTouchEnd(e, project.id, totalImages)}
                      >
                        <div
                          className="project-card__slide-track"
                          style={{ transform: `translateX(${translatePercent}%)` }}
                        >
                          {project.images.map((img, imgIdx) => {
                            const posClass = imgIdx === currentCenter
                              ? 'project-card__screenshot--center'
                              : 'project-card__screenshot--side';
                            return (
                              <img
                                key={imgIdx}
                                src={img}
                                alt={`${project.title} screenshot ${imgIdx + 1}`}
                                className={`project-card__screenshot ${posClass}`}
                                onClick={() => setSelectedImage(img)}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Round nav arrows */}
                      {hasMultipleImages && (
                        <>
                          <button
                            className="project-card__nav project-card__nav--prev"
                            onClick={(e) => { e.stopPropagation(); prevImage(project.id, totalImages); }}
                            onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); prevImage(project.id, totalImages); }}
                            aria-label="Previous screenshot"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                          <button
                            className="project-card__nav project-card__nav--next"
                            onClick={(e) => { e.stopPropagation(); nextImage(project.id, totalImages); }}
                            onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); nextImage(project.id, totalImages); }}
                            aria-label="Next screenshot"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </>
                      )}

                    </div>

                    {/* Project info */}
                    <div className="project-card__info">
                      <div className="project-card__header">
                        {project.logoSrc && (
                          <img
                            src={project.logoSrc}
                            alt={`${project.title} logo`}
                            className="project-card__logo"
                          />
                        )}
                        <h3 className="project-card__title">{project.title}</h3>
                        <div className="project-card__store-links">
                          {project.link && project.link !== "#" && (
                            <a
                              href={project.link}
                              className="project-card__link"
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Play Store"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <img src={googlePlayIcon} alt="Play Store" width="20" height="20" style={{ objectFit: 'contain' }} />
                            </a>
                          )}
                          {project.iosLink && project.iosLink !== "#" && (
                            <a
                              href={project.iosLink}
                              className="project-card__link"
                              target="_blank"
                              rel="noopener noreferrer"
                              title="App Store"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <img src={appStoreIcon} alt="App Store" width="20" height="20" style={{ objectFit: 'contain' }} />
                            </a>
                          )}
                        </div>
                      </div>

                      <div style={{ marginBottom: "1rem" }}>
                        <p className="project-card__desc">
                          {isDescExpanded || !project.description || project.description.length <= 120
                            ? project.description
                            : `${project.description.substring(0, 120)}...`}
                          {project.description && project.description.length > 120 && (
                            <button
                              className="project-card__desc-btn"
                              onClick={(e) => { e.stopPropagation(); toggleDesc(project.id); }}
                            >
                              {isDescExpanded ? 'View less' : 'Read more'}
                            </button>
                          )}
                        </p>
                      </div>

                      <div className="project-card__tags">
                        {project.tech.map((tag, idx) => {
                          const colorSet = tagColors[idx % tagColors.length];
                          return (
                            <span
                              key={idx}
                              className="project-card__tag"
                              style={{
                                background: colorSet.bg,
                                color: colorSet.color,
                                border: `1px solid ${colorSet.border}`,
                              }}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="row testimonials">
          <div className="column lg-12" data-animate-block>
            <h2 className="text-pretitle" data-animate-el>
              Testimonials
            </h2>
            <div className="testimonial-carousel" data-animate-el>
              <div
                className="testimonial-carousel__viewport"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="testimonial-carousel__track"
                  style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-carousel__slide">
                      <div className="testimonial-carousel__content">
                        <p className="testimonial-carousel__text">{testimonial.text}</p>
                        <div className="testimonial-carousel__author">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="testimonial-carousel__avatar"
                          />
                          <div className="testimonial-carousel__meta">
                            <strong className="testimonial-carousel__name">{testimonial.name}</strong>
                            <span className="testimonial-carousel__position">{testimonial.position}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nav buttons removed */}
              {/* Dot indicators */}
              <div className="testimonial-carousel__dots">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    className={`testimonial-carousel__dot ${idx === activeTestimonial ? 'testimonial-carousel__dot--active' : ''}`}
                    onClick={() => goToTestimonial(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-popup" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>&times;</button>
            <img src={selectedImage} alt="Enlarged screenshot" />
          </div>
        </div>
      )}
    </>
  );
};

export default Works;