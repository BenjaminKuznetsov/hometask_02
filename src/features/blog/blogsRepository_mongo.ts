import {BlogDBModel, BlogInputModel, BlogViewModel} from "./blogModels"
import {db} from "../../db/memory";

const mapper = (blog: BlogDBModel ): BlogViewModel  => {
  return {
    id: blog.id,
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
  }
}

export const blogsRepository = {
  getAllBlogs: async () : Promise<BlogViewModel[]> => {
    return db.blogs.map(mapper)
  },
  getBlogById: async (id: string): Promise<BlogViewModel | null> => {
    const foundBlog = db.blogs.find((blog) => blog.id === id)
    return foundBlog ? mapper(foundBlog) : null
  },
  createBlog: async (input: BlogInputModel): Promise<BlogViewModel> => {
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
  updateBlog: async (id: string, input: BlogInputModel): Promise<BlogViewModel | null> => {
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
  deleteBlog: async (id: string): Promise<BlogViewModel | null> => {
    const foundBlog = db.blogs.find((blog) => blog.id === id)
    if (!foundBlog) return null
    db.blogs = db.blogs.filter((blog) => blog.id !== id)
    return foundBlog
  },
}
