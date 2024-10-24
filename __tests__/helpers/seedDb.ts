import { db } from "../../src/db"
import { BlogDBModel } from "../../src/features/blog/blogModels"
import { PostDBModel } from "../../src/features/posts/postModels"
import { validBlogs, validPosts } from "../../src/mock"
import { DB_Collectons } from "../../src/types"

export const seedDb = async (collections: DB_Collectons[] = ["blogs", "posts"]) => {
  // console.log("seed func")
  if (collections.includes("blogs")) {
    db.blogs = validBlogs.map((it, i) => ({ ...it, id: (i + 1).toString() }))
  }
  if (collections.includes("posts")) {
    // console.log("seed posts")
    db.posts = validPosts.map((it, i) => {
      // console.log("+")

      try {
        const blog = db.blogs.find((blog) => blog.id === it.blogId) as BlogDBModel
        const newPost: PostDBModel = {
          id: (i + 1).toString(),
          title: it.title,
          shortDescription: it.shortDescription,
          content: it.content,
          blogId: it.blogId,
          blogName: blog?.name || "", // TODO: Почему блог не находится ??
        }
        return newPost
      } catch (error) {
        // console.error(error)
        throw error
      }
    })
  }
}
