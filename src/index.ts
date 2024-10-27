import dotenv from 'dotenv'
dotenv.config()
import { app } from "./app"
import {runDb} from "./db/mongo";

const port = process.env.PORT || 3000


app.listen(port, async () => {
    const success = await runDb()
    if (!success) {
        process.exit(1)
    }

    console.log(`Example app listening on port ${port}`)
})
