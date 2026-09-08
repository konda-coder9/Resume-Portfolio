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

const experiences: ExperienceEntry[] = [
  {
    role: "Full Stack Developer",
    company: "Haverford Systems Inc.",
    location: "Downingtown, PA",
    period: "Feb 2025 - Present",
    bullets: [
      "Design and deliver PTZ camera applications with Python, FastAPI, React, Node.js, REST APIs, WebSockets, and AWS.",
      "Developed a RAG chatbot with LangChain, OpenAI embeddings, Amazon OpenSearch Serverless, and AWS Bedrock for grounded answers from enterprise documents.",
      "Re-architected a legacy browser integration into Python and Node.js services, improving reliability by 35% and simplifying maintenance and testing.",
      "Built secure FastAPI services with JWT/Bearer authentication and proxy routing, reducing client-side complexity by 40%.",
      "Engineered real-time TCP, UDP, and multicast workflows for automated camera tracking, device control, and UI actions.",
      "Implemented GitHub Actions pipelines that build, test, package, and deploy multi-platform releases to Amazon S3, reducing manual release effort by 60%.",
      "Deployed and monitored services with EC2, Lambda, API Gateway, S3, CloudWatch, and IAM.",
    ],
  },
  {
    role: "Software Developer",
    company: "West Chester University of Pennsylvania",
    location: "West Chester, PA",
    period: "Mar 2023 - Dec 2024",
    bullets: [
      "Implemented Spring-based REST APIs and validated request handling, security controls, and JSON responses with Postman.",
      "Built Angular and AngularJS interfaces that consumed reusable Node.js and Express.js services.",
      "Integrated third-party REST services with OAuth, HTTPS, and single sign-on requirements.",
      "Supported the Siebel-to-Microsoft Dynamics CRM migration with data-driven views and interface components.",
      "Designed SSIS and Dell Boomi processes to migrate and synchronize DB2 data with cloud CRM systems.",
      "Improved support with Splunk dashboards and alerts while using Maven, Jenkins, Bamboo, Jira, and Confluence.",
    ],
  },
  {
    role: "Java Developer",
    company: "Tata Consultancy Services",
    location: "Remote",
    period: "Jun 2020 - Dec 2022",
    bullets: [
      "Developed contract-management, usage-tracking, billing, and reporting applications with Java, Spring Boot, Angular, TypeScript, and microservices.",
      "Built reusable Angular components and managed asynchronous workflows with RxJS and centralized state with NgRx.",
      "Developed Spring Boot, Spring MVC, Spring Data JPA, and Hibernate microservices.",
      "Designed bulk REST APIs that reduced turnaround time for high-volume updates by approximately 34%.",
      "Optimized Hibernate queries and SQL integrations, improving large-volume data retrieval by approximately 29%.",
      "Implemented Kafka event processing, JWT security, automated tests, Docker packaging, and CI/CD on AWS.",
    ],
  },
  {
    role: "Web Developer",
    company: "Sravani Rao Label",
    location: "Remote",
    period: "May 2019 - May 2020",
    bullets: [
      "Translated business requirements and content priorities into functional website enhancements.",
      "Developed responsive pages with HTML5, CSS3, JavaScript, AJAX, jQuery, and JSP, including multimedia integration.",
      "Managed content updates, monitored traffic and availability, and maintained technical documentation.",
      "Built Power BI dashboards with Power Query, DAX, KPI cards, charts, filters, and slicers.",
    ],
  },
];

const skills = [
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "SQL / PL/SQL",
  "Rust / C++",
  "FastAPI",
  "Spring Boot / MVC / Security",
  "Hibernate / Spring Data JPA",
  "Angular / AngularJS",
  "React",
  "Node.js",
  "Express.js",
  "Axum",
  "REST / SOAP / OpenAPI",
  "OAuth 2.0 / JWT",
  "WebSockets / TCP / UDP",
  "Kafka / JMS",
  "AWS / Docker / Terraform",
  "Jenkins / GitHub Actions",
  "PostgreSQL / MySQL / SQL Server",
  "Oracle / DB2 / MongoDB",
  "DynamoDB / Redis",
  "PyTest / JUnit / Mockito",
  "RAG / LangChain",
  "AWS Bedrock / OpenAI API",
  "OpenSearch / Vector Search",
];

const education: EducationEntry[] = [
  {
    institution: "West Chester University of Pennsylvania",
    period: "",
    title: "Master of Science in Computer Science",
    description: "Master of Science, Computer Science",
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
            <span className="syntax-utc">(UTC-4)</span>
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
          <span className="syntax-mobile-menu-utc">(UTC-4)</span>
        </div>

        <div className="syntax-scroll-row">
          <span className="syntax-scroll-text">Scroll</span>
        </div>
      </header>

      <section className="syntax-hero">
        <div className="syntax-hero-inner">
          <div className="syntax-main-intro">
            <div className="syntax-meta-stack">
              <p className="syntax-timeline syntax-alive" data-alive aria-label="2019 to present">
                <AliveGlyphs text="2019->NOW" />
              </p>
              <p className="syntax-years syntax-alive" data-alive aria-label="7 plus years experience">
                <AliveGlyphs text="7+ yrs exp." />
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
              text={"\"I build scalable enterprise applications, intelligent AI solutions, and cloud-native systems using Java, Python, and modern web technologies.\""}
              mode="word"
            />
          </blockquote>
        </div>
      </section>

      <div className="syntax-content" id="content">
        <ResumeSection id="about" label="01. about">
          <p className="syntax-copy">
            Full Stack Developer with 7+ years of experience designing, developing, testing, deploying,
            and supporting scalable enterprise applications with Python, Java, JavaScript, and cloud
            technologies. Experienced in FastAPI, Spring Boot, Angular, React, REST and SOAP services,
            microservices, PTZ camera platforms, generative AI, secure integrations, and automated AWS
            deployment pipelines.
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
                  {entry.institution}{entry.period ? ` - ${entry.period}` : ""}
                </p>
                <h3 className="syntax-item-title syntax-alive" data-alive aria-label={entry.title}>
                  <AliveGlyphs text={entry.title} />
                </h3>
                <p className="syntax-copy">{entry.description}</p>
              </article>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection id="contact" label="05. contact">
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
                href="mailto:kondas0728@gmail.com"
                className="syntax-contact-value syntax-alive"
                data-alive
                aria-label="kondas0728@gmail.com"
              >
                kondas0728@gmail.com
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

          </div>
        </section>
      </div>
    </main>
  );
}
