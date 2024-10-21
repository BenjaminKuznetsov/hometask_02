import express, { Request, Response } from "express"
import { PostInputModel, PostViewModel } from "./postModels"
import { postsRepository } from "./postsRepository"
import { ApiErrorType, RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from "../../types"
import { authMiddleware } from "../../middleware/auth"
import { titleValidator, shortDescriptionValidator, contentValidator, blogIdValidator } from "./postValidators"
import { validationResult } from "express-validator"
import { formatErrors } from "../../lib/helpers"
import { HttpStatusCodes } from "../../lib/httpStatusCodes"

export const postsRouter = express.Router()

postsRouter.get("/", (req: Request, res: Response<PostViewModel[]>) => {
  const foundPosts: PostViewModel[] = postsRepository.getAllPosts()
  res.status(HttpStatusCodes.OK).json(foundPosts)
})

postsRouter.get("/:id", (req: RequestWithParams<{ id: string }>, res: Response<PostViewModel>) => {
  const foundPost = postsRepository.getPostById(req.params.id)
  if (!foundPost) {
    res.sendStatus(HttpStatusCodes.NotFound)
  } else {
    res.status(HttpStatusCodes.OK).json(foundPost)
  }
})

postsRouter.post(
  "/",
  authMiddleware,
  titleValidator,
  shortDescriptionValidator,
  contentValidator,
  blogIdValidator,
  (req: RequestWithBody<PostInputModel>, res: Response<PostViewModel | ApiErrorType>) => {
    const errors = validationResult(req).array({ onlyFirstError: true })
    if (errors.length > 0) {
      res.status(HttpStatusCodes.BadRequest).json({ errorsMessages: errors.map(formatErrors) })
    } else {
      const createdPost = postsRepository.createPost(req.body)
      res.status(HttpStatusCodes.Created).json(createdPost)
    }
  }
)

postsRouter.put(
  "/:id",
  authMiddleware,
  titleValidator,
  shortDescriptionValidator,
  contentValidator,
  blogIdValidator,
  (req: RequestWithParamsAndBody<{ id: string }, PostInputModel>, res: Response<PostViewModel | ApiErrorType>) => {
    const errors = validationResult(req).array({ onlyFirstError: true })
    if (errors.length > 0) {
      res.status(HttpStatusCodes.BadRequest).json({ errorsMessages: errors.map(formatErrors) })
      return
    }
    const updatedPost = postsRepository.updatePost(req.params.id, req.body)
    if (!updatedPost) {
      res.sendStatus(HttpStatusCodes.NotFound)
      return
    }
    res.status(HttpStatusCodes.NoContent)
  }
)

postsRouter.delete("/:id", authMiddleware, (req: RequestWithParams<{ id: string }>, res: Response) => {
  const deletedPost = postsRepository.deletePost(req.params.id)
  if (!deletedPost) {
    res.sendStatus(HttpStatusCodes.NotFound)
    return
  }
  res.sendStatus(HttpStatusCodes.NoContent)
})
