import { BlogDBModel } from "../blog/blogModels"
import { blogsRepository } from "../blog/blogsRepository_mongo"
import { PostDBModel, PostInputModel, PostViewModel } from "./postModels"
import { postsCollection } from "../../db/mongo"
import { ObjectId, WithId } from "mongodb"

// TODO: move to service
const mapper = (post: WithId<PostDBModel>): PostViewModel => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt,
    }
}

export const postsRepository = {
    getAllPosts: async (): Promise<PostViewModel[]> => {
        const foundPosts = await postsCollection.find().toArray()
        return foundPosts.map(mapper)
    },
    getPostById: async (id: string): Promise<PostViewModel | null> => {
        const _id = new ObjectId(id)
        const foundPost = await postsCollection.findOne({ _id })
        return foundPost ? mapper(foundPost) : null
    },
    createPost: async (input: PostInputModel): Promise<PostViewModel> => {
        // TODO: move searching blog to service
        const blog = await blogsRepository.getBlogById(input.blogId) as BlogDBModel
        const newPost: PostDBModel = {
            title: input.title,
            shortDescription: input.shortDescription,
            content: input.content,
            blogId: input.blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        }
        const result = await postsCollection.insertOne({ ...newPost })
        return {
            id: result.insertedId.toString(),
            ...newPost,
        }
    },
    updatePost: async (id: string, input_post: PostInputModel): Promise<boolean> => {
        // TODO: move searching blog to service
        const blog = await blogsRepository.getBlogById(input_post.blogId) as BlogDBModel
        const _id = new ObjectId(id)
        const result = await postsCollection.updateOne({ _id }, { $set: { ...input_post, blogName: blog.name } })
        return !!result.matchedCount
    },
    deletePost: async (id: string): Promise<boolean> => {
        const _id = new ObjectId(id)
        const result = await postsCollection.deleteOne({ _id })
        return !!result.deletedCount
    },
}
