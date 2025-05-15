import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, FileTextIcon, MessageSquareIcon } from "lucide-react";

interface HeroSectionProps {
  name?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

const HeroSection = ({
  name = "Saeed",
  title = "Multidisciplinary Creator & Full-Stack Developer",
  description = "I care deeply about getting things right from the very first commit. Blending software engineering with design, systems-thinking, and storytelling to build ethical, privacy-focused solutions.",
  imageUrl = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80",
}: HeroSectionProps) => {
  return (
    <section className="min-h-[700px] w-full bg-background flex items-center justify-center py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <motion.div
          className="flex flex-col space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Hi, I'm {name}
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground">
              {title}
            </h2>
          </div>

          <p className="text-lg text-muted-foreground max-w-lg">
            {description}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              size="lg"
              className="group"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
              <ArrowDownIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group"
              onClick={() =>
                document
                  .getElementById("resume")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Resume
              <FileTextIcon className="ml-2 h-4 w-4 transition-opacity opacity-70 group-hover:opacity-100" />
            </Button>

            <Button
              size="lg"
              variant="secondary"
              className="group"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Me
              <MessageSquareIcon className="ml-2 h-4 w-4 transition-opacity opacity-70 group-hover:opacity-100" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/10 shadow-xl">
            <img
              src={imageUrl}
              alt={`${name} - Professional Headshot`}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
