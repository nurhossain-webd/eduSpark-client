export interface BlogSection {
  heading: string;
  paragraphs: string[];
  points?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
  image: string;
  featured?: boolean;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "learn-typescript-effectively",
    title: "How to Learn TypeScript Effectively as a Beginner",
    excerpt:
      "Understand the most important TypeScript concepts and follow a practical learning path without becoming overwhelmed.",
    category: "Web Development",
    author: "Sarah Anderson",
    date: "July 10, 2026",
    readingTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    sections: [
      {
        heading: "Start with JavaScript fundamentals",
        paragraphs: [
          "TypeScript builds on JavaScript, so a clear understanding of variables, functions, arrays, objects, modules, and asynchronous programming makes TypeScript much easier to learn.",
          "You do not need to master every JavaScript topic first, but you should be comfortable reading and writing basic JavaScript code.",
        ],
      },
      {
        heading: "Learn the core TypeScript concepts",
        paragraphs: [
          "Begin with primitive types, arrays, objects, function parameters, return types, interfaces, type aliases, unions, and optional properties.",
          "After understanding these basics, move gradually toward generics, utility types, narrowing, and reusable application types.",
        ],
        points: [
          "Primitive and object types",
          "Interfaces and type aliases",
          "Union and literal types",
          "Function parameter and return types",
          "Generics and utility types",
        ],
      },
      {
        heading: "Practice through small projects",
        paragraphs: [
          "The fastest way to become comfortable with TypeScript is to use it in practical projects. Convert a small JavaScript application or build a simple task manager, course listing, or dashboard.",
          "Focus on understanding why TypeScript reports an error rather than immediately using any to silence it.",
        ],
      },
    ],
  },
  {
    id: "build-strong-portfolio",
    title: "Five Ways to Build a Strong Developer Portfolio",
    excerpt:
      "Create a professional portfolio that demonstrates your skills through meaningful projects, clear case studies, and clean presentation.",
    category: "Career",
    author: "Michael Chen",
    date: "July 7, 2026",
    readingTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "Choose quality over quantity",
        paragraphs: [
          "A few complete and polished projects are more valuable than many unfinished applications. Select projects that clearly demonstrate different technical skills.",
        ],
      },
      {
        heading: "Explain your problem-solving process",
        paragraphs: [
          "For every project, describe the problem, your solution, the technologies you selected, and the challenges you solved.",
        ],
        points: [
          "Project purpose",
          "Technology choices",
          "Main features",
          "Technical challenges",
          "Future improvements",
        ],
      },
      {
        heading: "Make every project easy to review",
        paragraphs: [
          "Include a working live link, a clear GitHub repository, responsive screenshots, and simple instructions for testing the application.",
        ],
      },
    ],
  },
  {
    id: "ui-design-principles",
    title: "Essential UI Design Principles for Modern Websites",
    excerpt:
      "Improve usability and visual consistency by applying hierarchy, spacing, contrast, alignment, and responsive design principles.",
    category: "UI/UX Design",
    author: "Emma Wilson",
    date: "July 3, 2026",
    readingTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "Create a clear visual hierarchy",
        paragraphs: [
          "Users should immediately understand which information is most important. Use heading size, font weight, spacing, and contrast to guide attention.",
        ],
      },
      {
        heading: "Use consistent spacing and components",
        paragraphs: [
          "Consistent padding, card sizes, border radiuses, and button styles make an interface feel professional and predictable.",
        ],
        points: [
          "Use a defined spacing scale",
          "Keep card layouts consistent",
          "Use reusable components",
          "Limit unnecessary visual styles",
        ],
      },
      {
        heading: "Design responsively from the beginning",
        paragraphs: [
          "Check how every component behaves on mobile, tablet, and desktop instead of treating mobile design as a final adjustment.",
        ],
      },
    ],
  },
  {
    id: "consistent-online-learning",
    title: "How to Stay Consistent While Learning Online",
    excerpt:
      "Use realistic goals, focused study sessions, progress tracking, and active practice to maintain a sustainable learning routine.",
    category: "Learning Tips",
    author: "Aisha Rahman",
    date: "June 28, 2026",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "Set realistic weekly goals",
        paragraphs: [
          "Choose goals that fit your available time. Completing three focused sessions every week is better than creating an unrealistic daily plan.",
        ],
      },
      {
        heading: "Combine learning with active practice",
        paragraphs: [
          "Watching lessons alone is not enough. Write code, solve exercises, summarize concepts, and build small features after each topic.",
        ],
        points: [
          "Take short notes",
          "Practice immediately",
          "Review mistakes",
          "Track completed topics",
        ],
      },
      {
        heading: "Protect your study time",
        paragraphs: [
          "Choose a regular study period, remove distractions, and begin with a small task so that starting feels easier.",
        ],
      },
    ],
  },
  {
    id: "data-science-roadmap",
    title: "A Practical Data Science Roadmap for Beginners",
    excerpt:
      "Explore a structured path covering Python, statistics, data analysis, visualization, machine learning, and portfolio projects.",
    category: "Data Science",
    author: "Daniel Carter",
    date: "June 23, 2026",
    readingTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "Build a foundation in Python",
        paragraphs: [
          "Learn Python syntax, functions, collections, file handling, and object-oriented basics before moving into data libraries.",
        ],
      },
      {
        heading: "Study statistics and data analysis",
        paragraphs: [
          "Develop a practical understanding of averages, distributions, variance, probability, correlation, and hypothesis testing.",
        ],
        points: [
          "Python fundamentals",
          "NumPy and pandas",
          "Data visualization",
          "Statistics and probability",
          "Machine-learning fundamentals",
        ],
      },
      {
        heading: "Create portfolio projects",
        paragraphs: [
          "Use real datasets to clean data, explore patterns, build visualizations, and explain your findings clearly.",
        ],
      },
    ],
  },
  {
    id: "cybersecurity-habits",
    title: "Simple Cybersecurity Habits Every Student Should Follow",
    excerpt:
      "Protect your accounts and devices by using secure passwords, multifactor authentication, updates, and safe browsing habits.",
    category: "Cyber Security",
    author: "David Miller",
    date: "June 18, 2026",
    readingTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "Use unique and secure passwords",
        paragraphs: [
          "Avoid reusing the same password across different services. A password manager can generate and store strong passwords safely.",
        ],
      },
      {
        heading: "Enable multifactor authentication",
        paragraphs: [
          "Multifactor authentication adds another layer of protection even when a password becomes exposed.",
        ],
        points: [
          "Keep devices updated",
          "Check links before opening them",
          "Avoid unknown attachments",
          "Back up important files",
          "Review account activity",
        ],
      },
      {
        heading: "Recognize suspicious messages",
        paragraphs: [
          "Be careful with messages that create urgency, ask for passwords, or direct you to unfamiliar websites.",
        ],
      },
    ],
  },
];

export function getBlogPostById(
  postId: string,
): BlogPost | undefined {
  return blogPosts.find(
    (post: BlogPost) => post.id === postId,
  );
}