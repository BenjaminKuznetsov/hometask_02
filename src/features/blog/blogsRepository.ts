import { db } from "../../db"
import { BlogDBModel, BlogInputModel, BlogViewModel } from "./blogModels"

const mapper = (blog: BlogViewModel): BlogDBModel => {
  return {
    id: blog.id,
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
  }
}

export const blogsRepository = {
  getAllBlogs: () => {
    const foundBlogs = db.blogs.map(mapper)
    return foundBlogs
  },
  getBlogById: (id: string) => {
    const foundBlog = db.blogs.find((blog) => blog.id === id)
    return foundBlog ? mapper(foundBlog) : null
  },
  createBlog: (input: BlogInputModel) => {
    const lastBlogId = db.blogs.at(-1)?.id
    const id: string = lastBlogId ? (Number(lastBlogId) + 1).toString() : "1"
    const newBlog: BlogDBModel = {
      id: id,
      name: input.name,
      description: input.description,
      websiteUrl: input.websiteUrl,
    }
    db.blogs.push(newBlog)
    return newBlog
  },
  updateBlog: (id: string, input: BlogInputModel) => {
    const foundBlog = db.blogs.find((blog) => blog.id === id)
    if (!foundBlog) return null
    const updatedBlog: BlogDBModel = {
      id: foundBlog.id,
      name: input.name,
      description: input.description,
      websiteUrl: input.websiteUrl,
    }
    db.blogs = db.blogs.map((blog) => (blog.id === id ? updatedBlog : blog))
    return updatedBlog
  },
  deleteBlog: (id: string) => {
    const foundBlog = db.blogs.find((blog) => blog.id === id)
    if (!foundBlog) return null
    db.blogs = db.blogs.filter((blog) => blog.id !== id)
    return foundBlog
  },
}
