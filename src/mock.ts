import { PostInputModel } from "./features/posts/postModels"

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

export const validPosts: PostInputModel[] = [
  {
    title: "The Rise of AI",
    shortDescription: "How AI is transforming the way we build software",
    content:
      "Artificial Intelligence is rapidly changing the landscape of software development, from automated code generation to predictive algorithms...",
    blogId: "1",
  },
  {
    title: "Top 10 Tech Trends",
    shortDescription: "A look at the most impactful technologies in 2024",
    content:
      "As we move into 2024, several technologies are expected to reshape the industry, including AI, blockchain, and quantum computing...",
    blogId: "1",
  },
  {
    title: "Responsive Web Design",
    shortDescription: "Creating a responsive design that adapts to any device",
    content:
      "In today’s world, it’s crucial that websites are fully responsive, ensuring a seamless experience across devices of all sizes...",
    blogId: "2",
  },
  {
    title: "Optimize CSS",
    shortDescription: "Tips to improve the performance of your stylesheets",
    content:
      "Optimizing your CSS can make a significant difference in load times and overall user experience. Let’s explore some practical tips to achieve this...",
    blogId: "2",
  },
  {
    title: "Modern Frontend Tooling",
    shortDescription: "An overview of the best frontend tools for 2024",
    content:
      "As the web evolves, so do the tools for frontend development. From Webpack to Vite, here’s what you need to know...",
    blogId: "3",
  },
  {
    title: "The Rise of AI in Software Development",
    shortDescription: "How AI is transforming the way we build software",
    content:
      "Artificial Intelligence is rapidly changing the landscape of software development, from automated code generation to predictive algorithms...",
    blogId: "1",
  },
  {
    title: "Top 10 Tech Trends to Watch in 2024",
    shortDescription: "A look at the most impactful technologies in 2024",
    content:
      "As we move into 2024, several technologies are expected to reshape the industry, including AI, blockchain, and quantum computing...",
    blogId: "1",
  },
  {
    title: "Best Practices for Responsive Web Design",
    shortDescription: "Creating a responsive design that adapts to any device",
    content:
      "In today’s world, it’s crucial that websites are fully responsive, ensuring a seamless experience across devices of all sizes...",
    blogId: "2",
  },
  {
    title: "How to Optimize CSS for Better Performance",
    shortDescription: "Tips to improve the performance of your stylesheets",
    content:
      "Optimizing your CSS can make a significant difference in load times and overall user experience. Let’s explore some practical tips to achieve this...",
    blogId: "2",
  },
  {
    title: "Modern Frontend Tooling: What You Should Know",
    shortDescription: "An overview of the best frontend tools for 2024",
    content:
      "As the web evolves, so do the tools for frontend development. From Webpack to Vite, here’s what you need to know...",
    blogId: "2",
  },
  {
    title: "Building Scalable Backend Systems with Node.js",
    shortDescription: "Key strategies for scaling Node.js applications",
    content:
      "Scaling backend systems requires careful architecture planning. Here’s how to effectively scale Node.js applications...",
    blogId: "3",
  },
  {
    title: "A Deep Dive into Microservices Architecture",
    shortDescription: "Understanding the benefits and challenges of microservices",
    content:
      "Microservices have become a popular approach to backend development. This post explores the advantages and challenges of using this architecture...",
    blogId: "3",
  },
  {
    title: "NoSQL vs SQL: Which One Should You Choose?",
    shortDescription: "Comparing the pros and cons of NoSQL and SQL databases",
    content:
      "Choosing between NoSQL and SQL can be tricky. In this post, we discuss the strengths and weaknesses of both...",
    blogId: "3",
  },
  {
    title: "Top DevOps Tools for 2024",
    shortDescription: "The best tools for automating your DevOps pipeline",
    content:
      "With the increasing complexity of software, automation has become a key factor in success. Here are the top tools to enhance your DevOps pipeline...",
    blogId: "4",
  },
  {
    title: "CI/CD Best Practices for Rapid Deployment",
    shortDescription: "Implementing CI/CD for faster, more reliable deployments",
    content:
      "Continuous Integration and Continuous Deployment are critical for modern software teams. This guide covers the best practices for implementing CI/CD...",
    blogId: "4",
  },
  {
    title: "Monitoring and Logging in DevOps",
    shortDescription: "Why monitoring is essential for DevOps success",
    content:
      "Effective monitoring and logging are the backbones of any successful DevOps strategy. Learn how to set up robust monitoring in your pipeline...",
    blogId: "4",
  },
  {
    title: "Why TypeScript is Taking Over JavaScript",
    shortDescription: "Exploring the advantages of TypeScript over JavaScript",
    content:
      "TypeScript has quickly gained popularity for its ability to catch errors early and provide better tooling. Let’s explore why more developers are adopting it...",
    blogId: "5",
  },
  {
    title: "Advanced TypeScript Features You Should Know",
    shortDescription: "A look at some powerful TypeScript features",
    content:
      "TypeScript offers a range of advanced features that can help you write more robust code. In this post, we cover some of the key features...",
    blogId: "5",
  },
  {
    title: "Using TypeScript with React: Best Practices",
    shortDescription: "How to effectively use TypeScript in React projects",
    content:
      "Integrating TypeScript into React projects can improve scalability and maintainability. Here’s how to make the most of this combination...",
    blogId: "5",
  },
  {
    title: "The Future of Web Development: What to Expect",
    shortDescription: "Predictions for the future of web development",
    content:
      "The web is constantly evolving. This post discusses key trends that are shaping the future of web development, including WebAssembly and serverless architectures...",
    blogId: "1",
  },
  {
    title: "Creating Efficient Build Pipelines with Webpack",
    shortDescription: "Optimize your build pipeline with Webpack",
    content:
      "Webpack is a powerful tool for bundling your JavaScript applications. This post explores how to set up efficient build pipelines for faster development...",
    blogId: "2",
  },
  {
    title: "Building a REST API with Node.js and Express",
    shortDescription: "A step-by-step guide to building a RESTful API",
    content:
      "REST APIs are fundamental for modern applications. This tutorial walks you through building a REST API using Node.js and Express...",
    blogId: "3",
  },
  {
    title: "Automating Infrastructure with Terraform",
    shortDescription: "How Terraform can simplify your infrastructure management",
    content:
      "Managing infrastructure manually can be tedious. Learn how to automate your infrastructure using Terraform in a DevOps context...",
    blogId: "4",
  },
  {
    title: "How TypeScript Helps Prevent Bugs in Large Projects",
    shortDescription: "Why TypeScript is perfect for large-scale applications",
    content:
      "As your project grows, it becomes harder to manage potential bugs. This post explains how TypeScript helps maintain code quality in large projects...",
    blogId: "5",
  },
]

export const invalidPosts = [
  {
    shortDescription: "How to",
    content: "This guide shows you how to create an efficient build pipeline with Webpack",
    blogId: "1",
  },
  {
    title: "",
    shortDescription: "",
    content:
      "This tutorial walks you through building a full-stack application using Node.js and Express. This tutorial walks you through building a full-stack application using Node.js and Express. This tutorial walks you through building a full-stack application using Node.js and Express. This tutorial walks you through building a full-stack application using Node.js and Express. This tutorial walks you through building a full-stack application using Node.js and Express. This tutorial walks you through building a full-stack application using Node.js and Express. This tutorial walks you through building a full-stack application using Node.js and Express. This tutorial walks you through building a full-stack application using Node.js and Express. This tutorial walks you through building a full-stack application using Node.js and Express. This tutorial walks you through building a full-stack application using Node.js and Express. This tutorial walks you through building a full-stack application using Node.js and Express. This tutorial walks you through building a full-stack application using Node.js and Express. This tutorial walks you through building a full-stack application using Node.js and Express.",
  },
  {
    title: "Automating infrastructure with Terraform",
    shortDescription: "Ho",
    content: "Learn how to automate your infrastructure using Terraform in a DevOps context",
    blogId: "3",
  },
  {
    title: "How TypeScript",
    shortDescription:
      "Why This post explains how TypeScript helps maintain code quality in large projects This post explains how TypeScript helps maintain code quality in large projects",
    content: "This post explains how TypeScript helps maintain code quality in large projects",
    blogId: "4",
  },
]
