import React, { useState, useCallback, useEffect, useRef } from 'react';
import projectsData from '../data/projects.json';
import testamentsData from '../data/testaments.json';

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
  const [zoomedProject, setZoomedProject] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  const testimonials = testamentsData.recommendations.map((rec) => ({
    name: rec.employer_name,
    position: rec.company,
    avatar: rec.image_url,
    text: rec.text
  }));

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

  const toggleZoom = (projectId) => {
    setZoomedProject((prev) => (prev === projectId ? null : projectId));
  };

  return (
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
              const isZoomed = zoomedProject === project.id;
              // Each image = 33.333% width. Center currentCenter in the middle slot.
              const translatePercent = (1 - currentCenter) * 33.333;
              return (
                <div key={project.id} className="project-card" data-animate-el>
                  {/* Screenshot carousel area */}
                  <div className={`project-card__gallery ${isZoomed ? 'project-card__gallery--zoomed' : ''}`}>
                    <div
                      className="project-card__image-wrapper"
                      onClick={() => toggleZoom(project.id)}
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
                              className={`project-card__screenshot ${posClass} ${isZoomed ? 'project-card__screenshot--zoomed' : ''}`}
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
                          aria-label="Previous screenshot"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          className="project-card__nav project-card__nav--next"
                          onClick={(e) => { e.stopPropagation(); nextImage(project.id, totalImages); }}
                          aria-label="Next screenshot"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Dot indicators */}
                    {hasMultipleImages && (
                      <div className="project-card__dots">
                        {project.images.map((_, idx) => (
                          <button
                            key={idx}
                            className={`project-card__dot ${idx === currentCenter ? 'project-card__dot--active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setImageIndices((prev) => ({ ...prev, [project.id]: idx }));
                            }}
                            aria-label={`Go to image ${idx + 1}`}
                          />
                        ))}
                      </div>
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
                      <a
                        href={project.link}
                        className="project-card__link"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>

                    <p className="project-card__desc">{project.description}</p>

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
            <div className="testimonial-carousel__viewport">
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

            {/* Nav buttons */}
            <button
              className="testimonial-carousel__nav testimonial-carousel__nav--prev"
              onClick={() => goToTestimonial(activeTestimonial === 0 ? testimonials.length - 1 : activeTestimonial - 1)}
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className="testimonial-carousel__nav testimonial-carousel__nav--next"
              onClick={() => goToTestimonial((activeTestimonial + 1) % testimonials.length)}
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

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
  );
};

export default Works;