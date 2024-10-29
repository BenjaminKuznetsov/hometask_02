import { Collection, MongoClient } from "mongodb"
import { BlogDBModel } from "../features/blog/blogModels"
import { PostDBModel } from "../features/posts/postModels"
import { MongoMemoryServer } from "mongodb-memory-server"

export let blogsCollection: Collection<BlogDBModel>
export let postsCollection: Collection<PostDBModel>

export async function runDb() {
    const mongoUrl = process.env.MONGO_URL || "mongodb://0.0.0.0:27017"
    const dbName = process.env.DB_NAME || "test"

    const client = new MongoClient(mongoUrl)
    const db = client.db(dbName)

    blogsCollection = db.collection<BlogDBModel>("blogs")
    postsCollection = db.collection<PostDBModel>("posts")

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect()
        // Send a ping to confirm a successful connection
        await client.db(dbName).command({ ping: 1 })
        console.log("Successfully connected to MongoDB")
        return true
    } catch (error) {
        // Ensures that the client will close when you finish/error
        console.error(error)
        await client.close()
        return false
    }
}

export async function runTestDb() {
    const server = await MongoMemoryServer.create()
    const url = server.getUri()
    const client = await MongoClient.connect(url)
    const db = client.db()

    blogsCollection = db.collection<BlogDBModel>("blogs")
    postsCollection = db.collection<PostDBModel>("posts")

    return {
        server,
        client,
    }
}