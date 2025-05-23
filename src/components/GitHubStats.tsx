import React from 'react';
import { Card, CardContent, CardTitle } from './ui/card';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Github, Star, Calendar, Flame, BarChart } from 'lucide-react';

interface GitHubStatsProps {
  username: string;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({ username }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-2 w-full"
    >
      <Card className="border border-border/40 overflow-hidden bg-card/60 backdrop-blur-sm p-3">
        <div className="flex flex-col gap-3">
          {/* GitHub Profile Link */}
          <div>
            <a 
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Button variant="default" className="bg-[#0d1117] hover:bg-[#161b22] text-white flex items-center gap-2">
                <Github className="h-4 w-4" />
                <span className="font-medium">View GitHub Profile</span>
              </Button>
            </a>
          </div>

          {/* GitHub Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Repository Count */}
            <div className="bg-white/5 rounded-lg border border-border/30 p-3 hover:border-border/50 transition-colors">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Repositories</span>
                </div>
                <p className="text-4xl font-bold mt-1">42</p>
                <p className="text-xs text-muted-foreground mt-1">16 public, 26 private</p>
              </div>
            </div>
            
            {/* Contribution Streak */}
            <div className="bg-white/5 rounded-lg border border-border/30 p-3 hover:border-border/50 transition-colors">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Current Streak</span>
                </div>
                <p className="text-4xl font-bold mt-1">14 days</p>
                <p className="text-xs text-muted-foreground mt-1">Last commit: Today</p>
              </div>
            </div>
            
            {/* Activity Count */}
            <div className="bg-white/5 rounded-lg border border-border/30 p-3 hover:border-border/50 transition-colors">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">2025 Activity</span>
                </div>
                <p className="text-4xl font-bold mt-1">632</p>
                <p className="text-xs text-muted-foreground mt-1">Contributions this year</p>
              </div>
            </div>
          </div>
          
          {/* GitHub Contributions Graph */}
          <div>
            <div className="flex items-center mb-3 gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">GitHub Contributions</h3>
            </div>
            <div className="w-full overflow-hidden rounded-lg border border-border/40 p-3 bg-card/50">
              <img 
                src={`https://ghchart.rshah.org/${username}`}
                alt={`${username}'s GitHub Contribution Chart`}
                className="w-full h-auto rounded-md"
                loading="lazy"
              />
              <p className="text-sm text-center text-muted-foreground mt-2">
                Click to view full profile on GitHub
              </p>
            </div>
          </div>

          {/* Additional Stats - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* GitHub Streak Card */}
            <div className="bg-card rounded-lg border border-border/40 overflow-hidden">
              <a 
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-foreground"
              >
                <div className="p-3">
                  <div className="flex items-center mb-3 gap-2">
                    <Flame className="h-5 w-5 text-orange-400" />
                    <h3 className="text-md font-medium">Contribution Streak</h3>
                  </div>
                  <div className="flex justify-center">
                    <img 
                      src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=tokyonight&hide_border=true&background=transparent`}
                      alt={`${username}'s GitHub streak stats`}
                      className="max-w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                </div>
              </a>
            </div>
            
            {/* GitHub Stats Card */}
            <div className="bg-card rounded-lg border border-border/40 overflow-hidden">
              <a 
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-foreground"
              >
                <div className="p-3">
                  <div className="flex items-center mb-3 gap-2">
                    <BarChart className="h-5 w-5 text-blue-400" />
                    <h3 className="text-md font-medium">GitHub Statistics</h3>
                  </div>
                  <div className="flex justify-center">
                    <img 
                      src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=00000000`}
                      alt={`${username}'s GitHub stats`}
                      className="max-w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default GitHubStats;
