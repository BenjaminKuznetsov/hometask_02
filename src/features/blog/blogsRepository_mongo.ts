import { BlogDBModel, BlogInputModel, BlogViewModel } from "./blogModels"
import { blogsCollection } from "../../db/mongo"
import { ObjectId, WithId } from "mongodb"

// TODO: move to service
const mapper = (blog: WithId<BlogDBModel>): BlogViewModel => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
    }
}

export const blogsRepository = {
    getAllBlogs: async (): Promise<BlogViewModel[]> => {
        const foundBlogs = await blogsCollection.find().toArray()
        return foundBlogs.map(mapper)
    },
    getBlogById: async (id: string): Promise<BlogViewModel | null> => {
        const _id = new ObjectId(id)
        const foundBlog = await blogsCollection.findOne({ _id })
        return foundBlog ? mapper(foundBlog) : null
    },
    createBlog: async (input: BlogInputModel): Promise<BlogViewModel> => {
        const newBlog: BlogDBModel = {
            ...input,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }
        const result = await blogsCollection.insertOne({ ...newBlog })
        return {
            id: result.insertedId.toString(),
            ...newBlog,
        }
    },
    updateBlog: async (id: string, input: BlogInputModel): Promise<boolean> => {
        const _id = new ObjectId(id)
        const result = await blogsCollection.updateOne({ _id: _id }, { $set: input })
        return !!result.matchedCount
    },
    deleteBlog: async (id: string): Promise<boolean> => {
        const _id = new ObjectId(id)
        const result = await blogsCollection.deleteOne({ _id })
        return !!result.deletedCount
    },
}
