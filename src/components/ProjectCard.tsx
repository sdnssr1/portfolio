import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, Cpu, ExternalLink, Github, Star } from "lucide-react";
import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

export interface Project {
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
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project: projectProp }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const {
    title,
    description,
    technologies,
    image,
    githubUrl,
    demoUrl,
    stars,
    updatedAt,
    category,
  } = projectProp;

  // Check if project is AI/ML related
  const isAIProject =
    technologies?.some((tech) =>
      [
        "ai",
        "ml",
        "machine learning",
        "artificial intelligence",
        "tensorflow",
        "pytorch",
        "llm",
        "nlp",
        "computer vision",
      ].includes(tech.toLowerCase())
    ) ||
    title.toLowerCase().includes("ai") ||
    title.toLowerCase().includes("ml");
  // Handle image loading errors
  const [imgSrc, setImgSrc] = useState(image);
  const handleImageError = () => {
    setImgSrc(
      "https://via.placeholder.com/800x450/1e293b/64748b?text=No+Preview"
    );
  };

  return (
    <div className="h-full group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full relative"
      >
        <Card
          className="h-full flex flex-col overflow-hidden transition-all duration-300 cursor-pointer border border-border/50 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 group-hover:translate-y-[-5px]"
          onClick={() => setIsDetailsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsDetailsOpen(true);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`View details for ${title}`}
        >
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden bg-muted/20">
            <img
              src={imgSrc}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              onError={handleImageError}
              loading="lazy"
            />
            <div className="absolute top-2 right-2 flex flex-col gap-2 items-end">
              {isAIProject && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Badge className="bg-purple-600 hover:bg-purple-700 flex items-center gap-1">
                    <Cpu className="h-3 w-3" />
                    <span>AI/ML</span>
                  </Badge>
                </motion.div>
              )}
              {category && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge variant="secondary">{category}</Badge>
                </motion.div>
              )}
            </div>
          </div>

          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold line-clamp-1 text-foreground">
              {title}
            </CardTitle>
            <CardDescription className="line-clamp-2 min-h-[40px] text-muted-foreground/90">
              {description || "No description provided."}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow">
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies?.length > 0 ? (
                technologies.slice(0, 3).map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))
              ) : (
                <Badge variant="outline" className="text-xs">
                  No technologies specified
                </Badge>
              )}
            </div>

            {/* GitHub Stats */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
              {stars !== undefined && (
                <div className="flex items-center">
                  <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
                  <span>{stars}</span>
                </div>
              )}
              {updatedAt && (
                <div
                  className="flex items-center"
                  title={`Last updated ${new Date(
                    updatedAt
                  ).toLocaleDateString()}`}
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>
                    {formatDistanceToNow(new Date(updatedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="mt-auto flex justify-between items-center pt-4">
            <div className="flex items-center space-x-1">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-muted/80 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Open GitHub URL directly without opening the modal
                    window.open(githubUrl, "_blank", "noopener,noreferrer");
                  }}
                  aria-label="View on GitHub"
                  title="View on GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-muted/80 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Open demo URL directly without opening the modal
                    window.open(demoUrl, "_blank", "noopener,noreferrer");
                  }}
                  aria-label="View live demo"
                  title="View live demo"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
            {updatedAt && (
              <span className="text-xs text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
              </span>
            )}
          </CardFooter>
        </Card>

        <ProjectDetails
          project={projectProp}
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            // Focus the card when modal closes for better keyboard navigation
            const card = document.querySelector(
              `[data-project-id="${projectProp.id}"]`
            );
            if (card instanceof HTMLElement) {
              setTimeout(() => card.focus(), 0);
            }
          }}
        />
      </motion.div>
    </div>
  );
};

export default ProjectCard;
