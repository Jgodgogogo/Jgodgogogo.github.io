interface Project {
  name: string
  description: string
  link: string
  video: string
  id: string
}

interface WorkExperience {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

interface BlogPost {
  title: string
  description: string
  link: string
  uid: string
}

interface SocialLink {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'JLR 2025 Hackthon',
    description: 'Placeholder for hackthon project',
    link: 'https://google.com',
    video: 'https://www.youtube.com/watch?v=B1TLhzmieVg',
    id: 'project1'
  },
  {
    name: 'Volvo One HMI OS',
    description: 'Placeholder for volvo cars project.',
    link: 'https://google.com',
    video: 'https://www.youtube.com/watch?v=O4-lKcGIiBw',
    id: 'project2'
  },
  {
    name: 'SVW Project Sample',
    description: 'Placeholder for SVW project experience.',
    link: 'https://youtube.com/',
    video: 'https://www.youtube.com/watch?v=O4-lKcGIiBw',
    id: 'project3'
  },
  {
    name: 'GM Project Sample',
    description: 'Placeholder for GM project experience.',
    link: 'https://youtube.com/',
    video: 'https://www.youtube.com/watch?v=O4-lKcGIiBw',
    id: 'project4'
  }
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'JLR China',
    title: 'Lead ADAS Design Engineer',
    start: '2024.12',
    end: 'Present',
    link: '/https://linkedin.com/',
    id: 'work1'
  },
  {
    company: 'Freelance',
    title: 'Design Engineer',
    start: '2022',
    end: '2024',
    link: 'https://ibelick.com',
    id: 'work2'
  },
  {
    company: 'Freelance',
    title: 'Front-end Developer',
    start: '2017',
    end: 'Present',
    link: 'https://ibelick.com',
    id: 'work3'
  }
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1'
  },
  {
    title: 'Why I left my job to start my own company',
    description: 'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2'
  },
  {
    title: 'What I learned from my first year of freelancing',
    description: 'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3'
  },
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4'
  }
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/ibelick'
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/ibelick'
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/ibelick'
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/ibelick'
  }
]

export const EMAIL = 'your@email.com'
