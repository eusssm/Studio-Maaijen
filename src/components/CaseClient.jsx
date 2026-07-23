'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

function parseVideoUrl(url, isHero = false) {
  if (!url) return null;
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([a-zA-Z0-9]+))?/);
  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);

  if (vimeoMatch) {
    const id = vimeoMatch[1];
    const hash = vimeoMatch[2];
    let embed = `https://player.vimeo.com/video/${id}?autoplay=1&loop=1&muted=1&background=1&quality=auto`;
    if (hash) embed += `&h=${hash}`;
    return embed;
  }

  if (youtubeMatch) {
    const id = youtubeMatch[1];
    const extra = isHero ? '&modestbranding=1' : '';
    return `https://www.youtube.com/embed/${id}?autoplay=1&loop=1&mute=1&playlist=${id}&controls=0&showinfo=0&rel=0${extra}`;
  }

  return null;
}

function renderCtaButton(url, label, defaultText = 'Bekijk live website') {
  if (!url) return null;
  const isVimeo = url.includes('vimeo.com');
  const isYoutube = url.includes('youtube.com') || url.includes('youtu.be');
  let fallback = defaultText;
  if (isVimeo) fallback = 'Bekijk op Vimeo';
  else if (isYoutube) fallback = 'Bekijk op YouTube';
  
  const text = label || fallback;

  return (
    <div className="case-block-cta reveal">
      <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary cta-block-btn">
        <span>{text}</span>
        <span className="cta-btn-arrow">↗</span>
      </a>
    </div>
  );
}

export default function CaseClient({ project, nextProject }) {
  const containerRef = useRef();

  useEffect(() => {
    import('./case-animations').then((mod) => {
      let ctx = gsap.context(() => {
        mod.initCaseAnimations(containerRef.current);
      }, containerRef);
      return () => ctx.revert();
    });
  }, []);

  if (!project) return null;

  return (
    <div ref={containerRef} className="case-page-container">
      <div id="scroll-bar"></div>
      <div id="cursor"></div>
      <div id="cursor-ring"></div>

      <nav id="nav">
        <Link href="/" className="nav-logo">STUDIO MAAIJEN</Link>
        <ul className="nav-links">
          <li><Link href="/#work-section">Werk</Link></li>
          <li><Link href="/#services">Disciplines</Link></li>
          <li><Link href="/#about">Over</Link></li>
          <li><Link href="/#cta">Contact</Link></li>
        </ul>
        <button className="nav-menu-btn" id="menu-open-btn">Menu</button>
      </nav>

      <div id="menu-overlay">
        <div className="menu-col-left">
          <button className="menu-close" id="menu-close-btn">Sluiten ✕</button>
          <nav className="menu-nav">
            <Link href="/#work-section"><span>Werk</span><span className="arrow">→</span></Link>
            <Link href="/#services"><span>Disciplines</span><span className="arrow">→</span></Link>
            <Link href="/#about"><span>Over Mij</span><span className="arrow">→</span></Link>
            <Link href="/#cta"><span>Contact</span><span className="arrow">→</span></Link>
          </nav>
          <div className="menu-footer">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:eusssm@gmail.com">Email</a>
          </div>
        </div>
        <div className="menu-col-right">
          <div className="menu-col-right-inner"></div>
        </div>
      </div>

      <section id="case-hero">
        {(() => {
          const embedSrc = parseVideoUrl(project.headerVideoUrl, true);
          const hasUploadedVideo = project.headerVideo;
          const hasCoverImage = project.coverImage;

          return (
            <div className="case-hero-bg" style={!embedSrc && !hasUploadedVideo && hasCoverImage ? { backgroundImage: `url(${project.coverImage.url})` } : {}}>
              {embedSrc ? (
                <iframe
                  src={embedSrc}
                  style={{ position: 'absolute', top: '50%', left: '50%', width: '300%', height: '300%', transform: 'translate(-50%, -50%)', border: 0, pointerEvents: 'none', zIndex: 0 }}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title="Hero video"
                />
              ) : hasUploadedVideo ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                >
                  <source src={project.headerVideo.video?.mp4Url || project.headerVideo.url} type={project.headerVideo.mimeType || 'video/mp4'} />
                </video>
              ) : null}
              <div className="case-hero-noise" style={{ zIndex: 2 }}></div>
              <div className="case-hero-parallax-bg" id="hero-parallax"></div>
            </div>
          );
        })()}

        <div className="case-hero-content">
          <h1 className="case-hero-title" id="hero-title">
            <div className="line-wrap"><span className="line-inner">{project.title}</span></div>
          </h1>
          <p className="case-hero-sub" id="hero-sub">{project.introText}</p>
        </div>

        <div className="case-hero-scroll-hint">
          <span></span>Scroll
        </div>
      </section>

      <div className="info-strip" id="info-strip">
        <div className="info-item">
          <div className="info-label">Klant</div>
          <div className="info-value">{project.client}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Type project</div>
          <div className="info-value">{project.categories?.map(c => c.name).join(', ') || project.projectType}</div>
        </div>
      </div>

      <main className="case-main">
        {project.pageBuilder?.map((block, index) => {
          switch (block._modelApiKey) {
            case 'block_text': {
              let alignClass = 'align-left';
              if (block.textAlignment === 'Midden') alignClass = 'align-center';
              if (block.textAlignment === 'Rechts') alignClass = 'align-right';
              return (
                <section key={block.id} className={`case-section ${block.darkTheme ? 'case-section--dark' : 'module--light'}`}>
                  <div className={`case-section-inner ${alignClass}`}>
                    {block.showSubtitle !== false && (
                      <div className="project-section-label reveal">{block.subtitle || project.title}</div>
                    )}
                    <h3 className="case-section-title reveal">{block.title}</h3>
                    <div className="case-section-body reveal" dangerouslySetInnerHTML={{ __html: block.content }} />
                    {renderCtaButton(block.ctaUrl, block.ctaLabel, 'Bekijk resultaat online')}
                  </div>
                </section>
              );
            }
            case 'block_image': {
              const isVideo = block.image?.mimeType?.startsWith('video/') || block.image?.url?.match(/\.(mp4|webm|mov|ogg)$/i);
              return (
                <div key={block.id} className="full-image-wrap">
                  {isVideo ? (
                    <video
                      className="full-image parallax-img"
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    >
                      <source src={videoSrc} type={block.image.mimeType || 'video/mp4'} />
                    </video>
                  ) : (
                    <div className="full-image parallax-img" style={{ backgroundImage: `url(${block.image?.url})` }}>
                      <div className="img-inner-text">{project.title}</div>
                    </div>
                  )}
                </div>
              );
            }
            case 'block_zebra': {
              const isVideo = block.image?.mimeType?.startsWith('video/') || block.image?.url?.match(/\.(mp4|webm|mov|ogg)$/i);
              const videoSrc = block.image?.video?.mp4Url || block.image?.url;
              let alignClass = 'align-left';
              if (block.textAlignment === 'Midden') alignClass = 'align-center';
              if (block.textAlignment === 'Rechts') alignClass = 'align-right';

              const showImage = block.image && block.displayLayout !== 'Alleen Tekst (Verberg beeld)';

              return (
                <section key={block.id} className={`case-section ${block.darkTheme ? 'case-section--dark' : 'module--light'}`}>
                   <div className={`case-section-inner ${alignClass}`}>
                    {block.showSubtitle !== false && (
                      <div className="project-section-label reveal">{block.subtitle || project.title}</div>
                    )}
                    <h3 className="case-section-title reveal">{block.title}</h3>
                    {typeof block.text === 'string' && /<[a-z][\s\S]*>/i.test(block.text) ? (
                      <div className="case-section-lead reveal" dangerouslySetInnerHTML={{ __html: block.text }} />
                    ) : (
                      <p className="case-section-lead reveal">{block.text}</p>
                    )}
                    {renderCtaButton(block.ctaUrl, block.ctaLabel, 'Bekijk resultaat online')}
                  </div>
                  {showImage && (
                    <div className="full-image-wrap" style={{ marginTop: '40px' }}>
                      {isVideo ? (
                        <video
                          className="reveal"
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        >
                          <source src={videoSrc} type={block.image.mimeType || 'video/mp4'} />
                        </video>
                      ) : (
                        <img src={block.image.url} alt={block.title} className="reveal" style={{ width: '100%', height: 'auto', display: 'block' }} />
                      )}
                    </div>
                  )}
                </section>
              );
            }
            case 'block_video': {
              const embedSrc = parseVideoUrl(block.externalVideoUrl);
              const videoSrc = block.video?.video?.mp4Url || block.video?.url;

              return (
                <div key={block.id} className="full-image-wrap">
                  {embedSrc ? (
                    <div className="reveal" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                      <iframe
                        src={embedSrc}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={block.title || 'Video'}
                      />
                    </div>
                  ) : videoSrc ? (
                    <video
                      className="reveal"
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    >
                      <source src={videoSrc} type={block.video.mimeType || 'video/mp4'} />
                      Your browser does not support the video tag.
                    </video>
                  ) : null}
                  {renderCtaButton(block.ctaUrl, block.ctaLabel, 'Bekijk video op Vimeo')}
                </div>
              );
            }
            case 'block_double_image': {
              const renderMedia = (image, alt) => {
                if (!image) return null;
                const isVideo = image.mimeType?.startsWith('video/') || image.url?.match(/\.(mp4|webm|mov|ogg)$/i);
                const videoSrc = image.video?.mp4Url || image.url;
                if (isVideo) {
                  return (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    >
                      <source src={videoSrc} type={image.mimeType || 'video/mp4'} />
                    </video>
                  );
                }
                return <img src={image.url} alt={image.alt || alt} />;
              };

              return (
                <div key={block.id} className="case-section double-image-section">
                  <div className="double-image-inner">
                    <div className="double-image-left reveal">
                      {renderMedia(block.imageLeft, "Left image")}
                    </div>
                    <div className="double-image-right reveal">
                      {renderMedia(block.imageRight, "Right image")}
                    </div>
                  </div>
                </div>
              );
            }
            case 'block_image_text': {
              const embedSrc = parseVideoUrl(block.externalVideoUrl);
              const isVideo = block.image?.mimeType?.startsWith('video/') || block.image?.url?.match(/\.(mp4|webm|mov|ogg)$/i);
              const videoSrc = block.image?.video?.mp4Url || block.image?.url;

              const showMedia = (embedSrc || block.image) && block.displayLayout !== 'Alleen Tekst (Verberg beeld)';
              
              let alignClass = 'align-left';
              if (block.textAlignment === 'Midden') alignClass = 'align-center';
              if (block.textAlignment === 'Rechts') alignClass = 'align-right';

              if (!showMedia) {
                // Render cleanly as text-only block
                return (
                  <section key={block.id} className={`case-section ${block.darkTheme !== false ? 'case-section--dark' : 'module--light'}`}>
                    <div className={`case-section-inner ${alignClass}`}>
                      {block.showSubtitle !== false && (
                        <div className="project-section-label reveal">{block.subtitle || project.title}</div>
                      )}
                      <h3 className="case-section-title reveal">{block.title}</h3>
                      {typeof block.text === 'string' && /<[a-z][\s\S]*>/i.test(block.text) ? (
                        <div className="case-section-lead reveal" dangerouslySetInnerHTML={{ __html: block.text }} />
                      ) : (
                        <p className="case-section-lead reveal" style={{ whiteSpace: 'pre-line' }}>{block.text}</p>
                      )}
                      {renderCtaButton(block.ctaUrl, block.ctaLabel, 'Bekijk resultaat online')}
                    </div>
                  </section>
                );
              }

              // Determine layout class
              let ratioClass = '';
              if (block.layoutRatio === '2/3 Beeld - 1/3 Tekst') ratioClass = 'ratio-2-3';
              if (block.layoutRatio === '1/3 Beeld - 2/3 Tekst') ratioClass = 'ratio-1-3';
              if (block.layoutRatio === '3/4 Beeld - 1/4 Tekst') ratioClass = 'ratio-3-4';
              if (block.layoutRatio === '1/4 Beeld - 3/4 Tekst') ratioClass = 'ratio-1-4';

              return (
                <section key={block.id} className={`case-section image-text-section ${block.darkTheme !== false ? 'case-section--dark' : 'module--light'}`}>
                  <div className={`image-text-inner ${block.imageOnRight ? 'layout-reversed' : ''} ${ratioClass}`}>
                    <div className="image-text-media reveal">
                      {embedSrc ? (
                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
                          <iframe
                            src={embedSrc}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            title={block.title || 'Video'}
                          />
                        </div>
                      ) : block.image && (
                        isVideo ? (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }}
                          >
                            <source src={videoSrc} type={block.image.mimeType || 'video/mp4'} />
                          </video>
                        ) : (
                          <img src={block.image.url} alt={block.title || "Section image"} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
                        )
                      )}
                    </div>
                    <div className={`image-text-content ${alignClass}`}>
                      {block.showSubtitle !== false && (
                        <div className="project-section-label reveal">{block.subtitle || project.title}</div>
                      )}
                      <h3 className="case-section-title reveal">{block.title}</h3>
                      {typeof block.text === 'string' && /<[a-z][\s\S]*>/i.test(block.text) ? (
                        <div className="case-section-lead reveal" dangerouslySetInnerHTML={{ __html: block.text }} />
                      ) : (
                        <p className="case-section-lead reveal" style={{ whiteSpace: 'pre-line' }}>{block.text}</p>
                      )}
                      {renderCtaButton(block.ctaUrl, block.ctaLabel, 'Bekijk resultaat online')}
                    </div>
                  </div>
                </section>
              );
            }
            default:
              return null;
          }
        })}
      </main>

      {nextProject && (
        <Link href={`/work/${nextProject.slug}`} className="next-project" id="next-project">
          <div className="next-project-bg" style={{ backgroundImage: nextProject.coverImage ? `url(${nextProject.coverImage.url})` : 'none' }}></div>
          <div className="next-project-label">Volgend project</div>
          <div className="next-project-title">{nextProject.title}<br /><em>→</em></div>
          <div className="next-project-type">{nextProject.projectType}</div>
        </Link>
      )}

      <section className="case-cta">
        <div className="case-cta-inner reveal">
          <p className="case-cta-eyebrow">Klaar om samen te werken?</p>
          <h2 className="case-cta-title">Laten we <em>iets moois</em><br />maken.</h2>
          <div className="case-cta-btns">
            <a href="mailto:eusssm@gmail.com" className="btn btn-primary">Mail mij direct →</a>
            <Link href="/work" className="btn btn-outline">Terug naar portfolio</Link>
          </div>
        </div>
      </section>

      <footer className="case-footer">
        <div className="case-footer-inner">
          <span>© 2026 Eugène Maaijen</span>
          <Link href="/work">← Werk</Link>
          <a href="#" className="back-top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>↑ Top</a>
        </div>
      </footer>
    </div>
  );
}
