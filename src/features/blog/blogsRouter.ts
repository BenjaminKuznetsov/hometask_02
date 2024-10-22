import express, { Request, Response } from "express"
import { blogsRepository } from "./blogsRepository"
import { BlogInputModel, BlogViewModel } from "./blogModels"
import { ApiErrorType, RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from "../../types"
import { authMiddleware } from "../../middleware/auth"
import { descriptionValidator, nameValidator, urlValidator } from "./blogsValidators"
import { HttpStatusCodes } from "../../lib/httpStatusCodes"
import { handleErrorsMiddleware } from "../../middleware/handleErrors"

export const blogsRouter = express.Router()

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

blogsRouter.post(
  "/",
  authMiddleware,
  nameValidator,
  descriptionValidator,
  urlValidator,
  handleErrorsMiddleware,
  (req: RequestWithBody<BlogInputModel>, res: Response<BlogViewModel | ApiErrorType>) => {
    const createdBlog = blogsRepository.createBlog(req.body)
    res.status(HttpStatusCodes.Created).json(createdBlog)
  }
)

blogsRouter.put(
  "/:id",
  authMiddleware,
  nameValidator,
  descriptionValidator,
  urlValidator,
  handleErrorsMiddleware,
  (req: RequestWithParamsAndBody<{ id: string }, BlogInputModel>, res: Response<BlogViewModel | ApiErrorType>) => {
    const updatedBlog = blogsRepository.updateBlog(req.params.id, req.body)
    if (!updatedBlog) {
      res.sendStatus(HttpStatusCodes.NotFound)
      return
    }
    res.sendStatus(HttpStatusCodes.NoContent)
  }
)

blogsRouter.delete("/:id", authMiddleware, (req: RequestWithParams<{ id: string }>, res: Response) => {
  const deletedBlog = blogsRepository.deleteBlog(req.params.id)
  if (!deletedBlog) {
    res.sendStatus(HttpStatusCodes.NotFound)
    return
  }
  res.sendStatus(HttpStatusCodes.NoContent)
})
