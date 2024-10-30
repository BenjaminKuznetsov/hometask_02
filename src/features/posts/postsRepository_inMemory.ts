// @ts-nocheck
import { BlogDBModel } from "../blog/blogModels"
import { blogsRepository } from "../blog/old.blogsRepository_memory"
import { PostInputModel, PostViewModel } from "./postModels"
import { db } from "../../db/memory"

const mapper = (post: PostViewModel): PostViewModel => {
    return {
        id: post.id,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
    }
}

export const postsRepository = {
    getAllPosts: async (): Promise<PostViewModel[]> => {
        return db.posts.map(mapper)
    },
    getPostById: async (id: string): Promise<PostViewModel | null> => {
        const foundPost = db.posts.find((post) => post.id === id)
        return foundPost ? mapper(foundPost) : null
    },
    createPost: async (post: PostInputModel): Promise<PostViewModel> => {
        const lastPostId = db.posts.at(-1)?.id
        const id: string = lastPostId ? (Number(lastPostId) + 1).toString() : "1"
        const blog = await blogsRepository.getBlogById(post.blogId) as BlogDBModel
        const newPost: PostViewModel = {
            id: id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: blog.name,
        }
        db.posts.push(newPost)
        return newPost
    },
    updatePost: async (id: string, post: PostInputModel): Promise<PostViewModel | null> => {
        const foundPost = db.posts.find((post) => post.id === id)
        if (!foundPost) return null
        const blog = await blogsRepository.getBlogById(post.blogId) as BlogDBModel
        const updatedPost: PostViewModel = {
            id: foundPost.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: blog.name,
        }
        db.posts = db.posts.map((post) => (post.id === id ? updatedPost : post))
        return updatedPost
    },
    deletePost: async (id: string): Promise<PostViewModel | null> => {
        const foundPost = db.posts.find((post) => post.id === id)
        if (!foundPost) return null
        db.posts = db.posts.filter((post) => post.id !== id)
        return foundPost
    },
}
