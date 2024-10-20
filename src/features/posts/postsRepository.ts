import { db } from "../../db"
import { BlogDBModel } from "../blog/blogModels"
import { blogsRepository } from "../blog/blogsRepository"
import { PostDBModel, PostInputModel, PostViewModel } from "./postModels"

const mapper = (post: PostDBModel): PostViewModel => {
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
  getAllPosts: () => {
    const foundPosts = db.posts.map(mapper)
    return foundPosts
  },
  getPostById: (id: string) => {
    const foundPost = db.posts.find((post) => post.id === id)
    return foundPost ? mapper(foundPost) : null
  },
  createPost: (post: PostInputModel) => {
    const lastPostId = db.posts.at(-1)?.id
    const id: string = lastPostId ? (Number(lastPostId) + 1).toString() : "1"
    const blog = blogsRepository.getBlogById(post.blogId) as BlogDBModel
    const newPost: PostDBModel = {
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
  updatePost: (id: string, post: PostInputModel) => {
    const foundPost = db.posts.find((post) => post.id === id)
    if (!foundPost) return null
    const blog = blogsRepository.getBlogById(post.blogId) as BlogDBModel
    const updatedPost: PostDBModel = {
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
  deletePost: (id: string) => {
    const foundPost = db.posts.find((post) => post.id === id)
    if (!foundPost) return null
    db.posts = db.posts.filter((post) => post.id !== id)
    return foundPost
  },
}
