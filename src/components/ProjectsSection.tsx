import React, { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  category: string;
}

interface ProjectsSectionProps {
  projects?: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects = defaultProjects,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((project) => project.category))),
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of my recent work showcasing my skills and passion for
            building innovative solutions.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                activeFilter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// Default projects data
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Red Path – Life-as-Game System",
    description:
      "Personal productivity OS that gamifies tasks and reflections with a Solo Leveling x RuneScape vibe.",
    technologies: ["React", "Supabase", "iOS Shortcuts"],
    image:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80",
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    category: "Productivity",
  },
  {
    id: "2",
    title: "Locomotive Management Suite",
    description:
      "Comprehensive logistics dashboard for tracking and managing fleet operations with real-time updates.",
    technologies: ["FastAPI", "PostgreSQL", "Docker"],
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    githubUrl: "https://github.com",
    category: "Enterprise",
  },
  {
    id: "3",
    title: "YouTubeTranscripts.io Poster Generator",
    description:
      "Transcript scraper with AI-powered summary generation for creating shareable content from videos.",
    technologies: ["Python", "Hugging Face", "Flask"],
    image:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    category: "AI Tools",
  },
  {
    id: "4",
    title: "Expense Tracker Automations",
    description:
      "Seamless integration between iOS Shortcuts and Obsidian vault for personal finance management.",
    technologies: ["iOS Shortcuts", "Obsidian", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    demoUrl: "https://demo.com",
    category: "Productivity",
  },
  {
    id: "5",
    title: "Portfolio Website",
    description:
      "Modern, responsive portfolio showcasing projects and skills with a clean, minimalist design.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80",
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    category: "Web Development",
  },
  {
    id: "6",
    title: "Smart Home Dashboard",
    description:
      "Centralized control system for IoT devices with customizable widgets and automation rules.",
    technologies: ["React", "Node.js", "MQTT"],
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
    githubUrl: "https://github.com",
    category: "IoT",
  },
];

export default ProjectsSection;
