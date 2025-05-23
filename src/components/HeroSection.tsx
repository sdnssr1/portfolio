import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, FileTextIcon, MessageSquareIcon } from "lucide-react";
import GitHubStats from "./GitHubStats";

interface HeroSectionProps {
  name?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  githubUsername?: string;
}

const HeroSection = ({
  name = "Saeed",
  title = "Full-Stack Developer & AI Solutions Builder",
  description = "I craft efficient, scalable web applications and help businesses leverage AI for automation. Whether you're looking for a dedicated team member or need help with a specific project, I bring technical expertise and innovative solutions to the table.",
  imageUrl = "/7990E5BA-7F49-4146-BB79-D81BDDE5C069.jpg",
  githubUsername = "sdnssr1",
}: HeroSectionProps) => {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className="min-h-screen w-full bg-background flex items-center justify-center py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl w-full flex flex-col gap-8">
        {/* Top row: Name, description, and profile picture */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <motion.div
            className="flex-1"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Hi, I'm {name}
                </h1>
                <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
                  {title}
                </h2>
                <p className="text-lg text-muted-foreground/90 max-w-2xl leading-relaxed mt-2">
                  {description}
                </p>
                
                <div className="flex flex-wrap gap-4 pt-6">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="group text-foreground/80 hover:text-foreground hover:bg-foreground/5 border border-foreground/20 hover:border-foreground/40"
                    onClick={() =>
                      document
                        .getElementById("services")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    My Services
                    <FileTextIcon className="ml-2 h-4 w-4 transition-opacity opacity-80 group-hover:opacity-100" />
                  </Button>
                
                  <Button
                    size="lg"
                    className="group bg-primary hover:bg-primary/90 transition-colors"
                    onClick={() =>
                      document
                        .getElementById("projects")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    View My Work
                    <ArrowDownIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="group border-foreground/20 hover:bg-foreground/5 transition-colors"
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Hire Me
                    <MessageSquareIcon className="ml-2 h-4 w-4 transition-opacity opacity-80 group-hover:opacity-100" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Profile Image - now next to the name with full size */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/10 shadow-xl">
              <img
                src={imageUrl}
                alt={`${name} - Professional Headshot`}
                className="w-full h-full object-cover"
                style={{ objectPosition: '70% 100%' }}
              />
            </div>
          </motion.div>
        </div>
        
        {/* GitHub Stats */}
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              {/* GitHub Stats - now right under the action buttons */}
              <GitHubStats username={githubUsername} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
