import {
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  Globe,
} from "lucide-react";
import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface GitHubContributionsProps {
  username: string;
}

const GitHubContributions: React.FC<GitHubContributionsProps> = ({
  username = "sdnssr1",
}) => {
  const [showMore, setShowMore] = useState(false);
  const [isKensPortfolioModalOpen, setIsKensPortfolioModalOpen] =
    useState(false);

  // Ken's portfolio project data
  const kensPortfolioProject = {
    id: "kens_portfolio",
    title: "Ken’s Portfolio",
    description: "A modern portfolio website for Ken Muvatsi…",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "public/ken-muvatsi.png", // ← local asset
    githubUrl: "https://github.com/sdnsr1/kens_portfolio",
    demoUrl: "https://kenmuvatsi.com",
    updatedAt: new Date().toISOString(),
    category: "Web Development",
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-6 w-6 text-primary" />
            GitHub Stats
          </CardTitle>
          <CardDescription>Open source activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-6">
            {/* Section title with GitHub logo */}
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Github className="h-5 w-5 text-primary" />
              </div>
              <h4 className="text-md font-medium">Activity Timeline</h4>
            </div>

            {/* GitHub Contribution Graph - Prominently First */}
            <Card className="border border-border/40 overflow-hidden bg-card/60 backdrop-blur-sm hover:shadow-md transition-shadow duration-300">
              <a
                href={`https://github.com/${username}?tab=contributions`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-medium text-primary">
                        Contribution Activity
                      </h3>
                    </div>
                    <div className="w-full rounded-lg overflow-hidden border border-border/30 bg-card/80">
                      <div className="p-4 space-y-4">
                        {/* Activity Item - Created commits */}
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <path d="m12 15 2 2 4-4"></path>
                              <rect
                                width="14"
                                height="14"
                                x="8"
                                y="8"
                                rx="2"
                                ry="2"
                              ></rect>
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">
                              Created 42 commits in 7 repositories
                            </h4>
                            <div className="text-xs text-muted-foreground mt-1">
                              May 2025
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">
                              <span className="text-primary/80 hover:text-primary">
                                sdnssr1/portfolio
                              </span>
                              ,
                              <span className="text-primary/80 hover:text-primary">
                                {" "}
                                sdnssr1/calender
                              </span>
                              ,
                              <span className="text-primary/80 hover:text-primary">
                                {" "}
                                and 5 more
                              </span>
                            </div>
                            {showMore && (
                              <div className="mt-3 ml-2 space-y-2 border-l-2 border-border/30 pl-3">
                                <div className="text-xs">
                                  <div className="text-muted-foreground">
                                    May 18
                                  </div>
                                  <div>
                                    Added responsive design for mobile devices{" "}
                                    <span className="text-primary/80 hover:text-primary">
                                      sdnssr1/portfolio
                                    </span>
                                  </div>
                                </div>
                                <div className="text-xs">
                                  <div className="text-muted-foreground">
                                    May 17
                                  </div>
                                  <div>
                                    Fixed calendar sync issue{" "}
                                    <span className="text-primary/80 hover:text-primary">
                                      sdnssr1/calender
                                    </span>
                                  </div>
                                </div>
                                <div className="text-xs">
                                  <div className="text-muted-foreground">
                                    May 15
                                  </div>
                                  <div>
                                    Initial commit{" "}
                                    <span className="text-primary/80 hover:text-primary">
                                      sdnssr1/redpath-readiness-quiz
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Activity Item - Created repositories */}
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <path d="M3 3h18v18H3z"></path>
                              <path d="M9 9h6v6H9z"></path>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">
                              Created 6 repositories
                            </h4>
                            <div className="text-xs text-muted-foreground mt-1">
                              May 2025
                            </div>
                            <div className="mt-2 space-y-1.5">
                              <div className="flex items-center gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                                </svg>
                                <span className="text-xs text-primary/80 hover:text-primary">
                                  sdnssr1/calender
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                  TypeScript
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                                </svg>
                                <span className="text-xs text-primary/80 hover:text-primary">
                                  sdnssr1/portfolio
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                  TypeScript
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                                </svg>
                                <span
                                  className="text-xs text-primary/80 hover:text-primary cursor-pointer flex items-center"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsKensPortfolioModalOpen(true);
                                  }}
                                >
                                  sdnssr1/kens_portfolio
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                  HTML
                                </span>
                              </div>
                              {showMore && (
                                <>
                                  <div className="flex items-center gap-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                                    </svg>
                                    <span className="text-xs text-primary/80 hover:text-primary">
                                      sdnssr1/redpath-readiness-quiz
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                      TypeScript
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                                    </svg>
                                    <span className="text-xs text-primary/80 hover:text-primary">
                                      sdnssr1/TheRedPath
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                      TypeScript
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                                    </svg>
                                    <span className="text-xs text-primary/80 hover:text-primary">
                                      sdnssr1/fast-whisper
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                      Python
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Activity Item - Opened pull request */}
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <circle cx="18" cy="18" r="3"></circle>
                              <circle cx="6" cy="6" r="3"></circle>
                              <path d="M6 21V9a9 9 0 0 0 9 9"></path>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">
                              Opened 1 pull request in 1 repository
                            </h4>
                            <div className="text-xs text-muted-foreground mt-1">
                              May 2025
                            </div>
                            <div className="mt-2 text-xs text-primary/80 hover:text-primary">
                              Per 1
                              <span className="ml-2 text-[10px] text-muted-foreground bg-green-500/10 px-1.5 py-0.5 rounded-full">
                                merged
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              sdnssr1/calender
                            </div>
                            {showMore && (
                              <div className="mt-3 ml-2 border-l-2 border-border/30 pl-3">
                                <div className="text-xs">
                                  <div className="text-muted-foreground">
                                    May 16
                                  </div>
                                  <div className="text-primary/80 hover:text-primary">
                                    Fix calendar week view rendering issues
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    This PR addresses the rendering issues in
                                    the calendar week view where events would
                                    sometimes overlap incorrectly. Fixed by
                                    implementing proper time slot allocation and
                                    collision detection.
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Additional activities that show only when expanded */}
                        {showMore && (
                          <>
                            {/* Activity Item - Forked repository */}
                            <div className="flex items-start gap-3">
                              <div className="bg-primary/10 p-2 rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-primary"
                                >
                                  <path d="M7 7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2"></path>
                                  <path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path>
                                  <path d="M16 11v6"></path>
                                  <path d="M8 11v6"></path>
                                  <path d="M12 11v6"></path>
                                </svg>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium">
                                  Forked a repository
                                </h4>
                                <div className="text-xs text-muted-foreground mt-1">
                                  May 8, 2025
                                </div>
                                <div className="mt-2 text-xs">
                                  <span className="text-primary/80 hover:text-primary">
                                    sdnssr1/react-calendar
                                  </span>{" "}
                                  from
                                  <span className="text-muted-foreground">
                                    {" "}
                                    moodydev/react-calendar
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Activity Item - Starred repository */}
                            <div className="flex items-start gap-3">
                              <div className="bg-primary/10 p-2 rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-primary"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium">
                                  Starred 3 repositories
                                </h4>
                                <div className="text-xs text-muted-foreground mt-1">
                                  May 5-7, 2025
                                </div>
                                <div className="mt-2 space-y-1.5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-primary/80 hover:text-primary">
                                      vercel/next.js
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                      JavaScript
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-primary/80 hover:text-primary">
                                      shadcn/ui
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                      TypeScript
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-primary/80 hover:text-primary">
                                      microsoft/TypeScript
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                      TypeScript
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        className="p-3 bg-card/50 border-t border-border/30 text-center cursor-pointer hover:bg-card/80 transition-colors"
                        onClick={() => setShowMore(!showMore)}
                      >
                        <span className="text-xs text-primary hover:text-primary/80 font-medium flex items-center justify-center gap-1">
                          {showMore ? (
                            <>
                              Show less activity
                              <ChevronUp className="h-3 w-3" />
                            </>
                          ) : (
                            <>
                              Show more activity
                              <ChevronDown className="h-3 w-3" />
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </a>
            </Card>

            {/* View Full Profile Button */}
            <div className="flex justify-center mt-4">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button variant="outline" className="gap-2">
                  View Full GitHub Profile
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ken's Portfolio Project Modal */}
      {isKensPortfolioModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-background rounded-lg overflow-auto max-w-2xl w-full max-h-[90vh] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 overflow-hidden bg-muted/20">
              <img
                src={kensPortfolioProject.image}
                alt={kensPortfolioProject.title}
                className="w-full h-full object-cover"
                loading="lazy"
                data-component-name="ProjectCard"
              />
              <button
                className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background text-foreground"
                onClick={() => setIsKensPortfolioModalOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                {kensPortfolioProject.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {kensPortfolioProject.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {kensPortfolioProject.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={kensPortfolioProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-card hover:bg-card/80 border border-border/50 px-4 py-2 rounded-md transition-colors"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
                <a
                  href={kensPortfolioProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GitHubContributions;
