import React, { useState } from 'react';

interface TechLogoProps {
  name: string;
  iconSlug?: string;
  className?: string;
  size?: number;
}

export const TechLogo: React.FC<TechLogoProps> = ({ name, iconSlug, className = 'w-6 h-6', size = 24 }) => {
  const [remoteIconFailed, setRemoteIconFailed] = useState(false);
  const normName = name.toLowerCase().trim();

  if (iconSlug && !remoteIconFailed) {
    return (
      <img
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconSlug}/${iconSlug}-original.svg`}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        loading="lazy"
        onError={() => setRemoteIconFailed(true)}
        className={`${className} object-contain`}
      />
    );
  }

  // TypeScript
  if (normName.includes('typescript') || normName === 'ts') {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M11.5 14.5C11.5 16.5 10 18 7.5 18C5.5 18 4.2 16.8 4 15.2L6 14.8C6.1 15.7 6.7 16.2 7.6 16.2C8.5 16.2 9.2 15.6 9.2 14.7C9.2 13.8 8.6 13.3 7.3 12.8L6.4 12.4C4.6 11.7 3.8 10.7 3.8 9.3C3.8 7.5 5.2 6 7.4 6C9.3 6 10.5 7.1 10.7 8.5L8.7 8.9C8.6 8.2 8.1 7.7 7.3 7.7C6.5 7.7 5.9 8.2 5.9 8.9C5.9 9.6 6.5 10 7.8 10.5L8.7 10.9C10.5 11.6 11.5 12.7 11.5 14.5Z" fill="white" />
        <path d="M13 8H20V10H17.6V18H15.4V10H13V8Z" fill="white" />
      </svg>
    );
  }

  // React
  if (normName.includes('react')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      </svg>
    );
  }

  // Next.js
  if (normName.includes('next.js') || normName.includes('nextjs') || normName === 'next') {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="#000000" stroke="#333333" strokeWidth="1" />
        <path d="M7 7.5V16.5M7 7.5L16.2 19M15 7.5H17V13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // Tailwind CSS
  if (normName.includes('tailwind')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" fill="#38BDF8" />
      </svg>
    );
  }

  // Motion / Framer Motion
  if (normName.includes('motion') || normName.includes('framer')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4 2H20V9.5H12L4 2Z" fill="#0055FF" />
        <path d="M4 9.5H12L20 17H12L4 9.5Z" fill="#FF0055" />
        <path d="M4 17H12V22L4 17Z" fill="#FFCC00" />
      </svg>
    );
  }

  // Node.js
  if (normName.includes('node')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L20.5 7V17L12 22L3.5 17V7L12 2Z" fill="#539E43" />
        <path d="M12 4.5L18.5 8.2V15.8L12 19.5L5.5 15.8V8.2L12 4.5Z" fill="#333333" />
        <path d="M12 7.5L16 9.8V14.2L12 16.5L8 14.2V9.8L12 7.5Z" fill="#68A063" />
      </svg>
    );
  }

  // Express / NestJS
  if (normName.includes('express') || normName.includes('nestjs')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#E0234E" />
        <path d="M12 4L19 9V17L12 21L5 17V9L12 4Z" fill="white" />
        <path d="M12 7L16.5 10.5V15.5L12 18L7.5 15.5V10.5L12 7Z" fill="#E0234E" />
      </svg>
    );
  }

  // PostgreSQL / Postgres
  if (normName.includes('postgres') || normName.includes('psql') || normName.includes('pgvector')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#336791" />
        <path d="M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM12 6C15.31 6 18 8.69 18 12C18 13.82 17.18 15.45 15.9 16.55L14.75 14.5C15.53 13.8 16 12.95 16 12C16 9.79 14.21 8 12 8C9.79 8 8 9.79 8 12C8 12.95 8.47 13.8 9.25 14.5L8.1 16.55C6.82 15.45 6 13.82 6 12C6 8.69 8.69 6 12 6Z" fill="white" />
      </svg>
    );
  }

  // Go / Golang
  if (normName.includes('go') || normName.includes('golang')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00ACD7" />
        <path d="M6 12C6 9.79 7.79 8 10 8C11.5 8 12.8 8.8 13.5 10L11.8 11C11.4 10.4 10.7 10 10 10C8.9 10 8 10.9 8 12C8 13.1 8.9 14 10 14C10.7 14 11.3 13.7 11.7 13.2H10V11.5H13.8V14.5C12.9 15.4 11.5 16 10 16C7.79 16 6 14.21 6 12Z" fill="white" />
        <path d="M16 8H18V16H16V8Z" fill="white" />
      </svg>
    );
  }

  // Redis
  if (normName.includes('redis')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#DC382D" />
        <path d="M12 5L4.5 9L12 13L19.5 9L12 5Z" fill="white" />
        <path d="M4.5 11.5L12 15.5L19.5 11.5V14.5L12 18.5L4.5 14.5V11.5Z" fill="white" />
      </svg>
    );
  }

  // GraphQL
  if (normName.includes('graphql')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" stroke="#E10098" strokeWidth="2" fill="none" />
        <circle cx="12" cy="2" r="2" fill="#E10098" />
        <circle cx="20.66" cy="7" r="2" fill="#E10098" />
        <circle cx="20.66" cy="17" r="2" fill="#E10098" />
        <circle cx="12" cy="22" r="2" fill="#E10098" />
        <circle cx="3.34" cy="17" r="2" fill="#E10098" />
        <circle cx="3.34" cy="7" r="2" fill="#E10098" />
        <path d="M12 2L12 22M20.66 7L3.34 17M20.66 17L3.34 7" stroke="#E10098" strokeWidth="1.2" />
      </svg>
    );
  }

  // Docker
  if (normName.includes('docker') || normName.includes('container')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#2496ED" />
        <rect x="5" y="10" width="2" height="2" fill="white" />
        <rect x="8" y="10" width="2" height="2" fill="white" />
        <rect x="11" y="10" width="2" height="2" fill="white" />
        <rect x="8" y="7" width="2" height="2" fill="white" />
        <rect x="11" y="7" width="2" height="2" fill="white" />
        <path d="M4 13C4 16.5 7 18 12 18C17 18 19.5 15.5 20 14C19 14.2 18 14 18 14C18 14 19 13 19 12C17 12 16 13 16 13C15 13 13 13 12 13H4Z" fill="white" />
      </svg>
    );
  }

  // AWS
  if (normName.includes('aws') || normName.includes('amazon')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#232F3E" />
        <path d="M6.5 11.5L8.5 7.5H10L12 11.5H10.5L10 10.5H8.5L8 11.5H6.5ZM8.8 9.5H9.7L9.2 8.3L8.8 9.5ZM13 11.5L12 7.5H13.5L14.2 10.3L15 7.5H16.2L17 10.3L17.7 7.5H19L18 11.5H16.8L16.1 8.8L15.3 11.5H14.3L13.6 8.8L13 11.5Z" fill="white" />
        <path d="M6 14.5C10 17 14 17 18 14.5M17.5 13.5L18.5 14.5L17.5 15.5" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Google Cloud Platform (GCP)
  if (normName.includes('gcp') || normName.includes('google cloud')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#4285F4" />
        <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12H12V9.5H19.3C19.45 10.3 19.5 11.15 19.5 12C19.5 16.14 16.14 19.5 12 19.5C7.86 19.5 4.5 16.14 4.5 12C4.5 7.86 7.86 4.5 12 4.5C14.1 4.5 15.95 5.25 17.35 6.55L15.4 8.5C14.5 7.6 13.35 7 12 7Z" fill="white" />
      </svg>
    );
  }

  // CI/CD / GitHub Actions
  if (normName.includes('ci/cd') || normName.includes('github actions') || normName.includes('actions')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#2088FF" />
        <path d="M6 12L10 16L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Kubernetes
  if (normName.includes('kubernetes') || normName.includes('k8s') || normName.includes('helm')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#326CE5" />
        <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none" />
        <path d="M12 4.5V7.5M12 16.5V19.5M4.5 12H7.5M16.5 12H19.5M6.5 6.5L8.5 8.5M15.5 15.5L17.5 17.5M6.5 17.5L8.5 15.5M15.5 8.5L17.5 6.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // LLM & Gemini / AI / Machine Learning
  if (normName.includes('gemini') || normName.includes('llm') || normName.includes('ai')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4E82EE" />
            <stop offset="50%" stopColor="#9B72CF" />
            <stop offset="100%" stopColor="#FF7769" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="5" fill="url(#geminiGrad)" />
        <path d="M12 4C12 8.418 8.418 12 4 12C8.418 12 12 15.582 12 20C12 15.582 15.582 12 20 12C15.582 12 12 8.418 12 4Z" fill="white" />
      </svg>
    );
  }

  // Vector DB / Pinecone
  if (normName.includes('vector') || normName.includes('pinecone')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#000000" />
        <circle cx="7" cy="7" r="2.5" fill="#10B981" />
        <circle cx="17" cy="7" r="2.5" fill="#6366F1" />
        <circle cx="12" cy="17" r="2.5" fill="#F43F5E" />
        <line x1="7" y1="7" x2="17" y2="7" stroke="#64748B" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="7" y1="7" x2="12" y2="17" stroke="#64748B" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="17" y1="7" x2="12" y2="17" stroke="#64748B" strokeWidth="1.2" strokeDasharray="2 2" />
      </svg>
    );
  }

  // Testing (Jest, Vitest, Playwright)
  if (normName.includes('test') || normName.includes('vitest') || normName.includes('jest') || normName.includes('playwright')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#729B1B" />
        <path d="M12 5L18 8.5V15.5L12 19L6 15.5V8.5L12 5Z" stroke="white" strokeWidth="1.8" fill="none" />
        <path d="M9.5 12L11 13.5L14.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Git / GitHub / Trunk
  if (normName.includes('git')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F05032" />
        <path d="M19 11.5L12.5 5C12.1 4.6 11.5 4.6 11.1 5L10.3 5.8L12 7.5C12.6 7.3 13.3 7.5 13.7 8C14.2 8.5 14.3 9.2 14.1 9.8L15.8 11.5C16.4 11.3 17.1 11.4 17.6 11.9C18.2 12.5 18.2 13.5 17.6 14.1C17 14.7 16 14.7 15.4 14.1C15 13.7 14.8 13.1 14.9 12.5L13.3 10.9V14.6C13.5 14.8 13.7 15.1 13.7 15.5C13.7 16.3 13 17 12.2 17C11.4 17 10.7 16.3 10.7 15.5C10.7 14.9 11.1 14.4 11.6 14.2V9.8L9.8 11.6C9.6 12.1 9.1 12.5 8.5 12.5C7.7 12.5 7 11.8 7 11C7 10.4 7.4 9.9 7.9 9.7L11.1 6.5L5 12.6C4.6 13 4.6 13.6 5 14L11.5 20.5C11.9 20.9 12.5 20.9 12.9 20.5L19 14.4C19.4 14 19.4 13.4 19 13L19 11.5Z" fill="white" />
      </svg>
    );
  }

  // System Design / Architecture
  if (normName.includes('system') || normName.includes('architecture') || normName.includes('design')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#6366F1" />
        <rect x="5" y="5" width="5" height="5" rx="1" stroke="white" strokeWidth="1.5" />
        <rect x="14" y="5" width="5" height="5" rx="1" stroke="white" strokeWidth="1.5" />
        <rect x="9.5" y="14" width="5" height="5" rx="1" stroke="white" strokeWidth="1.5" />
        <path d="M7.5 10V12H16.5V10M12 12V14" stroke="white" strokeWidth="1.5" />
      </svg>
    );
  }

  // State Management (Zustand, Redux)
  if (normName.includes('state') || normName.includes('redux') || normName.includes('zustand')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#764ABC" />
        <circle cx="12" cy="12" r="3" fill="white" />
        <ellipse cx="12" cy="12" rx="7" ry="3" stroke="white" strokeWidth="1.2" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="7" ry="3" stroke="white" strokeWidth="1.2" transform="rotate(-30 12 12)" />
      </svg>
    );
  }

  // Web Performance / Accessibility (a11y)
  if (normName.includes('performance') || normName.includes('accessibility') || normName.includes('a11y')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#10B981" />
        <circle cx="12" cy="7" r="2.5" fill="white" />
        <path d="M5 11H19M12 11V20M9 20L12 15L15 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Monitoring / Datadog
  if (normName.includes('monitoring') || normName.includes('datadog') || normName.includes('observability')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#632CA6" />
        <path d="M6 18L10 12L14 15L18 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="8" r="1.5" fill="#F43F5E" />
      </svg>
    );
  }

  // Python
  if (normName.includes('python')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3776AB" />
        <path d="M11.5 6H13C14.5 6 15.5 7 15.5 8.5V10H10V11H17C18 11 19 12 19 13.5V15C19 16.5 18 17.5 16.5 17.5H15V16C15 14.5 14 13.5 12.5 13.5H10C8.5 13.5 7.5 12.5 7.5 11V9.5C7.5 8 8.5 7 10 7H11.5V6Z" fill="#FFD43B" />
        <circle cx="10.5" cy="8.5" r="1" fill="#3776AB" />
      </svg>
    );
  }

  // Default fallback badge with nice typography
  const initials = name.slice(0, 2).toUpperCase();
  return (
    <div className={`flex items-center justify-center rounded-lg bg-[#B9861F] text-white font-mono font-bold text-xs shadow-xs ${className}`}>
      {initials}
    </div>
  );
};
