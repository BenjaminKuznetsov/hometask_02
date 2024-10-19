import { db } from "../../db"
import { PostDBModel, PostViewModel } from "./postModels"

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
}
