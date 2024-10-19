import express, { Request, Response } from "express"
import { PATHS } from "../lib/paths"
import {blogsRouter} from "./features/blogs-router";
export const app = express()



app.use(express.json())
app.use(PATHS.BLOGS, blogsRouter)

app.get(PATHS.HOME, (req: Request, res: Response) => {
    let helloPhrase = "Hometask 02, V1"
    res.send(helloPhrase)
})

