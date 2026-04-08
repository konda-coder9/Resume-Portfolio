"use client";

import { Fragment, type CSSProperties, useEffect, useRef, useState, useSyncExternalStore } from "react";

type ExperienceEntry = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

type EducationEntry = {
  institution: string;
  period: string;
  title: string;
  description: string;
};

type DetailEntry = {
  title: string;
  subtitle: string;
  description: string;
};

const experiences: ExperienceEntry[] = [
  {
    role: "Full Stack Developer",
    company: "Haverford Systems Inc.",
    location: "Downingtown, PA",
    period: "Feb 2025 - Present",
    bullets: [
      "Re-architected a legacy browser-based JavaScript Stream Deck SDK to a Node.js architecture and improved reliability by 35%.",
      "Implemented a GitHub Actions CI/CD pipeline for multi-OS Stream Deck plugin packaging and Cloudflare-backed S3 deployment, reducing manual effort by 60%.",
      "Engineered a real-time voice tracking system for PTZ cameras using TCP, UDP, and multicast audio inputs with zone-based camera alignment.",
      "Integrated video switcher automation through IP and WebSocket protocols for automated source switching based on active speaker zones.",
      "Migrated critical REST API logic from a React frontend into a centralized backend server, reducing client complexity by 40%.",
      "Designed end-to-end bearer token authentication, including token generation, storage, and validation across protected APIs.",
      "Developed proxy routing architecture for browser-to-internal service forwarding to centralize business logic and improve security.",
      "Integrated go2rtc for WebRTC-based streaming and reduced live stream latency by over 30%.",
    ],
  },
  {
    role: "Software Developer",
    company: "West Chester University of Pennsylvania",
    location: "West Chester, PA",
    period: "Mar 2023 - Aug 2024",
    bullets: [
      "Developed and maintained academic and student-facing web applications used by 1,000+ users.",
      "Built backend services for course access, reporting, and data retrieval across university workflows.",
      "Optimized SQL queries and backend pipelines, reducing response times by over 30%.",
      "Developed responsive UI components with React, HTML5, and CSS3, increasing engagement by about 25%.",
      "Collaborated with faculty and product teams to deliver 10+ feature enhancements aligned to institutional needs.",
    ],
  },
  {
    role: "Software Developer",
    company: "Tata Consultancy Services",
    location: "Remote",
    period: "Jun 2021 - Dec 2022",
    bullets: [
      "Applied ServiceNow architecture principles to optimize ITSM workflows and improve SLA compliance.",
      "Automated ServiceNow-to-ELK data migration using Python scripts and dashboard integrations.",
      "Built Python ETL and data processing pipelines with pandas and requests, reducing prep time by over 70%.",
      "Designed and deployed 24/7 Azure Virtual Machine data processing architecture for analytics workflows.",
      "Configured cron-based orchestration for Azure-hosted data pipelines and improved processing efficiency by 60%.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Sravani Rao Label (AadyaCorp)",
    location: "Remote",
    period: "May 2020 - May 2021",
    bullets: [
      "Developed and maintained ecommerce features including product listings, cart management, and checkout flows.",
      "Integrated secure payment gateways and improved transaction reliability.",
      "Built responsive UI components using HTML5, CSS3, JavaScript, and React.",
      "Implemented REST API integrations for product, order, and authentication workflows.",
    ],
  },
];

const skills = [
  "Rust",
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Express.js",
  "Spring Boot",
  "Axum",
  "REST APIs",
  "JWT / Bearer Auth",
  "WebRTC",
  "WebSockets",
  "TCP / UDP / Multicast",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "ELK Stack",
  "Azure",
  "GitHub Actions",
  "Linux",
  "Shell Scripting",
  "System Design",
];

const education: EducationEntry[] = [
  {
    institution: "West Chester University of Pennsylvania",
    period: "Jan 2023 - Dec 2024",
    title: "Master of Science in Computer Science",
    description: "CGPA: 3.97 / 4.0",
  },
];

const languages: DetailEntry[] = [
  {
    title: "Language Details",
    subtitle: "Available",
    description: "Language proficiency details can be shared on request.",
  },
];

type ResumeSectionProps = {
  id: string;
  label: string;
  children: React.ReactNode;
};

function subscribe() {
  return () => {};
}

function useIsMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

function AliveGlyphs({ text, mode = "char" }: { text: string; mode?: "char" | "word" }) {
  const units = mode === "word" ? text.split(" ") : Array.from(text);
  const total = Math.max(units.length, 1);

  return (
    <>
      <span className="syntax-sr-only">{text}</span>
      {units.map((unit, index) => {
        const threshold = (index / total).toFixed(5);

        return (
          <Fragment key={`${index}-${unit}`}>
            <span
              aria-hidden="true"
              className="syntax-alive-glyph"
              style={{ "--glyph-threshold": threshold } as CSSProperties}
            >
              {mode === "char" && unit === " " ? "\u00A0" : unit}
            </span>
            {mode === "word" && index < units.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </>
  );
}

function ResumeSection({ id, label, children }: ResumeSectionProps) {
  return (
    <section id={id} className="syntax-section">
      <div className="syntax-panel" data-border="true">
        <div className="syntax-row">
          <h2 className="syntax-label">
            <span className="syntax-alive" data-alive aria-label={label}>
              <AliveGlyphs text={label} />
            </span>
          </h2>
          <div className="syntax-body">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const pageRef = useRef<HTMLElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const page = pageRef.current;
    if (!page) {
      return;
    }
    const aboutSection = page.querySelector<HTMLElement>("#about");

    let frameId: number | null = null;
    let targetProgress = 0;
    let renderedProgress = 0;
    let initialized = false;

    const setPhotoProgress = (progress: number) => {
      page.style.setProperty("--photo-progress", progress.toFixed(4));
    };

    const animatePhotoProgress = () => {
      const delta = targetProgress - renderedProgress;
      if (Math.abs(delta) < 0.0007) {
        renderedProgress = targetProgress;
        setPhotoProgress(renderedProgress);
        frameId = null;
        return;
      }

      renderedProgress += delta * 0.16;
      setPhotoProgress(renderedProgress);
      frameId = window.requestAnimationFrame(animatePhotoProgress);
    };

    const updateScrollProgress = () => {
      const isMobileViewport = window.matchMedia("(max-width: 809.98px)").matches;
      const slowdownFactor = 1.7; // ~70% slower photo motion than before.
      const desktopTravelDistance = window.innerHeight * 1.6 * slowdownFactor;

      if (isMobileViewport) {
        const aboutTop = aboutSection
          ? aboutSection.getBoundingClientRect().top + window.scrollY
          : window.innerHeight;
        const startOffset = Math.max(0, aboutTop - window.innerHeight);
        const mobileTravelDistance = window.innerHeight * 1.65 * slowdownFactor;
        const scrolledAfterStart = Math.max(0, window.scrollY - startOffset);
        targetProgress = Math.min(1, Math.max(0, scrolledAfterStart / mobileTravelDistance));
      } else {
        targetProgress = Math.min(1, Math.max(0, window.scrollY / desktopTravelDistance));
      }

      if (!initialized) {
        initialized = true;
        renderedProgress = targetProgress;
        setPhotoProgress(renderedProgress);
        return;
      }

      if (frameId === null) {
        frameId = window.requestAnimationFrame(animatePhotoProgress);
      }
    };

    const onScroll = () => {
      updateScrollProgress();
    };

    updateScrollProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const closeOnDesktop = () => {
      if (window.matchMedia("(min-width: 810px)").matches) {
        setIsMobileMenuOpen(false);
      }
    };

    closeOnDesktop();
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const page = pageRef.current;
    if (!page) {
      return;
    }

    const contentRoot = page.querySelector<HTMLElement>(".syntax-content");
    if (!contentRoot) {
      return;
    }

    const candidateNodes = Array.from(
      contentRoot.querySelectorAll<HTMLElement>(
        "[data-alive], p:not(.syntax-skill), li, a, h2, h3, h4, h5, h6, blockquote, .syntax-item, .syntax-contact-item",
      ),
    );
    const aliveNodes = Array.from(new Set(candidateNodes)).filter(
      (node) => !node.classList.contains("syntax-sr-only"),
    );
    if (aliveNodes.length === 0) {
      return;
    }

    aliveNodes.forEach((node) => node.classList.add("syntax-scroll-live"));
    page.setAttribute("data-alive-ready", "true");

    let ticking = false;
    const updateAliveProgress = () => {
      ticking = false;
      const viewportHeight = window.innerHeight;
      const revealStart = viewportHeight * 1.2;
      const revealEnd = viewportHeight * 0.65;

      aliveNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const rawProgress = (revealStart - rect.top) / (revealStart - revealEnd);
        const clampedProgress = Math.min(1, Math.max(0, rawProgress));
        const easedProgress = Math.pow(clampedProgress, 1.35);
        node.style.setProperty("--alive-progress", easedProgress.toFixed(4));
      });
    };

    const onScrollOrResize = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateAliveProgress);
    };

    updateAliveProgress();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      page.removeAttribute("data-alive-ready");
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [isMounted]);

  if (!isMounted) {
    return (
      <main className="syntax-page" ref={pageRef}>
        <div className="syntax-fixed-image" aria-hidden="true" />
      </main>
    );
  }

  return (
    <main className="syntax-page" ref={pageRef}>
      <div className="syntax-fixed-image" aria-hidden="true" />

      <header className="syntax-header syntax-animate-fade">
        <div className="syntax-header-row">
          <div className="syntax-brand-wrap">
            <p className="syntax-brand">Showri Konda</p>
            <span className="syntax-availability">
              <span className="syntax-dot" aria-hidden="true" />
              <span>Available for work</span>
            </span>
          </div>

          <div className="syntax-header-actions">
            <a
              href="/api/resume"
              className="syntax-header-link syntax-download-link"
            >
              Download CV
            </a>
            <a href="#contact" className="syntax-header-link">
              Contact Me
            </a>
            <span className="syntax-utc">(UTC-5)</span>
          </div>

          <button
            type="button"
            className="syntax-mobile-menu-button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-header-menu"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            Menu
          </button>
        </div>

        <div
          id="mobile-header-menu"
          className={`syntax-mobile-menu${isMobileMenuOpen ? " is-open" : ""}`}
        >
          <a
            href="/api/resume"
            className="syntax-mobile-menu-link syntax-download-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Download CV
          </a>
          <a
            href="#contact"
            className="syntax-mobile-menu-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Me
          </a>
          <span className="syntax-mobile-menu-utc">(UTC-5)</span>
        </div>

        <div className="syntax-scroll-row">
          <span className="syntax-scroll-text">Scroll</span>
        </div>
      </header>

      <section className="syntax-hero">
        <div className="syntax-hero-inner">
          <div className="syntax-main-intro">
            <div className="syntax-meta-stack">
              <p className="syntax-timeline syntax-alive" data-alive aria-label="2020 to 2026">
                <AliveGlyphs text="2020->2026" />
              </p>
              <p className="syntax-years syntax-alive" data-alive aria-label="5 plus years experience">
                <AliveGlyphs text="5+ yrs exp." />
              </p>
            </div>

            <h1 className="syntax-name" aria-label="Showri Konda">
              <span className="syntax-alive syntax-alive-line" data-alive aria-label="Showri">
                <AliveGlyphs text="Showri" />
              </span>
              <br />
              <span className="syntax-alive syntax-alive-line" data-alive aria-label="Konda">
                <AliveGlyphs text="Konda" />
              </span>
            </h1>

            <p
              className="syntax-role syntax-alive"
              data-alive
              aria-label="Full stack developer, based in Pennsylvania"
            >
              <AliveGlyphs text="FULLSTACK DEVELOPER, BASED IN PENNSYLVANIA" />
            </p>
          </div>

          <blockquote className="syntax-quote syntax-alive" data-alive>
            <AliveGlyphs
              text={"\"I build reliable backend systems and real-time products with a focus on clarity, scalability, and long-term impact.\""}
              mode="word"
            />
          </blockquote>
        </div>
      </section>

      <div className="syntax-content" id="content">
        <ResumeSection id="about" label="01. about">
          <p className="syntax-copy">
            Full Stack Developer with 5+ years of combined academic and professional experience building
            scalable backend systems, real-time streaming applications, and cloud-integrated solutions.
            Strong hands-on expertise in Rust, React, Node.js, Python, secure API architecture, proxy
            design, and production-grade distributed workflows.
          </p>
        </ResumeSection>

        <ResumeSection id="experience" label="02. experience">
          <div className="syntax-stack">
            {experiences.map((entry) => (
              <article key={`${entry.company}-${entry.period}`} className="syntax-item">
                <p className="syntax-item-meta">
                  {entry.company} - {entry.location} - {entry.period}
                </p>
                <h3 className="syntax-item-title syntax-alive" data-alive aria-label={entry.role}>
                  <AliveGlyphs text={entry.role} />
                </h3>
                <ul className="syntax-bullets">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection id="skills" label="03. skills">
          <div className="syntax-skills-grid">
            {skills.map((skill) => (
              <p key={skill} className="syntax-skill syntax-alive" data-alive aria-label={skill}>
                {skill}
              </p>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection id="education" label="04. education">
          <div className="syntax-stack">
            {education.map((entry) => (
              <article key={`${entry.institution}-${entry.period}`} className="syntax-item">
                <p className="syntax-item-meta">
                  {entry.institution} - {entry.period}
                </p>
                <h3 className="syntax-item-title syntax-alive" data-alive aria-label={entry.title}>
                  <AliveGlyphs text={entry.title} />
                </h3>
                <p className="syntax-copy">{entry.description}</p>
              </article>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection id="languages" label="05. languages">
          <div className="syntax-stack syntax-stack-tight">
            {languages.map((entry) => (
              <article key={entry.title} className="syntax-item">
                <h3 className="syntax-item-title syntax-alive" data-alive aria-label={entry.title}>
                  <AliveGlyphs text={entry.title} />
                </h3>
                <p className="syntax-item-meta">{entry.subtitle}</p>
                <p className="syntax-copy">{entry.description}</p>
              </article>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection id="contact" label="06. contact">
          <div className="syntax-contact-grid">
            <article className="syntax-contact-item">
              <p className="syntax-item-meta">Phone</p>
              <a
                href="tel:+14846450952"
                className="syntax-contact-value syntax-alive"
                data-alive
                aria-label="+1 484 645 0952"
              >
                +1 484 645 0952
              </a>
            </article>

            <article className="syntax-contact-item">
              <p className="syntax-item-meta">Email</p>
              <a
                href="mailto:kondavenkatasaishowri1@gmail.com"
                className="syntax-contact-value syntax-alive"
                data-alive
                aria-label="kondavenkatasaishowri1@gmail.com"
              >
                kondavenkatasaishowri1@gmail.com
              </a>
            </article>

            <article className="syntax-contact-item">
              <p className="syntax-item-meta">Location</p>
              <p
                className="syntax-contact-value syntax-alive"
                data-alive
                aria-label="Honey Brook, Pennsylvania"
              >
                Honey Brook, Pennsylvania
              </p>
            </article>
          </div>
        </ResumeSection>

        <section className="syntax-thanks-wrap">
          <div className="syntax-thanks-content">
            <h2 className="syntax-thanks-title" aria-label="Thanks for being here">
              <span className="syntax-alive syntax-alive-line" data-alive aria-label="Thanks">
                <AliveGlyphs text="Thanks" mode="word" />
              </span>
              <br />
              <span className="syntax-alive syntax-alive-line" data-alive aria-label="for being">
                <AliveGlyphs text="for being" mode="word" />
              </span>
              <br />
              <span className="syntax-alive syntax-alive-line" data-alive aria-label="here">
                <AliveGlyphs text="here" mode="word" />
              </span>
            </h2>

            <p className="syntax-thanks-note">
              Built with a minimalist resume system inspired by the SyntaxCV visual style.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
