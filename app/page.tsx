"use client"

import { useState, useEffect, useRef } from "react"
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Code2,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  MessageSquare,
  Award,
} from "lucide-react"
import Image from "next/image"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const isScrollingRef = useRef(false)

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Trigger when section is 20% from top
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Only update if user is not manually scrolling
      if (isScrollingRef.current) return

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  const handleNavClick = (id: string) => {
    isScrollingRef.current = true
    setActiveSection(id)
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth", block: "start" })

    // Reset flag after scroll animation completes
    setTimeout(() => {
      isScrollingRef.current = false
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-lg">
                PJ
              </div>
              <span className="font-bold text-lg tracking-tight">Purva Jagtap</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {[
                { id: "about", icon: Code2, label: "About" },
                { id: "experience", icon: Briefcase, label: "Experience" },
                { id: "education", icon: GraduationCap, label: "Education" },
                { id: "projects", icon: FolderGit2, label: "Projects" },
                { id: "skills", icon: Wrench, label: "Skills" },
                { id: "contact", icon: MessageSquare, label: "Contact" },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      activeSection === item.id
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center pt-24 pb-20 px-6 relative overflow-hidden">
        {/* Curved gradient background element */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[400px] bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-4xl mx-auto w-full relative z-10">
          <div className="text-center space-y-8">
            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative">
                  <Image
                    src="/prof.png"
                    alt="Purva Jagtap"
                    width={160}
                    height={160}
                    className="rounded-full border-2 border-white/10"
                  />
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Available for opportunities
              </div>
            </div>

            {/* Main Heading with elegant typography */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight">
                Transforming challenges into {" "}
                <span className="italic bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  intelligent solutions
                </span>
              </h1>
              <div className="flex items-center justify-center gap-3 text-lg text-gray-400">
                <span>Hello, I'm</span>
                <span className="font-semibold text-white">Purva Jagtap</span>
                <span>•</span>
                <span>Full Stack Developer</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              I build scalable back-end systems, cloud infrastructure, and data engineering solutions for enterprise
              applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <a
                href="mailto:pjagtap1@uncc.edu"
                className="group relative inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium transition-all hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Mail size={18} />
                  Let's Connect
                </span>
              </a>
              <a
                href="https://github.com/purvajagtap"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 px-6 py-3 rounded-full font-medium transition-all hover:scale-105"
              >
                <Github size={18} />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/purva-jagtap"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 px-6 py-3 rounded-full font-medium transition-all hover:scale-105"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Decorative curved line */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z" fill="url(#gradient)" opacity="0.1" />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Code2 size={18} />
            </div>
            <h2 className="text-3xl font-bold">About Me</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Background Card */}
            <div className="lg:col-span-2 group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:to-cyan-500/5 transition-all"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Background
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  I'm a passionate Software Developer with 2.5+ years of experience specializing in back-end systems
                  (Java/Spring, Python), cloud infrastructure (AWS EC2/S3/Lambda), and data engineering (Apache Spark,
                  SQL ETL) for Fortune 50 clients.
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                  Location
                </h3>
                <p className="text-gray-400 mb-2">Charlotte, NC</p>
                <p className="text-sm text-gray-500">United States</p>
              </div>
            </div>

            {/* Current Focus Card */}
            <div className="lg:col-span-2 group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-pink-500/50 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/5 group-hover:to-purple-500/5 transition-all"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Current Focus
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Currently pursuing my Master's in Computer Science at UNC Charlotte with a focus on Artificial
                  Intelligence, Robotics, and Gaming. Working as a Graduate Assistant, helping students master software
                  engineering principles.
                </p>
              </div>
            </div>

            {/* Tech Stack Preview Card */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-pink-500/0 group-hover:from-cyan-500/5 group-hover:to-pink-500/5 transition-all"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Python", "Java", "React", "AWS", "Azure"].map((tech) => (
                    <span
                      key={tech}
                      className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Expertise Card - Full Width */}
            <div className="lg:col-span-3 group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-cyan-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:via-cyan-500/5 group-hover:to-pink-500/5 transition-all"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Expertise
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  At Amdocs Ltd, I architected enterprise-grade solutions including a GenAI Deployment Tracker serving
                  5000+ global users, led Azure cloud migration of 4 enterprise applications, and built workflow
                  management suites that reduced deployment cycle time from 10 hours to 6 hours. My expertise lies in
                  building robust distributed systems, optimizing performance at scale, and solving complex engineering
                  challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
              <Briefcase size={18} />
            </div>
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                period: "AUG 2025 — PRESENT",
                title: "Graduate Assistant",
                company: "University of North Carolina, Charlotte",
                description:
                  "Assisting in the Software Engineering course, guiding students and grading assignments. Built automation tools using Canvas API and Python to streamline peer review management and grading workflows.",
                skills: ["Python", "Canvas API", "Automation", "Teaching"],
                gradient: "from-purple-500 to-pink-500",
              },
              {
                period: "JUL 2024 — DEC 2024",
                title: "Software Developer",
                company: "Amdocs Ltd",
                description:
                  "Architected GenAI Deployment Tracker with Python, MS Teams webhooks, and Azure services for 5000+ global users. Led Azure cloud migration of 4 enterprise applications. Built enterprise workflow management suite reducing deployment cycle time from 10 hours to 6 hours.",
                skills: ["Java", "Spring Boot", "Python", "Azure", "Microservices", "Oracle"],
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                period: "JUL 2022 — JUN 2024",
                title: "Associate Software Engineer",
                company: "Amdocs Ltd",
                description:
                  "Resolved 400+ security vulnerabilities using Veracode SCA/SAST analysis, improving security posture by 90%. Developed JPython automation scripts reducing manual CSM operations from 8 hours to 3 hours daily. Built enterprise subscriber analytics engine with PostgreSQL-Couchbase hybrid architecture for 1M+ users.",
                skills: ["Java", "JPython", "PostgreSQL", "Couchbase", "Veracode"],
                gradient: "from-pink-500 to-purple-500",
              },
              {
                period: "MAY 2021 — JUL 2021",
                title: "Developer Intern",
                company: "3Cans",
                description:
                  "Automated resume processing for 500+ candidates using BeautifulSoup/PDFMiner and NLP. Architected web scraping infrastructure with Scrapy, Redis, and Celery, achieving 10x performance improvement and processing 500k data points daily.",
                skills: ["Python", "Scrapy", "Redis", "Celery", "NLP"],
                gradient: "from-cyan-500 to-purple-500",
              },
            ].map((job, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all overflow-hidden"
              >
                {/* Gradient border effect on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${job.gradient} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`}
                ></div>
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${job.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity`}
                ></div>

                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                      <p className="text-gray-400 font-medium">{job.company}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-gray-300 whitespace-nowrap">
                      {job.period}
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-sm font-medium"
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

      <section id="education" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <GraduationCap size={18} />
            </div>
            <h2 className="text-3xl font-bold">Education</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all"></div>
              <div className="relative z-10">
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-gray-300 inline-block mb-4">
                  JAN 2025 — DEC 2026
                </div>
                <h3 className="text-xl font-bold mb-2">Master of Science in Computer Science</h3>
                <p className="text-cyan-400 font-medium mb-4">University of North Carolina, Charlotte</p>
                <p className="text-gray-400 mb-2">CGPA: 3.66/4.00</p>
                <p className="text-gray-400 mb-2">Concentration: Artificial Intelligence, Robotics, and Gaming Core</p>
                <p className="text-gray-400 text-sm">
                  Coursework: Software System Design & Architecture, Machine Learning, Cloud Computing for Data Analysis
                </p>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all"></div>
              <div className="relative z-10">
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-gray-300 inline-block mb-4">
                  JUN 2018 — APR 2022
                </div>
                <h3 className="text-xl font-bold mb-2">B.E. (Hons.) in Computer Engineering</h3>
                <p className="text-purple-400 font-medium mb-4">Savitribai Phule Pune University</p>
                <p className="text-gray-400 mb-2">CGPA: 8.74/10.00</p>
                <p className="text-gray-400 text-sm">Specialization: Data Science</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
              <FolderGit2 size={18} />
            </div>
            <h2 className="text-3xl font-bold">
              Featured{" "}
              <span className="italic bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                title: "ECG Classification using ML",
                description:
                  "Implemented ML models (KNN, CNN, CNN+LSTM) in Python for ECG time-series classification with 90%+ accuracy. CNN+LSTM outperformed traditional methods by 15-20% on complex temporal patterns.",
                tech: ["Python", "KNN", "CNN", "LSTM", "PyTorch"],
                gradient: "from-purple-500 to-pink-500",
              },
              {
                title: "Smart Attendance Monitoring System",
                description:
                  "Engineered AI-based attendance system using Python, OpenCV, and HOG algorithms for real-time/bulk face detection with 90% accuracy. Automated attendance processes across 10+ institutes serving 100+ professors.",
                tech: ["OpenCV", "Python", "ML", "MySQL", "HOG"],
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                title: "GenAI Deployment Tracker",
                description:
                  "Architected enterprise deployment monitoring system through seamless integration of Python, MS Teams webhooks, and Azure services with automated scheduling for real-time deployment monitoring across 5000+ global users.",
                tech: ["Python", "Azure", "MS Teams API", "Automation"],
                gradient: "from-pink-500 to-purple-500",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all overflow-hidden"
              >
                {/* Gradient border effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}
                ></div>
                <div
                  className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-sm`}
                ></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    <ExternalLink size={18} className="text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
                      >
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

      <section id="skills" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Wrench size={18} />
            </div>
            <h2 className="text-3xl font-bold">Skills & Technologies</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                category: "Programming Languages",
                skills: ["Python", "Java", "C", "C++", "PHP", "JavaScript", "TypeScript", "HTML5", "CSS", "Bash"],
                gradient: "from-purple-500 to-pink-500",
              },
              {
                category: "Frameworks & Libraries",
                skills: ["Django", "Spring Boot", "Spring MVC", "React.js", "Next.js", "Express.js", "Flask"],
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                category: "Databases",
                skills: ["SQL", "MySQL", "PostgreSQL", "NoSQL", "MongoDB", "Couchbase", "Hadoop"],
                gradient: "from-pink-500 to-purple-500",
              },
              {
                category: "Cloud & DevOps",
                skills: ["Git", "Docker", "AWS", "Azure", "JIRA", "Tableau", "Splunk", "Postman", "Linux"],
                gradient: "from-cyan-500 to-purple-500",
              },
              {
                category: "ML & AI Technologies",
                skills: [
                  "Transformers",
                  "Neural Networks",
                  "Regression & Classification",
                  "Langchain",
                  "RAG",
                  "LLMs",
                  "PyTorch",
                ],
                gradient: "from-purple-500 to-cyan-500",
              },
              {
                category: "Methodologies",
                skills: [
                  "Agile",
                  "Project Management",
                  "Distributed Storage",
                  "Data Analytics",
                  "SDLC",
                  "Containerization",
                ],
                gradient: "from-pink-500 to-cyan-500",
              },
            ].map((category, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                ></div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-4">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-default"
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

      <section id="contact" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
              <MessageSquare size={18} />
            </div>
            <h2 className="text-3xl font-bold">Get In Touch</h2>
          </div>
          <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-12 border border-white/10 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-pink-500/5"></div>
            <div className="relative z-10">
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                I'm currently looking for new opportunities and my inbox is always open. Whether you have a question or
                just want to say hi, I'll try my best to get back to you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <a
                  href="mailto:pjagtap1@uncc.edu"
                  className="group relative inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 overflow-hidden"
                >
                  <Mail size={20} />
                  pjagtap1@uncc.edu
                </a>
                <a
                  href="tel:+17042481900"
                  className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
                >
                  +1 (704) 248-1900
                </a>
              </div>
              <div className="flex gap-4 justify-center">
                <a
                  href="https://github.com/purvajagtap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/purva-jagtap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Award size={18} />
            </div>
            <h2 className="text-3xl font-bold">Achievements & Awards</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 text-2xl">
                  🏆
                </div>
                <h3 className="text-lg font-bold mb-2">SmartOps AT&T Radiant Recognition</h3>
                <p className="text-cyan-400 font-medium mb-2 text-sm">Cross Initiatives Category</p>
                <p className="text-gray-400 text-sm">
                  Recognized for building GenAI-based Deployment Tracker to streamline project monitoring across
                  engineering teams.
                </p>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 text-2xl">
                  🥇
                </div>
                <h3 className="text-lg font-bold mb-2">First Prize – National Level Project Competition</h3>
                <p className="text-purple-400 font-medium mb-2 text-sm">TECHCULT 2022, Pune, India</p>
                <p className="text-gray-400 text-sm">
                  Won for developing Face Recognition-based Attendance Monitoring System using OpenCV and Machine
                  Learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">© 2025 Purva Jagtap. Built with Next.js & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}
