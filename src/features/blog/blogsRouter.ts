import express, { Request, Response } from "express"
import { blogsRepository } from "./blogsRepository"
import { BlogViewModel } from "./blogModels"
import { HttpStatusCodes } from "../../../lib/httpStatusCodes"
import { RequestWithParams } from "../../types"

export const blogsRouter = express.Router()

const authorization = (req: Request, res: Response, next: () => void) => {
  const receivedToken = req.headers.authorization
  if (!receivedToken) {
    res.sendStatus(HttpStatusCodes.Unauthorized)
  }
  // const etalonToken =
}

blogsRouter.get("/", (req: Request, res: Response<BlogViewModel[]>) => {
  const foundBlogs: BlogViewModel[] = blogsRepository.getAllBlogs()
  res.status(HttpStatusCodes.OK).json(foundBlogs)
})

blogsRouter.get("/:id", (req: RequestWithParams<{ id: string }>, res: Response<BlogViewModel>) => {
  const foundBlog = blogsRepository.getBlogById(req.params.id)
  if (!foundBlog) {
    res.sendStatus(HttpStatusCodes.NotFound)
  } else {
    res.status(HttpStatusCodes.OK).json(foundBlog)
  }
})
