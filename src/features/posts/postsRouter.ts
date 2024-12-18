import express, { Request, Response } from "express"
import { PostInputModel, PostViewModel } from "./postModels"
import { postsRepository } from "./postsRepository_mongo"
import { ApiErrorType, RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from "../../types"
import { authMiddleware } from "../../middleware/auth"
import { postValidators } from "./postValidators"
import { HttpStatusCodes } from "../../lib/httpStatusCodes"
import { handleErrorsMiddleware } from "../../middleware/handleErrors"

export const postsRouter = express.Router()

postsRouter.get("/",
    async (_req: Request, res: Response<PostViewModel[]>) => {
        const foundPosts: PostViewModel[] = await postsRepository.getAllPosts()
        res.status(HttpStatusCodes.OK).json(foundPosts)
    })

postsRouter.get("/:id",
    async (req: RequestWithParams<{ id: string }>, res: Response<PostViewModel>) => {
        const foundPost = await postsRepository.getPostById(req.params.id)
        if (!foundPost) {
            res.sendStatus(HttpStatusCodes.NotFound)
        } else {
            res.status(HttpStatusCodes.OK).json(foundPost)
        }
    })

postsRouter.post("/",
    authMiddleware,
    ...postValidators,
    handleErrorsMiddleware,
    async (req: RequestWithBody<PostInputModel>, res: Response<PostViewModel | ApiErrorType>) => {
        const createdPost = await postsRepository.createPost(req.body)
        res.status(HttpStatusCodes.Created).json(createdPost)
    },
)

postsRouter.put("/:id",
    authMiddleware,
    ...postValidators,
    handleErrorsMiddleware,
    async (req: RequestWithParamsAndBody<{ id: string }, PostInputModel>,
           res: Response<PostViewModel | ApiErrorType>) => {
        const updatedPost = await postsRepository.updatePost(req.params.id, req.body)
        if (!updatedPost) {
            res.sendStatus(HttpStatusCodes.NotFound)
            return
        }
        res.sendStatus(HttpStatusCodes.NoContent)
    },
)

postsRouter.delete("/:id",
    authMiddleware,
    async (req: RequestWithParams<{ id: string }>, res: Response) => {
        const deletedPost = await postsRepository.deletePost(req.params.id)
        if (!deletedPost) {
            res.sendStatus(HttpStatusCodes.NotFound)
            return
        }
        res.sendStatus(HttpStatusCodes.NoContent)
    })
