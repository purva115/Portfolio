"use client"

import { useState, useEffect } from "react"
import { Mail, Github, Linkedin, ExternalLink, Code2, Award, ArrowRight } from "lucide-react"

// Portfolio - Modern Developer Portfolio with Animations

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      const sections = ["about", "experience", "projects", "skills"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-mono text-cyan-400 font-semibold">{"<dev />"}</div>
            <div className="hidden md:flex items-center gap-8">
              {["about", "experience", "projects", "skills"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-mono transition-colors hover:text-cyan-400 ${
                    activeSection === section ? "text-cyan-400" : "text-slate-400"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div
          className={`max-w-4xl w-full transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="space-y-6">
            <p className="text-cyan-400 font-mono text-sm animate-fade-in">Hi, my name is</p>
            <h1
              className="text-5xl md:text-7xl font-bold text-slate-100 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              Your Name
            </h1>
            <h2
              className="text-3xl md:text-5xl font-bold text-slate-400 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              I build exceptional digital experiences.
            </h2>
            <p
              className="text-lg text-slate-400 max-w-2xl leading-relaxed animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              I'm a full-stack developer specializing in building accessible, pixel-perfect user interfaces that blend
              thoughtful design with robust engineering. Currently focused on creating innovative web applications that
              make a difference.
            </p>
            <div className="flex gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-lg font-mono hover:bg-cyan-400/10 transition-all duration-300"
              >
                View My Work
              </button>
              <a
                href="mailto:your.email@example.com"
                className="px-8 py-3 bg-cyan-400 text-slate-900 rounded-lg font-mono hover:bg-cyan-300 transition-all duration-300 flex items-center gap-2"
              >
                <Mail size={18} />
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-100 font-mono">
              <span className="text-cyan-400">01.</span> About Me
            </h2>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I'm a passionate developer who loves crafting accessible, pixel-perfect user interfaces that blend
                thoughtful design with robust engineering. My favorite work lies at the intersection of design and
                development, creating experiences that not only look great but are meticulously built for performance
                and usability.
              </p>
              <p>
                Currently, I'm a Senior Full-Stack Engineer specializing in accessibility. I contribute to the creation
                and maintenance of UI components that power modern web applications, ensuring our platform meets web
                accessibility standards and best practices to deliver an inclusive user experience.
              </p>
              <p>
                In the past, I've had the opportunity to develop software across a variety of settings — from
                advertising agencies and large corporations to start-ups and small digital product studios.
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-cyan-400/20 rounded-lg blur-lg group-hover:bg-cyan-400/30 transition-all duration-300"></div>
                <div className="relative bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Code2 className="text-cyan-400" size={24} />
                    <h3 className="text-xl font-semibold text-slate-100">Technical Focus</h3>
                  </div>
                  <p className="text-sm text-slate-400">
                    Specializing in React, Next.js, TypeScript, and modern web technologies to build scalable
                    applications.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-cyan-400/20 rounded-lg blur-lg group-hover:bg-cyan-400/30 transition-all duration-300"></div>
                <div className="relative bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Award className="text-cyan-400" size={24} />
                    <h3 className="text-xl font-semibold text-slate-100">Achievements</h3>
                  </div>
                  <p className="text-sm text-slate-400">
                    AWS Certified Solutions Architect, Hackathon Winner, and recognized for innovative solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-100 font-mono">
              <span className="text-cyan-400">02.</span> Experience
            </h2>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          <div className="space-y-12">
            {[
              {
                title: "Senior Full Stack Developer",
                company: "Tech Company",
                period: "2022 — Present",
                description:
                  "Build and maintain critical components used to construct Klaviyo's frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
                skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js"],
              },
              {
                title: "Frontend Developer",
                company: "Startup Inc",
                period: "2020 — 2022",
                description:
                  "Built responsive React applications with modern UI/UX. Collaborated with design team to implement pixel-perfect interfaces. Optimized application performance and accessibility.",
                skills: ["React", "TypeScript", "Tailwind CSS", "Figma"],
              },
              {
                title: "Junior Developer",
                company: "Digital Agency",
                period: "2018 — 2020",
                description:
                  "Developed and maintained client websites using modern web technologies. Worked on various projects from e-commerce platforms to corporate websites.",
                skills: ["HTML", "CSS", "JavaScript", "WordPress"],
              },
            ].map((job, index) => (
              <div
                key={index}
                className="group relative border-l-2 border-slate-700 hover:border-cyan-400 pl-8 transition-all duration-300"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-cyan-400 border-4 border-slate-900"></div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-slate-400 font-mono text-sm">
                      {job.company} • {job.period}
                    </p>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-xs font-mono rounded-full border border-cyan-400/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-100 font-mono">
              <span className="text-cyan-400">03.</span> Featured Projects
            </h2>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "E-Commerce Platform",
                description:
                  "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
                tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
                link: "#",
              },
              {
                title: "Task Management App",
                description:
                  "Collaborative project management tool with real-time updates and team collaboration features.",
                tech: ["React", "Node.js", "MongoDB", "Socket.io"],
                link: "#",
              },
              {
                title: "Data Visualization Dashboard",
                description:
                  "Interactive dashboard for business analytics with custom charts and real-time data processing.",
                tech: ["Python", "D3.js", "PostgreSQL", "FastAPI"],
                link: "#",
              },
              {
                title: "AI Content Generator",
                description:
                  "AI-powered content generation tool using modern language models for creative writing assistance.",
                tech: ["Next.js", "OpenAI", "Tailwind", "Vercel"],
                link: "#",
              },
              {
                title: "Social Media Analytics",
                description:
                  "Comprehensive analytics platform for tracking social media performance across multiple channels.",
                tech: ["React", "Node.js", "Redis", "Chart.js"],
                link: "#",
              },
              {
                title: "Portfolio Builder",
                description: "No-code portfolio builder with drag-and-drop interface and customizable templates.",
                tech: ["Next.js", "TypeScript", "Supabase", "Framer"],
                link: "#",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="group relative bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-cyan-400/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative space-y-4">
                  <div className="flex items-start justify-between">
                    <Code2 className="text-cyan-400" size={32} />
                    <a href={project.link} className="text-slate-400 hover:text-cyan-400 transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs font-mono text-slate-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-100 font-mono">
              <span className="text-cyan-400">04.</span> Skills & Technologies
            </h2>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                category: "Frontend",
                skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"],
              },
              {
                category: "Backend",
                skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
              },
              {
                category: "Tools & Platforms",
                skills: ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code"],
              },
              {
                category: "Practices",
                skills: ["Accessibility", "Performance", "Testing", "CI/CD", "Agile", "Code Review"],
              },
            ].map((group, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-semibold text-cyan-400 font-mono">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm hover:border-cyan-400 hover:bg-cyan-400/5 transition-all duration-300 cursor-default text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full text-center space-y-8">
          <p className="text-cyan-400 font-mono text-sm">05. What's Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100">Get In Touch</h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            I'm currently looking for new opportunities and my inbox is always open. Whether you have a question or just
            want to say hi, I'll try my best to get back to you!
          </p>
          <a
            href="mailto:your.email@example.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-lg font-mono hover:bg-cyan-400/10 transition-all duration-300"
          >
            Say Hello
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400 font-mono">Built with Next.js & Tailwind CSS</p>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a href="mailto:your.email@example.com" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
