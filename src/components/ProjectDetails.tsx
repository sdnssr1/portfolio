import { X, Calendar, ExternalLink, Github, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface ProjectDetailsProps {
  project: {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    image: string;
    githubUrl?: string;
    demoUrl?: string;
    stars?: number;
    updatedAt?: string;
    category?: string;
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
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ 
            duration: 0.2,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="relative bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border/50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full p-2 hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Project Image */}
          <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  'https://via.placeholder.com/800x450/1e293b/64748b?text=No+Preview';
              }}
            />
            {project.category && (
              <div className="absolute top-4 right-4">
                <Badge variant="secondary">{project.category}</Badge>
              </div>
            )}
          </div>

          {/* Project Content */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  {project.stars !== undefined && (
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                      {project.stars} stars
                    </span>
                  )}
                  {project.updatedAt && (
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Updated {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {project.githubUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
                {project.demoUrl && (
                  <Button 
                    asChild 
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Close the modal first
                      onClose();
                      // Then open the demo URL in a new tab
                      setTimeout(() => {
                        window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
                      }, 100);
                    }}
                    className="flex items-center gap-2 hover:bg-accent/90 transition-colors"
                  >
                    <span className="flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Live Demo
                    </span>
                  </Button>
                )}
              </div>
            </div>

            <p className="mb-6 text-muted-foreground">{project.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.length > 0 ? (
                  project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No technologies specified
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <Button 
                  asChild 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Use the project's githubUrl if it exists and is a full URL
                    let githubUrl = project.githubUrl;
                    
                    // If it's not a full URL, try to construct it from metadata
                    if (!githubUrl.startsWith('http') && project.metadata) {
                      githubUrl = `https://github.com/${project.metadata.ownerLogin}/${project.metadata.repoName}`;
                    } 
                    // If we still don't have a valid URL, use a fallback
                    else if (!githubUrl.startsWith('http')) {
                      console.warn('No valid GitHub URL found for project:', project.id);
                      return;
                    }
                    
                    // Close the modal first
                    onClose();
                    
                    // Then open the URL in a new tab
                    setTimeout(() => {
                      window.open(githubUrl, '_blank', 'noopener,noreferrer');
                    }, 100);
                  }}
                  className="flex items-center gap-2 hover:bg-accent/90 transition-colors"
                >
                  <span className="flex items-center">
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </span>
                </Button>
              )}
              {project.demoUrl && (
                <Button 
                  asChild 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Close the modal after a small delay to allow the click to register
                    setTimeout(() => {
                      onClose();
                      window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
                    }, 100);
                  }}
                  className="flex items-center gap-2 transition-colors"
                >
                  <span className="flex items-center">
                    <ExternalLink className="h-4 w-4" />
                    Visit Live Demo
                  </span>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetails;
