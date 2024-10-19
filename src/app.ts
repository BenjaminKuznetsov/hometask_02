import express, { Request, Response } from "express"
import { PATHS } from "../lib/paths"
import { HttpStatusCodes } from "../lib/httpStatusCodes"
import { blogsRouter } from "./features/blog/blogsRouter"
import { db } from "./db"
export const app = express()

app.use(express.json())
app.use(PATHS.BLOGS, blogsRouter)

app.get(PATHS.HOME, (req: Request, res: Response) => {
  let helloPhrase = "Hometask 02, V1"
  res.send(helloPhrase)
})

app.delete(PATHS.CLEAR_DB, (req: Request, res: Response) => {
  db.blogs = []
  res.sendStatus(HttpStatusCodes.NoContent)
})
