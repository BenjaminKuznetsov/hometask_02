import express, { Request, Response } from "express"
import { videosRouter } from "./features/video-router"
import { VideoResolutions, VideoType } from "./types"
import { HttpStatusCodes } from "../lib/httpStatusCodes"
import { PATHS } from "../lib/paths"
export const app = express()

export const db: { videos: VideoType[] } = {
}

app.use(express.json())
app.use(PATHS.VIDEOS, videosRouter)

app.get(PATHS.HOME, (req: Request, res: Response) => {
    let helloPhrase = "Hometask 01, V1"
    res.send(helloPhrase)
})

