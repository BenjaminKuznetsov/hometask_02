import express, { Request, Response } from "express"
import { blogsRepository } from "./blogsRepository_mongo"
import { BlogInputModel, BlogViewModel } from "./blogModels"
import { ApiErrorType, RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from "../../types"
import { authMiddleware } from "../../middleware/auth"
import { blogValidators } from "./blogValidators"
import { HttpStatusCodes } from "../../lib/httpStatusCodes"
import { handleErrorsMiddleware } from "../../middleware/handleErrors"

export const blogsRouter = express.Router()

blogsRouter.get("/", async (_req: Request, res: Response<BlogViewModel[]>) => {
    const foundBlogs: BlogViewModel[] = await blogsRepository.getAllBlogs()
    res.status(HttpStatusCodes.OK).json(foundBlogs)
})

blogsRouter.get("/:id", async (req: RequestWithParams<{ id: string }>, res: Response<BlogViewModel>) => {
    const foundBlog = await blogsRepository.getBlogById(req.params.id)
    if (!foundBlog) {
        res.sendStatus(HttpStatusCodes.NotFound)
    } else {
        res.status(HttpStatusCodes.OK).json(foundBlog)
    }
})

blogsRouter.post("/",
    authMiddleware,
    ...blogValidators,
    handleErrorsMiddleware,
    async (req: RequestWithBody<BlogInputModel>, res: Response<BlogViewModel | ApiErrorType>) => {
        const createdBlog = await blogsRepository.createBlog(req.body)
        res.status(HttpStatusCodes.Created).json(createdBlog)
    })

blogsRouter.put("/:id",
    authMiddleware,
    ...blogValidators,
    handleErrorsMiddleware,
    async (req: RequestWithParamsAndBody<{ id: string }, BlogInputModel>,
           res: Response<BlogViewModel | ApiErrorType>) => {
        const updatedBlog = await blogsRepository.updateBlog(req.params.id, req.body)
        if (!updatedBlog) {
            res.sendStatus(HttpStatusCodes.NotFound)
            return
        }
        res.sendStatus(HttpStatusCodes.NoContent)
    })

blogsRouter.delete("/:id",
    authMiddleware,
    async (req: RequestWithParams<{ id: string }>, res: Response) => {
        const deletedBlog = await blogsRepository.deleteBlog(req.params.id)
        if (!deletedBlog) {
            res.sendStatus(HttpStatusCodes.NotFound)
            return
        }
        res.sendStatus(HttpStatusCodes.NoContent)
    })
