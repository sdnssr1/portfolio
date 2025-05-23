export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  fork: boolean;
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos: GitHubRepo[] = await response.json();
    // Filter out forked repositories if you only want original projects
    return repos.filter(repo => !repo.fork);
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

export function mapGitHubRepoToProject(repo: GitHubRepo, index: number): any {
  // Map GitHub repo to your Project interface
  return {
    id: `gh-${repo.id}`,
    title: repo.name
      .split('-') // Split by hyphen
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
      .join(' '), // Join with spaces
    description: repo.description || 'No description provided.',
    technologies: repo.language ? [repo.language] : [],
    image: `https://opengraph.githubassets.com/1/sdnssr1/${repo.name}`,
    githubUrl: repo.html_url,
    demoUrl: repo.homepage || undefined,
    category: 'GitHub',
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
  };
}
