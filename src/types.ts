import { Request } from "express"
import { BlogDBModel } from "./features/blog/blogModels"
import { PostDBModel } from "./features/posts/postModels"

export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestWithQuery<T> = Request<{}, {}, {}, T>
export type RequestWithParams<T> = Request<T>
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>

export type DB_Type = {
  blogs: BlogDBModel[]
  posts: PostDBModel[]
}

export type FieldErrorType = {
  message: string | null
  field: string | null
}

export type ApiErrorType = {
  errorsMessages: FieldErrorType[] | null
}
