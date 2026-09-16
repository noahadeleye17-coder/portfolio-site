import React, { useState, useMemo } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Search, 
  Layers, 
  ArrowUpRight, 
  Star, 
  Info,
  SlidersHorizontal,
  BarChart3
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = [
    'All',
    'Full Stack',
    'AI & ML',
    'Mobile & Web',
    'Cloud & Systems',
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F6E9C4] dark:bg-[#3D2F12]/50 border border-[#E8C765] dark:border-[#8A6015]/50 text-[#B9861F] dark:text-[#D9A62E] text-xs font-semibold uppercase tracking-wider mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2F26] dark:text-white tracking-tight">
            Selected work.
          </h2>
          <p className="mt-3 text-base text-[#7A6B58] dark:text-[#B9A98C] leading-relaxed">
            A focused set of apps I have shipped or am actively building, with the decisions, tradeoffs, and product context kept visible.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#B9861F] text-white shadow-xs'
                      : 'bg-white dark:bg-[#4A3C31]/70 text-[#7A6B58] dark:text-[#D3C6AF] hover:bg-[#EFE6D5] dark:hover:bg-[#4A3C31] border border-[#E4DBCB]/80 dark:border-[#5C4B3A]/80'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-[#EFE6D5] dark:bg-[#5C4B3A] text-[#9C8A6E] dark:text-[#B9A98C]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#B9A98C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="project-search-input"
              type="text"
              placeholder="Search by title, tech or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-[#4A3C31]/70 border border-[#E4DBCB]/80 dark:border-[#5C4B3A]/80 text-[#3A2F26] dark:text-white placeholder:text-[#B9A98C] focus:outline-none focus:ring-2 focus:ring-[#CC9A24]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#B9A98C] hover:text-[#7A6B58] dark:hover:text-[#E4DBCB]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#3A2F26] border border-[#E4DBCB] dark:border-[#4A3C31]">
            <Layers className="w-8 h-8 text-[#B9A98C] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#4A3C31] dark:text-[#E4DBCB] mb-1">
              No projects found
            </h3>
            <p className="text-xs sm:text-sm text-[#9C8A6E] dark:text-[#B9A98C] mb-4">
              Try adjusting your search query or switching categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#B9861F] text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className={`group reveal-card rounded-2xl bg-white dark:bg-[#3A2F26] border border-[#E4DBCB] dark:border-[#4A3C31] overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-[#D3C6AF] dark:hover:border-[#5C4B3A] transition-all flex flex-col justify-between ${
                  project.featured && index === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div>
                  {/* Thumbnail / Image with Overlay */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#2A211C]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A211C]/80 via-transparent to-transparent" />
                    
                    {/* Category & Featured Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#3A2F26]/80 text-white backdrop-blur-xs border border-white/10">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-500 text-white shadow-xs">
                          <Star className="w-3 h-3 fill-current" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    {/* Quick View Button on Image Hover */}
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/90 dark:bg-[#3A2F26]/90 text-[#4A3C31] dark:text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:scale-105"
                      title="Inspect Architecture"
                      aria-label="Inspect project details"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div>
                      <h3
                        onClick={() => setActiveModalProject(project)}
                        className="text-lg font-bold text-[#3A2F26] dark:text-white group-hover:text-[#B9861F] dark:group-hover:text-[#D9A62E] transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#CC9A24] shrink-0 ml-1" />
                      </h3>
                      <p className="text-xs text-[#9C8A6E] dark:text-[#B9A98C] font-medium mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#7A6B58] dark:text-[#D3C6AF] line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Metric snippet if available */}
                    {project.metrics && (
                      <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 pt-1">
                        <BarChart3 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{project.metrics}</span>
                      </div>
                    )}

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.slice(0, 4).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-xs font-mono rounded-md bg-[#EFE6D5] dark:bg-[#4A3C31] text-[#7A6B58] dark:text-[#D3C6AF] border border-[#E4DBCB]/60 dark:border-[#5C4B3A]/60"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-1.5 py-0.5 text-xs font-mono rounded-md bg-[#EFE6D5] dark:bg-[#4A3C31] text-[#B9A98C]">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer Action Links */}
                <div className="px-5 sm:px-6 py-4 bg-[#F7F2E9]/70 dark:bg-[#4A3C31]/40 border-t border-[#EFE6D5] dark:border-[#4A3C31] flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-semibold text-[#B9861F] dark:text-[#D9A62E] hover:text-[#A2731A] dark:hover:text-[#DFB94A] transition-colors"
                  >
                    Deep Dive →
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        id={`github-link-${project.id}`}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`View ${project.title} on GitHub`}
                        className="p-1.5 rounded-lg text-[#9C8A6E] hover:text-[#3A2F26] dark:text-[#B9A98C] dark:hover:text-white hover:bg-[#E4DBCB]/60 dark:hover:bg-[#5C4B3A] transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        id={`demo-link-${project.id}`}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`View live demo for ${project.title}`}
                        className="p-1.5 rounded-lg text-[#B9861F] dark:text-[#D9A62E] hover:bg-[#F6E9C4] dark:hover:bg-[#3D2F12]/50 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
