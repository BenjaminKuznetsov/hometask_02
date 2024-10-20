import { DB_Type } from "./types"

export const db: DB_Type = {
  blogs: [],
  posts: [],
}

export const validBlogs = [
  {
    name: "Tech Insights",
    description: "Latest trends in technology and software development",
    websiteUrl: "https://techinsights.com",
  },
  {
    name: "Dev Diaries",
    description: "Journey of a full-stack developer",
    websiteUrl: "https://devdiaries.com",
  },
  {
    name: "Code Breaker",
    description: "Breaking down complex code challenges",
    websiteUrl: "https://codebreaker.com",
  },
  {
    name: "UX Matters",
    description: "Exploring the importance of user experience",
    websiteUrl: "https://uxmatters.com",
  },
  {
    name: "Cloud Chronicles",
    description: "Deep dives into cloud computing and infrastructure",
    websiteUrl: "https://cloudchronicles.com",
  },
  {
    name: "AI Adventures",
    description: "Exploring AI and machine learning innovations",
    websiteUrl: "https://aiadventures.com",
  },
  {
    name: "Frontend Focus",
    description: "Tips and tricks for modern frontend development",
    websiteUrl: "https://frontendfocus.com",
  },
  {
    name: "Backend Builders",
    description: "Everything about building robust backend systems",
    websiteUrl: "https://backendbuilders.com",
  },
  {
    name: "DevOps Digest",
    description: "Best practices for DevOps and automation",
    websiteUrl: "https://devopsdigest.com",
  },
  {
    name: "React Roundup",
    description: "Insights and tutorials for React developers",
    websiteUrl: "https://reactroundup.com",
  },
  {
    name: "JavaScript Journal",
    description: "In-depth articles on JavaScript and its ecosystem",
    websiteUrl: "https://jsjournal.com",
  },
  {
    name: "Node Navigator",
    description: "All things Node.js, from basics to advanced topics",
    websiteUrl: "https://nodenavigator.com",
  },
  {
    name: "API Academy",
    description: "Designing and building APIs for modern applications",
    websiteUrl: "https://apiacademy.com",
  },
  {
    name: "CSS Secrets",
    description: "Advanced CSS techniques for web developers",
    websiteUrl: "https://csssecrets.com",
  },
  {
    name: "TypeScript Tribune",
    description: "Mastering TypeScript for scalable applications",
    websiteUrl: "https://typescripttribune.com",
  },
  {
    name: "Fullstack Fusion",
    description: "Combining frontend and backend development practices",
    websiteUrl: "https://fullstackfusion.com",
  },
  {
    name: "Material UI Mastery",
    description: "Harnessing the power of Material UI for UI/UX",
    websiteUrl: "https://materialuimastery.com",
  },
  {
    name: "Chakra Chronicles",
    description: "Building flexible interfaces with Chakra UI",
    websiteUrl: "https://chakrachronicles.com",
  },
  {
    name: "Docker Dispatch",
    description: "Efficient containerization with Docker",
    websiteUrl: "https://dockerdispatch.com",
  },
  {
    name: "MongoDB Matters",
    description: "Mastering NoSQL databases with MongoDB",
    websiteUrl: "https://mongodbmatters.com",
  },
]

export const invalidBlogs = [
  {
    name: "    ",
    description: "Best practices for DevOps and automation",
    websiteUrl: "https://devopsdigest.com",
  },
  {
    name: "DevOps Digest sgfdgds dsgdfsgdfsg dgdfsgfds",
    description: "",
    websiteUrl: "http://devopsdigest.com",
  },
  {
    name: "DevOps Digest",
    description:
      "Best practices for DevOps and automation. Articles on infrastructure as code, continuous integration and delivery, containers, serverless, and more. Tips and tools for automating your development workflow and increasing productivity. Best practices for DevOps and automation. Articles on infrastructure as code, continuous integration and delivery, containers, serverless, and more. Tips and tools for automating your development workflow and increasing productivity. Best practices for DevOps and automation. Articles on infrastructure as code, continuous integration and delivery, containers, serverless, and more. Tips and tools for automating your development workflow and increasing productivity. Best practices for DevOps and automation. Articles on infrastructure as code, continuous integration and delivery, containers, serverless, and more. Tips and tools for automating your development workflow and increasing productivity.Best practices for DevOps and automation..",
    websiteUrl: "",
  },
  {
    name: "De",
    description: "Best practices for DevOps and automation",
    websiteUrl:
      "http://invalid-url-DevOps and automation. Articles on infrastructure as code, continuous integration and delivery, containers, se",
  },
]
