import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, ExternalLink, FolderGit2, Github, Info, Star } from 'lucide-react';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { TechLogo } from './TechLogo';

interface ProjectsProps {
  projects: Project[];
}

interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string | null;
  updated_at: string;
}

const GITHUB_USERNAME = 'noahadeleye17-coder';
const MAX_GITHUB_PROJECTS = 6;

const languageIconSlugs: Record<string, string> = {
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  HTML: 'html5',
  CSS: 'css3',
  'C++': 'cplusplus',
  Dockerfile: 'docker',
  Java: 'java',
  Python: 'python',
};

const repositoryNameFromUrl = (url: string) => url.split('/').filter(Boolean).pop()?.toLowerCase();

const readableRepositoryName = (name: string) => name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

const updatedLabel = (date: string | null) => {
  if (!date) return 'Recently updated';
  return `Updated ${new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(date))}`;
};

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [githubRepositories, setGithubRepositories] = useState<GitHubRepository[]>([]);

  const featuredProjects = useMemo(() => projects.filter((project) => project.featured), [projects]);

  useEffect(() => {
    const controller = new AbortController();
    const featuredRepositoryNames = new Set(
      featuredProjects
        .map((project) => repositoryNameFromUrl(project.githubUrl))
        .filter((name): name is string => Boolean(name))
    );

    const loadRepositories = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=updated&direction=desc&per_page=100`,
          {
            headers: { Accept: 'application/vnd.github+json' },
            cache: 'no-store',
            signal: controller.signal,
          }
        );

        if (!response.ok) throw new Error(`GitHub returned ${response.status}`);

        const repositories: GitHubRepository[] = await response.json();
        setGithubRepositories(
          repositories
            .filter((repository) =>
              !repository.fork &&
              !repository.archived &&
              repository.name.toLowerCase() !== 'portfolio-site' &&
              !featuredRepositoryNames.has(repository.name.toLowerCase())
            )
            .slice(0, MAX_GITHUB_PROJECTS)
        );
      } catch (error) {
        if ((error as DOMException).name !== 'AbortError') setGithubRepositories([]);
      }
    };

    loadRepositories();
    return () => controller.abort();
  }, [featuredProjects]);

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-[#E8C765] bg-[#F6E9C4] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#B9861F] dark:border-[#8A6015]/50 dark:bg-[#3D2F12]/50 dark:text-[#D9A62E]">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>Selected work</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#3A2F26] dark:text-white sm:text-4xl">Projects with a purpose.</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {featuredProjects.map((project) => (
            <article key={project.id} className="group reveal-card overflow-hidden rounded-2xl border border-[#E4DBCB] bg-white shadow-xs transition-all hover:-translate-y-1 hover:border-[#D3C6AF] hover:shadow-lg dark:border-[#4A3C31] dark:bg-[#3A2F26] dark:hover:border-[#5C4B3A]">
              <div className="relative h-52 overflow-hidden bg-[#2A211C] sm:h-60">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-linear-to-t from-[#2A211C]/80 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#3A2F26]/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <Star className="h-3 w-3 fill-current text-[#DFB94A]" />
                  Featured
                </span>
              </div>
              <div className="space-y-4 p-5 sm:p-6">
                <div>
                  <h3 className="text-xl font-bold text-[#3A2F26] dark:text-white">{project.title}</h3>
                  <p className="mt-1 text-sm text-[#7A6B58] dark:text-[#B9A98C]">{project.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => <span key={tag} className="rounded-md border border-[#E4DBCB]/60 bg-[#EFE6D5] px-2 py-0.5 font-mono text-xs text-[#7A6B58] dark:border-[#5C4B3A]/60 dark:bg-[#4A3C31] dark:text-[#D3C6AF]">{tag}</span>)}
                </div>
                <div className="flex items-center justify-between border-t border-[#EFE6D5] pt-4 dark:border-[#4A3C31]">
                  <button type="button" onClick={() => setActiveModalProject(project)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B9861F] transition-colors hover:text-[#8A6015] dark:text-[#D9A62E]">
                    Details <Info className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-1">
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer noopener" aria-label={`View ${project.title} on GitHub`} className="project-action"><Github className="h-4 w-4" /></a>}
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer noopener" aria-label={`Open ${project.title}`} className="project-action text-[#B9861F] dark:text-[#D9A62E]"><ExternalLink className="h-4 w-4" /></a>}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {githubRepositories.length > 0 && (
          <div className="mt-14 border-t border-[#E4DBCB] pt-10 dark:border-[#4A3C31] sm:mt-20 sm:pt-12">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#B9861F] dark:text-[#D9A62E]">Live from GitHub</p>
                <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-[#3A2F26] dark:text-white">More from GitHub.</h3>
              </div>
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-sm font-semibold text-[#7A6B58] transition-colors hover:text-[#B9861F] dark:text-[#D3C6AF] dark:hover:text-[#D9A62E]">All repositories <ArrowUpRight className="h-4 w-4" /></a>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {githubRepositories.map((repository) => (
                <article key={repository.id} className="group flex min-h-52 flex-col rounded-2xl border border-[#E4DBCB] bg-white p-5 transition-all hover:-translate-y-1 hover:border-[#D3C6AF] hover:shadow-md dark:border-[#4A3C31] dark:bg-[#3A2F26] dark:hover:border-[#5C4B3A]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]">
                      <TechLogo name={repository.language || 'GitHub'} iconSlug={repository.language ? languageIconSlugs[repository.language] : 'github'} size={34} className="h-8 w-8" />
                    </div>
                    <a href={repository.html_url} target="_blank" rel="noreferrer noopener" aria-label={`Open ${repository.name} on GitHub`} className="project-action"><Github className="h-4 w-4" /></a>
                  </div>
                  <div className="mt-5">
                    <h4 className="font-bold text-[#3A2F26] dark:text-white">{readableRepositoryName(repository.name)}</h4>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#7A6B58] dark:text-[#B9A98C]">{repository.description || 'A work in progress on GitHub.'}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-5 font-mono text-xs text-[#9C8A6E] dark:text-[#B9A98C]">
                    <span>{repository.language || 'Code'}</span>
                    <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5" />{repository.stargazers_count}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3 font-mono text-xs text-[#B9A98C]">
                    <span>{updatedLabel(repository.pushed_at || repository.updated_at)}</span>
                    {repository.homepage && <a href={repository.homepage} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 font-semibold text-[#B9861F] hover:text-[#8A6015] dark:text-[#D9A62E]"><ExternalLink className="h-3.5 w-3.5" />Live</a>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
      <ProjectModal project={activeModalProject} onClose={() => setActiveModalProject(null)} />
    </section>
  );
};
