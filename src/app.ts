import express, { Request, Response } from "express"
import { blogsRouter } from "./features/blog/blogsRouter"
import { validBlogs, validPosts } from "./mock"
import { postsRouter } from "./features/posts/postsRouter"
import { db } from "./db"
import { PATHS } from "./lib/paths"
import { HttpStatusCodes } from "./lib/httpStatusCodes"
import { DB_Collectons, RequestWithBody, RequestWithQuery } from "./types"
import { BlogDBModel } from "./features/blog/blogModels"
import { PostDBModel } from "./features/posts/postModels"
export const app = express()

app.use(express.json())
app.use(PATHS.BLOGS, blogsRouter)
app.use(PATHS.POSTS, postsRouter)

app.get(PATHS.HOME, (req: Request, res: Response) => {
  let helloPhrase = "Hometask 02, V1"
  res.send(helloPhrase)
})

app.delete(PATHS.TESTING, (req: RequestWithQuery<{ collectionsToDelete: string | undefined }>, res: Response) => {
  const collectionsToDelete = req.query.collectionsToDelete?.split(",") as DB_Collectons[] | undefined
  if (collectionsToDelete) {
    for (const collection of collectionsToDelete) {
      db[collection] = []
    }
  } else {
    db.blogs = []
    db.posts = []
  }

  res.sendStatus(HttpStatusCodes.NoContent)
})

app.post(PATHS.TESTING, (req: RequestWithBody<{ collectionsToFill: DB_Collectons[] | undefined }>, res: Response) => {
  const collectionsToFill = req.body.collectionsToFill as DB_Collectons[] | undefined

  const seedBlogs = () => validBlogs.map((it, i) => ({ ...it, id: (i + 1).toString() }))
  const seedPosts = () =>
    validPosts.map((it, i) => {
      const blog = db.blogs.find((blog) => blog.id === it.blogId) as BlogDBModel
      const newPost: PostDBModel = {
        id: (i + 1).toString(),
        title: it.title,
        shortDescription: it.shortDescription,
        content: it.content,
        blogId: it.blogId,
        blogName: blog.name,
      }
      return newPost
    })

  if (collectionsToFill) {
    if (collectionsToFill.includes("blogs")) {
      db.blogs = seedBlogs()
    }
    if (collectionsToFill.includes("posts")) {
      db.posts = seedPosts()
    }
  } else {
    db.blogs = seedBlogs()
    db.posts = seedPosts()
  }
  res.sendStatus(HttpStatusCodes.NoContent)
})
