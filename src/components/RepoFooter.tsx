import React from 'react';
import { Github, ExternalLink, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RepoFooterProps {
  repoUrl: string;
  websiteUrl: string;
  lastUpdated?: Date;
}

const RepoFooter: React.FC<RepoFooterProps> = ({ 
  repoUrl, 
  websiteUrl, 
  lastUpdated = new Date()
}) => {
  return (
    <div className="p-6 mt-auto flex justify-between items-center pt-4">
      <div className="flex items-center space-x-1">
        {/* GitHub Repository Link */}
        <a 
          href={repoUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-2 rounded-full hover:bg-muted/80 transition-colors" 
          aria-label="View on GitHub" 
          title="View on GitHub"
        >
          <Github className="h-4 w-4" />
        </a>
        
        {/* Website Link - New button added */}
        <a 
          href={websiteUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-2 rounded-full hover:bg-muted/80 transition-colors" 
          aria-label="Visit Website" 
          title="Visit Website"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      
      {/* Last updated timestamp */}
      <span className="text-xs text-muted-foreground flex items-center">
        <Calendar className="h-3 w-3 mr-1" />
        {formatDistanceToNow(lastUpdated, { addSuffix: true })}
      </span>
    </div>
  );
};

export default RepoFooter;
