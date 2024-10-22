import express, { Request, Response } from "express"
import { PostInputModel, PostViewModel } from "./postModels"
import { postsRepository } from "./postsRepository"
import { ApiErrorType, RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from "../../types"
import { authMiddleware } from "../../middleware/auth"
import { titleValidator, shortDescriptionValidator, contentValidator, blogIdValidator } from "./postValidators"
import { HttpStatusCodes } from "../../lib/httpStatusCodes"
import { handleErrorsMiddleware } from "../../middleware/handleErrors"

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
  handleErrorsMiddleware,
  (req: RequestWithBody<PostInputModel>, res: Response<PostViewModel | ApiErrorType>) => {
    const createdPost = postsRepository.createPost(req.body)
    res.status(HttpStatusCodes.Created).json(createdPost)
  }
)

postsRouter.put(
  "/:id",
  authMiddleware,
  titleValidator,
  shortDescriptionValidator,
  contentValidator,
  blogIdValidator,
  handleErrorsMiddleware,
  (req: RequestWithParamsAndBody<{ id: string }, PostInputModel>, res: Response<PostViewModel | ApiErrorType>) => {
    const updatedPost = postsRepository.updatePost(req.params.id, req.body)
    if (!updatedPost) {
      res.sendStatus(HttpStatusCodes.NotFound)
      return
    }
    res.sendStatus(HttpStatusCodes.NoContent)
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
