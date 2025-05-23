import { Briefcase, Code, Cpu, Database, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const services = [
  {
    title: "Web Development",
    description: "Custom, responsive websites and web applications built with modern technologies.",
    icon: <Code className="h-8 w-8 text-primary" />,
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
  },
  {
    title: "AI Integration",
    description: "Enhance your applications with AI capabilities like natural language processing and computer vision.",
    icon: <Cpu className="h-8 w-8 text-primary" />,
    tags: ["OpenAI", "LLMs", "ML Models", "Automation"],
  },
  {
    title: "Full-Stack Development",
    description: "End-to-end development services from database design to frontend implementation.",
    icon: <Database className="h-8 w-8 text-primary" />,
    tags: ["MongoDB", "PostgreSQL", "Express", "REST APIs"],
  },
  {
    title: "Mobile Development",
    description: "Cross-platform mobile applications that work seamlessly on both iOS and Android.",
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    tags: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    title: "Consulting",
    description: "Technical guidance and architecture design for your next project or startup.",
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    tags: ["System Design", "Code Review", "Tech Stack Selection"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            My Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground/90 max-w-3xl mx-auto">
            Whether you need a complete application or help with a specific part of your project,
            I've got you covered.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-card/50 p-6 rounded-xl shadow-sm border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                {React.cloneElement(service.icon, {
                  className: "h-7 w-7 text-primary group-hover:scale-110 transition-transform"
                })}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground/90 mb-5 leading-relaxed">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/10 group-hover:border-primary/30 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
