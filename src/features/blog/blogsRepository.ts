import { db } from "../../db"
import { BlogDBModel, BlogViewModel } from "./blogModels"

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
}
