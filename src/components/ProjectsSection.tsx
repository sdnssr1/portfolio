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
}

interface ProjectsSectionProps {
  projects?: Project[];
  includeGitHub?: boolean;
}

const GITHUB_USERNAME = "sdnssr1";

// Helper function to determine the category based on technologies and title
const determineCategory = (repo: any): string => {
  const title = (repo.name || '').toLowerCase();
  const description = (repo.description || '').toLowerCase();
  const topics = Array.isArray(repo.topics) ? repo.topics.map((t: string) => t.toLowerCase()) : [];
  
  // Check for AI/ML projects
  if (
    topics.some(tech => ['ai', 'ml', 'machine-learning', 'artificial-intelligence', 'tensorflow', 'pytorch', 'llm', 'nlp', 'computer-vision'].includes(tech)) ||
    title.includes('ai') || title.includes('ml') || description.includes('ai ') || description.includes('machine learning')
  ) {
    return 'AI';
  }
  
  // Check for Mobile projects
  if (
    topics.some(tech => ['mobile', 'android', 'ios', 'flutter', 'react-native', 'swift', 'kotlin'].includes(tech)) ||
    title.includes('mobile') || title.includes('app') || description.includes('mobile app')
  ) {
    return 'Mobile';
  }
  
  // Check for FullStack projects
  if (
    topics.some(tech => ['fullstack', 'full-stack', 'backend', 'frontend'].includes(tech)) ||
    (topics.some(tech => ['react', 'vue', 'angular'].includes(tech)) && 
     topics.some(tech => ['node', 'express', 'django', 'flask', 'spring'].includes(tech)))
  ) {
    return 'FullStack';
  }
  
  // Check for Web Development projects
  if (
    topics.some(tech => ['web', 'website', 'react', 'vue', 'angular', 'javascript', 'typescript', 'html', 'css', 'tailwind'].includes(tech)) ||
    title.includes('web') || description.includes('website') || description.includes('web app')
  ) {
    return 'Web Development';
  }
  
  // Check for Consulting projects
  if (
    topics.some(tech => ['consulting', 'analysis', 'report', 'business'].includes(tech)) ||
    title.includes('consult') || description.includes('consulting') || description.includes('analysis')
  ) {
    return 'Consulting';
  }
  
  // Default to GitHub if no specific category is determined
  return 'GitHub';
};

const mapGitHubRepoToProject = (repo: any): Project => {
  const repoName = repo.name || '';
  const uniqueId = `gh-${repo.id}-${repoName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
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
    category: determineCategory(repo)
  };
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects: initialProjects = [],
  includeGitHub = true,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(includeGitHub);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  useEffect(() => {
    const loadGitHubRepos = async () => {
      if (!includeGitHub) return;
      
      try {
        const repos = await fetchGitHubRepos(GITHUB_USERNAME);
        const githubProjects = repos.map(mapGitHubRepoToProject);
        setProjects(prev => [...prev, ...githubProjects]);
      } catch (error) {
        console.error("Failed to load GitHub projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGitHubRepos();
  }, [includeGitHub]);

  // Define predefined categories
  const predefinedCategories = [
    "All",
    "Web Development",
    "AI",
    "FullStack",
    "Mobile",
    "Consulting",
    "GitHub"
  ];
  
  // Get categories that actually have projects
  const availableCategories = Array.from(new Set(projects.map(project => project.category)));
  
  // Use only predefined categories that have projects, always keeping "All"
  const categories = [
    "All",
    ...predefinedCategories.filter(cat => cat !== "All" && availableCategories.includes(cat))
  ];

  const filteredProjects = useMemo(() => {
    return activeFilter === "All" 
      ? projects 
      : projects.filter(project => project.category === activeFilter);
  }, [projects, activeFilter]);

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
          <p className="mt-4 text-lg text-muted-foreground/90 max-w-3xl mx-auto">
            A selection of my recent work and contributions to open source projects.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'bg-muted/50 hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-border/50 hover:border-border/70'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={`${project.id}-${index}-${project.title.replace(/\s+/g, '')}`} 
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
