import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import ContactForm from "./ContactForm";
import GitHubContributions from "./GitHubContributions";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import ServicesSection from "./ServicesSection";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Home = () => {

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-10 w-full backdrop-blur-md bg-background/90 border-b border-border px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-bold text-xl">Saeed</div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">
                About
              </a>
              <a
                href="#services"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Services
              </a>
              <a
                href="#projects"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Skills
              </a>
              <a
                href="https://github.com/sdnssr1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="#contact"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>

            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        {/* Hero Section */}
        <section id="about" className="py-6">
          <HeroSection />
        </section>

        <Separator className="my-4" />

        {/* Services Section */}
        <motion.section
          id="services"
          className="py-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <ServicesSection />
        </motion.section>

        <Separator className="my-4" />

        {/* Projects Section */}
        <motion.section
          id="projects"
          className="py-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-bold mb-3">Projects</h2>
          <ProjectsSection 
            projects={[
              {
                id: "manual-hannahloaa",
                title: "Hannah Loaa",
                description: "Modern website for hannahloaa.com with sleek design and responsive interface.",
                technologies: ["React", "TypeScript", "Tailwind CSS"],
                image: "/hannahloaa-preview.jpg", 
                demoUrl: "https://hannahloaa.com",
                category: "Web Development",
                source: "manual"
              }
            ]}
          />
        </motion.section>

        <Separator className="my-4" />
        
        {/* GitHub Contributions Section */}
        <motion.section
          id="github-activity"
          className="py-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-bold mb-3">GitHub Activity</h2>
          <GitHubContributions username="sdnssr1" />
        </motion.section>

        <Separator className="my-4" />

        {/* Skills Section */}
        <motion.section
          id="skills"
          className="py-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-bold mb-8">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-4">Frontend</h3>
              <ul className="space-y-2">
                <li>React, Vite, TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Responsive UI Design</li>
                <li>State Management</li>
                <li>Component Architecture</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-4">Backend</h3>
              <ul className="space-y-2">
                <li>Python, FastAPI</li>
                <li>SQL (PostgreSQL / Supabase)</li>
                <li>REST API Design</li>
                <li>Authentication & Authorization</li>
                <li>Database Optimization</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-4">DevOps & Tooling</h3>
              <ul className="space-y-2">
                <li>Docker, Containerization</li>
                <li>GitHub Actions, CI/CD</li>
                <li>Deployment (Hostinger/Vercel)</li>
                <li>Bash Scripting</li>
                <li>Version Control</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-4">
                Automation / Scripting
              </h3>
              <ul className="space-y-2">
                <li>iOS Shortcuts</li>
                <li>Python Automation</li>
                <li>AppleScript</li>
                <li>Workflow Optimization</li>
                <li>Task Scheduling</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-4">Design & UX</h3>
              <ul className="space-y-2">
                <li>Figma Prototyping</li>
                <li>Minimal UI Systems</li>
                <li>Accessibility (a11y)</li>
                <li>User Experience Design</li>
                <li>Visual Hierarchy</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
              <ul className="space-y-2">
                <li>Mentoring & Teaching</li>
                <li>Cross-functional Collaboration</li>
                <li>Technical Documentation</li>
                <li>Problem-solving</li>
                <li>Continuous Learning</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <Separator className="my-12" />

        {/* Education Section */}
        <motion.section
          id="education"
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <h3 className="text-xl font-semibold">
                B.S. Software Development
              </h3>
              <p className="text-muted-foreground">Expected Aug 2025</p>
            </div>
            <p className="mb-4">University of Washington</p>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Relevant Coursework:</h4>
              <p>
                Algorithms, Database Systems, Cloud Computing, Human–Computer
                Interaction
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Honors:</h4>
              <ul className="list-disc list-inside">
                <li>Dean's List</li>
                <li>Hackathon finalist (UW Hack Day 2024)</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <Separator className="my-12" />

        {/* Resume Section */}
        <motion.section
          id="resume"
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Resume</h2>
            <Button variant="outline">
              <a href="#" download className="flex items-center">
                Download PDF
              </a>
            </Button>
          </div>

          <div className="space-y-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h3 className="text-xl font-semibold">Full-Stack Intern</h3>
                <p className="text-muted-foreground">2024</p>
              </div>
              <p className="text-primary mb-4">CargoNet</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Built authentication and admin dashboard interfaces</li>
                <li>Implemented RESTful APIs using FastAPI</li>
                <li>Collaborated with design team to improve UX</li>
                <li>
                  Participated in code reviews and agile development processes
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h3 className="text-xl font-semibold">Freelance Developer</h3>
                <p className="text-muted-foreground">2023–Present</p>
              </div>
              <p className="text-primary mb-4">Self-employed</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Delivered automation tools for small businesses</li>
                <li>Created custom web applications for clients</li>
                <li>Managed project timelines and client expectations</li>
                <li>Implemented solutions across various technology stacks</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h3 className="text-xl font-semibold">
                  Teaching Assistant, Intro to Web Dev
                </h3>
                <p className="text-muted-foreground">2023–2024</p>
              </div>
              <p className="text-primary mb-4">University of Washington</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Mentored 50+ students in web development fundamentals</li>
                <li>Led lab sessions and provided code reviews</li>
                <li>Created supplementary learning materials</li>
                <li>Assisted professor with course curriculum development</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <Separator className="my-12" />

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-bold mb-8">Contact</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-lg mb-6">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>

              <div className="flex space-x-4 mb-6">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a
                  href="https://bsky.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </a>
              </div>

              <p className="text-muted-foreground">Email: sdnssr001@gmail.com</p>
            </div>

            <ContactForm />
          </div>
        </motion.section>
      </main>

      <footer className="bg-muted py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-x8 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Saeed. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Built with React, TypeScript, and Tailwind CSS. Self-hosted fonts
            and no third-party analytics.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
