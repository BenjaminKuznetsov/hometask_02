import {MongoClient, ServerApiVersion} from "mongodb";
import {BlogDBModel} from "../features/blog/blogModels";
import {PostDBModel} from "../features/posts/postModels";

const mongoUrl = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
const dbName = process.env.MONGODB_NAME || 'test';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoUrl, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const db = client.db(dbName)

export const blogsCollection = db.collection<BlogDBModel>('blogs');
export const postsCollection = db.collection<PostDBModel>('posts');

export async function runDb() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db(dbName).command({ ping: 1 });
        console.log("Successfully connected to MongoDB");
        return true
    } catch (error) {
        // Ensures that the client will close when you finish/error
        console.error(error);
        await client.close();
        return false;
    }
}