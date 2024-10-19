import express, { Request, Response } from "express"
import { HttpStatusCodes } from "../../../lib/httpStatusCodes"
import { PostViewModel } from "./postModels"
import { postsRepository } from "./postsRepository"
import { RequestWithParams } from "../../types"

export const postsRouter = express.Router()

postsRouter.get("/", (req: Request, res: Response<PostViewModel[]>) => {
  const foundPosts: PostViewModel[] = postsRepository.getAllPosts()
  res.status(HttpStatusCodes.OK).json(foundPosts)
})

postsRouter.get("/:id", (req: RequestWithParams<{id: string}>, res: Response<PostViewModel>) => {
  const foundPost = postsRepository.getPostById(req.params.id)
  if (!foundPost) {
    res.sendStatus(HttpStatusCodes.NotFound)
  } else {
    res.status(HttpStatusCodes.OK).json(foundPost)
  }
})
