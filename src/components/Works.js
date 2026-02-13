import React, { useState, useCallback, useEffect } from 'react';
import projectsData from '../data/projects.json';

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

  // Initialize indices
  useEffect(() => {
    const initial = {};
    projects.forEach((p) => { initial[p.id] = 0; });
    setImageIndices(initial);
  }, []);

  const nextImage = useCallback((projectId, totalImages) => {
    setImageIndices((prev) => ({
      ...prev,
      [projectId]: prev[projectId] === totalImages - 1 ? 0 : (prev[projectId] || 0) + 1,
    }));
  }, []);

  const prevImage = useCallback((projectId, totalImages) => {
    setImageIndices((prev) => ({
      ...prev,
      [projectId]: prev[projectId] === 0 ? totalImages - 1 : (prev[projectId] || 0) - 1,
    }));
  }, []);

  const toggleZoom = (projectId) => {
    setZoomedProject((prev) => (prev === projectId ? null : projectId));
  };

  const testimonials = [
    {
      name: "Tim Cook",
      position: "CEO, Apple",
      avatar: `${process.env.PUBLIC_URL}/assets/images/avatars/user-02.jpg`,
      text: "Molestiae incidunt consequatur quis ipsa autem nam sit enim magni. Voluptas tempore rem. Explicabo a quaerat sint autem dolore ducimus ut consequatur neque. Nisi dolores quaerat fuga rem nihil nostrum. Laudantium quia consequatur molestias delectus culpa."
    },
    {
      name: "Sundar Pichai",
      position: "CEO, Google",
      avatar: `${process.env.PUBLIC_URL}/assets/images/avatars/user-03.jpg`,
      text: "Excepturi nam cupiditate culpa doloremque deleniti repellat. Veniam quos repellat voluptas animi adipisci. Nisi eaque consequatur. Voluptatem dignissimos ut ducimus accusantium perspiciatis. Quasi voluptas eius distinctio. Atque eos maxime."
    },
    {
      name: "Satya Nadella",
      position: "CEO, Microsoft",
      avatar: `${process.env.PUBLIC_URL}/assets/images/avatars/user-01.jpg`,
      text: "Repellat dignissimos libero. Qui sed at corrupti expedita voluptas odit. Nihil ea quia nesciunt. Ducimus aut sed ipsam. Autem eaque officia cum exercitationem sunt voluptatum accusamus. Quasi voluptas eius distinctio. Voluptatem dignissimos ut."
    },
    {
      name: "Jeff Bezos",
      position: "CEO, Amazon",
      avatar: `${process.env.PUBLIC_URL}/assets/images/avatars/user-06.jpg`,
      text: "Nunc interdum lacus sit amet orci. Vestibulum dapibus nunc ac augue. Fusce vel dui. In ac felis quis tortor malesuada pretium. Curabitur vestibulum aliquam leo. Qui sed at corrupti expedita voluptas odit. Nihil ea quia nesciunt. Ducimus aut sed ipsam."
    }
  ];

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
              const currentIndex = imageIndices[project.id] || 0;
              const hasMultiple = project.images.length > 1;
              const isZoomed = zoomedProject === project.id;
              return (
                <div key={project.id} className="project-card" data-animate-el>
                  {/* Screenshot carousel area */}
                  <div className={`project-card__gallery ${isZoomed ? 'project-card__gallery--zoomed' : ''}`}>
                    <div
                      className="project-card__image-wrapper"
                      onClick={() => toggleZoom(project.id)}
                    >
                      {project.images.length > 0 && (
                        <img
                          src={project.images[currentIndex]}
                          alt={`${project.title} screenshot ${currentIndex + 1}`}
                          className={`project-card__screenshot ${isZoomed ? 'project-card__screenshot--zoomed' : ''}`}
                        />
                      )}
                    </div>

                    {/* Round nav arrows */}
                    {hasMultiple && (
                      <>
                        <button
                          className="project-card__nav project-card__nav--prev"
                          onClick={(e) => { e.stopPropagation(); prevImage(project.id, project.images.length); }}
                          aria-label="Previous screenshot"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          className="project-card__nav project-card__nav--next"
                          onClick={(e) => { e.stopPropagation(); nextImage(project.id, project.images.length); }}
                          aria-label="Next screenshot"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Dot indicators */}
                    {hasMultiple && (
                      <div className="project-card__dots">
                        {project.images.map((_, idx) => (
                          <button
                            key={idx}
                            className={`project-card__dot ${idx === currentIndex ? 'project-card__dot--active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setImageIndices((prev) => ({ ...prev, [project.id]: idx }));
                            }}
                            aria-label={`Go to screenshot ${idx + 1}`}
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
          <div className="swiper-container testimonial-slider" data-animate-el>
            <div className="swiper-wrapper">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-slider__slide swiper-slide">
                  <div className="testimonial-slider__author">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="testimonial-slider__avatar"
                    />
                    <cite className="testimonial-slider__cite">
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.position}</span>
                    </cite>
                  </div>
                  <p>{testimonial.text}</p>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;