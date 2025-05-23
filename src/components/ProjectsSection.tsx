import { fetchGitHubRepos } from "@/utils/github";
import { motion } from "framer-motion";
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
  metadata?: {
    isFork: boolean;
    language: string | null;
    hasIssues: boolean;
    hasWiki: boolean;
    hasPages: boolean;
    archived: boolean;
    disabled: boolean;
    createdAt: string;
    pushedAt: string;
    size: number;
    watchers: number;
    forks: number;
    openIssues: number;
    defaultBranch: string;
    license: string | null;
    repoName: string;
    ownerLogin: string;
  };
}

interface ProjectsSectionProps {
  projects?: Project[];
  includeGitHub?: boolean;
}

const GITHUB_USERNAME = "sdnssr1";

// Map GitHub repos to projects with unique IDs
const mapGitHubRepoToProject = (repo: any): Project => {
  // Create a more unique ID using both the repo ID and name
  const repoName = repo.name || '';
  const uniqueId = `gh-${repo.id}-${repoName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  
  // Ensure the GitHub URL is properly formatted
  const githubUrl = repo.html_url || `https://github.com/${GITHUB_USERNAME}/${repoName}`;
  const ownerLogin = repo.owner?.login || GITHUB_USERNAME;
  
  return {
    id: uniqueId,
    title: repoName
      .replace(/-/g, ' ')
      .replace(/\./g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
      .trim(),
    description: repo.description || 'No description provided.',
    technologies: Array.isArray(repo.topics) ? repo.topics.slice(0, 5) : [],
    image: `https://opengraph.githubassets.com/1/${ownerLogin}/${repoName}`,
    githubUrl: githubUrl,
    demoUrl: repo.homepage && repo.homepage.startsWith('http') ? repo.homepage : undefined,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
    category: 'GitHub',
    // Add repository metadata for better filtering
    metadata: {
      isFork: repo.fork || false,
      language: repo.language || null,
      hasIssues: repo.has_issues || false,
      hasWiki: repo.has_wiki || false,
      hasPages: repo.has_pages || false,
      archived: repo.archived || false,
      disabled: repo.disabled || false,
      createdAt: repo.created_at || new Date().toISOString(),
      pushedAt: repo.pushed_at || new Date().toISOString(),
      size: repo.size || 0,
      watchers: repo.watchers_count || 0,
      forks: repo.forks_count || 0,
      openIssues: repo.open_issues_count || 0,
      defaultBranch: repo.default_branch || 'main',
      license: repo.license?.name || null,
      repoName: repoName,
      ownerLogin: ownerLogin
    }
  };
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects: initialProjects = [],
  includeGitHub = true,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(includeGitHub);
  const [projects, setProjects] = useState<Project[]>([...defaultProjects, ...initialProjects]);

  useEffect(() => {
    const loadGitHubRepos = async () => {
      if (!includeGitHub) return;
      
      try {
        const repos = await fetchGitHubRepos(GITHUB_USERNAME);
        const githubProjects = repos.map(mapGitHubRepoToProject);
        
        // Ensure unique project IDs by prefixing with 'gh-'
        const uniqueGithubProjects = githubProjects.map(project => ({
          ...project,
          id: project.id
        }));
        
        // Filter out any existing GitHub projects to prevent duplicates
        setProjects(prevProjects => {
          const nonGithubProjects = prevProjects.filter(p => !p.id.startsWith('gh-'));
          return [...nonGithubProjects, ...uniqueGithubProjects];
        });
      } catch (error) {
        console.error("Failed to load GitHub projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGitHubRepos();
  }, [includeGitHub]);

  const categories = [
    "All",
    ...Array.from(
      new Set(projects.map((project) => project.category))
    ),
  ];

  // Filter projects based on active filter, ensuring no duplicates
  const filteredProjects = useMemo(() => {
    const uniqueProjects = new Map<string, Project>();
    
    // Add projects to map, using their ID as the key to ensure uniqueness
    projects.forEach(project => {
      uniqueProjects.set(project.id, project);
    });
    
    // Convert back to array and filter by active filter
    const filtered = Array.from(uniqueProjects.values());
    
    return activeFilter === "All" 
      ? filtered 
      : filtered.filter(project => project.category === activeFilter);
  }, [projects, activeFilter]);

  // Add a loading state for better UX
  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-muted-foreground mb-8">Loading projects...</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-muted/50 rounded-lg p-4 animate-pulse h-64" />
            ))}
          </div>
        </div>
      </section>
    );
  }

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

        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : (
          <>
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
                  key={`${project.id}-${project.updatedAt || ''}`}
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
          </>
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
      "Modern, responsive portfolio built with React and TypeScript, featuring smooth animations and a clean design.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80",
    githubUrl: "https://github.com/sdnssr1/portfolio",
    demoUrl: "https://sdnssr1.github.io/portfolio",
    category: "Web Development",
  },
  {
    id: "6",
    title: "Ken Muvatsi - Professional Portfolio",
    description:
      "Ken Muvatsi's professional portfolio showcasing his work, skills, and experience as a software engineer and designer.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image:
      "https://opengraph.githubassets.com/1/sdnssr1/kens_portfolio",
    githubUrl: "https://github.com/sdnssr1/kens_portfolio",
    demoUrl: "https://kenmuvatsi.com",
    category: "Web Development",
  },
];

export default ProjectsSection;
