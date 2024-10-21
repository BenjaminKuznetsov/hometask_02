import express, { Request, Response } from "express"
import { blogsRouter } from "./features/blog/blogsRouter"
import { validBlogs } from "./mock"
import { postsRouter } from "./features/posts/postsRouter"
import { db } from "./db"
import { PATHS } from "./lib/paths"
import { HttpStatusCodes } from "./lib/httpStatusCodes"
export const app = express()

app.use(express.json())
app.use(PATHS.BLOGS, blogsRouter)
app.use(PATHS.POSTS, postsRouter)

app.get(PATHS.HOME, (req: Request, res: Response) => {
  let helloPhrase = "Hometask 02, V1"
  res.send(helloPhrase)
})

app.delete(PATHS.TESTING, (req: Request, res: Response) => {
  db.blogs = []
  res.sendStatus(HttpStatusCodes.NoContent)
})

app.patch(PATHS.TESTING, (req: Request, res: Response) => {
  db.blogs = validBlogs.map((it, i) => ({ ...it, id: (i + 1).toString() }))
  res.sendStatus(HttpStatusCodes.NoContent)
})
