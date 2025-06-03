import { fetchGitHubRepos } from "@/utils/github";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
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
  stars?: number;
  updatedAt?: string;
}

interface ProjectsSectionProps {
  projects?: Project[];
  includeGitHub?: boolean;
  initialSearch?: string;
  onSearchChange?: (value: string) => void;
}

const GITHUB_USERNAME = "sdnssr1";

// Helper function to determine the category based on technologies and title
const determineCategory = (repo: any): string => {
  const title = (repo.name || "").toLowerCase();
  const description = (repo.description || "").toLowerCase();
  const topics = Array.isArray(repo.topics)
    ? repo.topics.map((t: string) => t.toLowerCase())
    : [];

  const language = (repo.language || "").toLowerCase(); // ← add this line!

  /* Portfolio */
  if (title.includes("portfolio") || topics.includes("portfolio"))
    return "Portfolio";

  /* AI / ML */
  if (
    topics.includes("ai") ||
    topics.includes("ml") ||
    title.includes("learning")
  )
    return "AI";

  /* Mobile / Native */
  if (
    topics.includes("mobile") ||
    topics.includes("ios") ||
    topics.includes("android") ||
    topics.includes("react-native") ||
    ["swift", "kotlin"].includes(language)
  )
    return "Mobile";

  /* Backend / API */
  if (title.includes("api") || description.includes("api"))
    return "Backend / API";

  /* Systems */
  if (
    ["c", "c++", "rust", "go"].includes(language) ||
    title.includes("systems")
  )
    return "Systems";

  /* Coursework */
  if (description.match(/assignment|course|lab|homework/i)) return "Coursework";

  /* Utilities */
  if (description.match(/cli|theme|tool/i)) return "Utilities";

  return "GitHub";
};

const mapGitHubRepoToProject = (repo: any): Project => {
  const repoName = repo.name || "";
  const ownerLogin = repo.owner?.login || GITHUB_USERNAME;

  /* 🔸 local overrides for special repos -------------------------- */
  const manualImageMap: Record<string, string> = {
    hussein_muya_portfolio: "/hussein-preview-top.jpg",
    kens_portfolio: "/ken-preview.jpg",
    portfolio: "/portfolio-preview.jpg",
  };
  const manualImage = manualImageMap[repoName.toLowerCase()];
  /* -------------------------------------------------------------- */

  return {
    id: `gh-${repo.id}-${repoName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    title: repoName
      .replace(/-/g, " ")
      .replace(/\./g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim(),
    description: repo.description || "No description provided.",
    technologies: Array.isArray(repo.topics) ? repo.topics.slice(0, 5) : [],
    image:
      manualImage ??
      `https://opengraph.githubassets.com/1/${ownerLogin}/${repoName}`,
    githubUrl:
      repo.html_url || `https://github.com/${GITHUB_USERNAME}/${repoName}`,
    demoUrl:
      repo.homepage && repo.homepage.startsWith("http")
        ? repo.homepage
        : undefined,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
    category: determineCategory(repo),
    source: "github",
  };
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects: initialProjects = [],
  includeGitHub = true,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(includeGitHub);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!includeGitHub) return;

    fetchGitHubRepos(GITHUB_USERNAME).then((repos) => {
      const mapped = repos.map(mapGitHubRepoToProject); // each with source:"github"

      setProjects((prev) => {
        // titles of all MANUAL projects currently in state
        const manualTitles = new Set(
          prev
            .filter((p) => p.source === "manual")
            .map((p) => p.title.toLowerCase())
        );

        // keep only GitHub projects we don’t already have manually
        const uniqueGitHub = mapped.filter(
          (p) => !manualTitles.has(p.title.toLowerCase())
        );

        // strip old GitHub slice, then add fresh unique list
        return [...prev.filter((p) => p.source !== "github"), ...uniqueGitHub];
      });
    });
  }, [includeGitHub]);

  {
    /* ── Search input ─────────────────────────────── */
  }
  <div className="mt-6 mb-4 flex justify-center relative">
    <input
      type="text"
      placeholder="Search projects…"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full max-w-md rounded-lg border border-border/50 bg-background/60 px-4 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-colors"
    />

    {/* clear button */}
    {searchTerm && (
      <button
        onClick={() => setSearchTerm("")}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        aria-label="Clear search"
      >
        <X className="h-4 w-4" />
      </button>
    )}
  </div>;

  // Define predefined categories
  const predefinedCategories = [
    "All",
    "Portfolio",
    "Web Development",
    "AI",
    "Mobile",
    "Backend / API",
    "Systems",
    "Utilities",
    "Coursework",
    "GitHub",
  ];

  // Get categories that actually have projects
  const availableCategories = Array.from(
    new Set(projects.map((project) => project.category))
  );

  // Use only predefined categories that have projects, always keeping "All"
  const categories = [
    "All",
    ...predefinedCategories.filter(
      (cat) => cat !== "All" && availableCategories.includes(cat)
    ),
  ];

  const filteredProjects = useMemo(() => {
    const byCategory =
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    if (!searchTerm.trim()) return byCategory;

    const term = searchTerm.trim().toLowerCase();
    return byCategory.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.technologies?.some((t) => t.toLowerCase().includes(term))
    );
  }, [projects, activeFilter, searchTerm]);

  return (
    <section id="projects" className="py-16 bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            My Projects
          </h2>

          <div className="mt-6 mb-4 flex justify-center">
            <input
              type="text"
              placeholder="Search projects…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md rounded-lg border bg-background/50 px-4 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/50 transition-colors"
            />
          </div>

          <p className="mt-4 text-lg text-muted-foreground/90 max-w-3xl mx-auto">
            A selection of my recent work and contributions to open source
            projects.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-muted/50 hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-border/50 hover:border-border/70"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${index}-${project.title.replace(
                /\s+/g,
                ""
              )}`}
              project={project}
            />
          ))}
        </div>

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

export default ProjectsSection;
