import request from "supertest"
import { app } from "../src/app"
import { PATHS } from "../src/lib/paths"
import { HttpStatusCodes } from "../src/lib/httpStatusCodes"
import { validBlogs, invalidBlogs, validPosts, invalidPosts } from "../src/mock"
import { encodeToBase64 } from "../src/lib/helpers"

const ADMIN_AUTH = "admin:qwerty"

describe("preparation", () => {
  beforeAll(async () => {
    await request(app).delete(PATHS.TESTING)
    await request(app).patch(PATHS.TESTING)
  })
  it("should return all blogs", async () => {
    const response = await request(app).get(PATHS.BLOGS).expect(HttpStatusCodes.OK)
    const returnedBlogs = response.body
    // console.log("returnedBlogs", returnedBlogs)
    expect(returnedBlogs).toHaveLength(validBlogs.length)
  })
})

describe("Create, get by id", () => {
  beforeAll(async () => {
    await new Promise<void>((resolve) => resolve())
  })

  it("shouldn't create post, because user is not authorized", async () => {
    const newPost = validPosts[0]
    await request(app).post(PATHS.POSTS).send(newPost).expect(HttpStatusCodes.Unauthorized)
  })

  it("shouldn't create post with incorrect auth credentials", async () => {
    const newPost = validPosts[0]
    await request(app)
      .post(PATHS.POSTS)
      .set("Authorization", `Basic qwerty:qwerty`)
      .send(newPost)
      .expect(HttpStatusCodes.Unauthorized)
  })

  describe("create two posts and find by id", () => {
    it("should create 2 posts and find post by id", async () => {
      const newPost1 = validPosts[0]
      const res = await request(app).get(`${PATHS.BLOGS}/${newPost1.blogId}`)
      const blog1 = res.body
      //   console.log("blog1", blog1)
      const newPost2 = validPosts[1]
      //   console.log("newPost1", newPost1)

      const response1 = await request(app)
        .post(PATHS.POSTS)
        .set("Authorization", `Basic ${encodeToBase64(ADMIN_AUTH)}`)
        .send(newPost1)
        .expect(HttpStatusCodes.Created)
      //   console.log("response1", response1.body)
      //   expect(response1.status).toBe(HttpStatusCodes.Created)

      const createdPost1 = response1.body
      expect(createdPost1.id).toBe("1")
      expect(createdPost1.title).toBe(newPost1.title)
      expect(createdPost1.shortDescription).toBe(newPost1.shortDescription)
      expect(createdPost1.content).toBe(newPost1.content)
      expect(createdPost1.blogId).toBe(newPost1.blogId)
      // @ts-ignore
      expect(createdPost1.blogName).toBe(blog1.name)

      const response2 = await request(app)
        .post(PATHS.POSTS)
        .set("Authorization", `Basic ${encodeToBase64(ADMIN_AUTH)}`)
        .send(newPost2)
        .expect(HttpStatusCodes.Created)
      const createdPost2 = response2.body
      expect(createdPost2.id).toBe("2")

      const res3 = await request(app).get(`${PATHS.POSTS}/${createdPost1.id}`).expect(HttpStatusCodes.OK)
      const foundPost = res3.body
      expect(foundPost.id).toBe(createdPost1.id)
      expect(foundPost.title).toBe(createdPost1.title)
      expect(foundPost.shortDescription).toBe(createdPost1.shortDescription)
      expect(foundPost.content).toBe(createdPost1.content)
      expect(foundPost.blogId).toBe(createdPost1.blogId)
      expect(foundPost.blogName).toBe(createdPost1.blogName)
    })

    it("shouldn't find post with non-existent id", async () => {
      await request(app).get(`${PATHS.POSTS}/100500`).expect(HttpStatusCodes.NotFound)
    })
  })

  it("shouldn't create post with incorrect input data", async () => {
    for (const el of invalidPosts) {
      const response = await request(app)
        .post(PATHS.POSTS)
        .set("Authorization", `Basic ${encodeToBase64(ADMIN_AUTH)}`)
        .send(el)
        .expect(HttpStatusCodes.BadRequest)
      // console.log(JSON.stringify(response.body, null, 2))
    }
  })
  it("shouldn`t create post with incorrect blog id", () => {
    const newPost = validPosts[0]
    newPost.blogId = "100500"
    request(app)
      .post(PATHS.POSTS)
      .set("Authorization", `Basic ${encodeToBase64(ADMIN_AUTH)}`)
      .send(newPost)
      .expect(HttpStatusCodes.BadRequest)
  })
})

// describe("Update and delete", () => {
//   beforeAll(async () => {
//     await request(app).delete(PATHS.TESTING)
//     await request(app).patch(PATHS.TESTING)
//   })

//   it("should return all blogs", async () => {
//     const response = await request(app).get(PATHS.BLOGS).expect(HttpStatusCodes.OK)
//     const returnedBlogs = response.body
//     expect(returnedBlogs).toHaveLength(validBlogs.length)
//   })

//   it("shouldn't update blog, because user is not authorized", async () => {
//     const updatedBlog = validBlogs[0]
//     await request(app).put(`${PATHS.BLOGS}/1`).send(updatedBlog).expect(HttpStatusCodes.Unauthorized)
//   })

//   it("shouldn't update blog with incorrect input data", async () => {
//     for (const el of invalidBlogs) {
//       const response = await request(app)
//         .put(`${PATHS.BLOGS}/5`)
//         .set("Authorization", `Basic ${encodeToBase64(ADMIN_AUTH)}`)
//         .send(el)
//         .expect(HttpStatusCodes.BadRequest)
//       // console.log(JSON.stringify(response.body, null, 2))
//     }
//   })

//   it("shouldn't update blog with non-existent id", async () => {
//     const updatedBlog = validBlogs[0]
//     await request(app)
//       .put(`${PATHS.BLOGS}/100500`)
//       .set("Authorization", `Basic ${encodeToBase64(ADMIN_AUTH)}`)
//       .send(updatedBlog)
//       .expect(HttpStatusCodes.NotFound)
//   })

//   it("should update blog with correct data", async () => {
//     const updatedBlog = validBlogs[0]
//     await request(app)
//       .put(`${PATHS.BLOGS}/1`)
//       .set("Authorization", `Basic ${encodeToBase64(ADMIN_AUTH)}`)
//       .send(updatedBlog)
//       .expect(HttpStatusCodes.NoContent)
//   })

//   it("shouldn't delete blog, because user is not authorized", async () => {
//     await request(app).delete(`${PATHS.BLOGS}/1`).expect(HttpStatusCodes.Unauthorized)
//   })

//   it("shouldn't delete blog with non-existent id", async () => {
//     await request(app)
//       .delete(`${PATHS.BLOGS}/100500`)
//       .set("Authorization", `Basic ${encodeToBase64(ADMIN_AUTH)}`)
//       .expect(HttpStatusCodes.NotFound)
//   })

//   it("should delete blog with correct id", async () => {
//     await request(app)
//       .delete(`${PATHS.BLOGS}/1`)
//       .set("Authorization", `Basic ${encodeToBase64(ADMIN_AUTH)}`)
//       .expect(HttpStatusCodes.NoContent)
//   })
// })

/* 
 Напиши такие тесты:
 - не должен обновить блог, если пользователь не авторизован
 - не должен обновить блог с некорректными данными (пройдись циклом по массиву invalidBlogs)
 - не должен обновить блог с несуществующим id
 - должен обновить блог с корректными данными
 - не должен удалить блог, если пользователь не авторизован
 - не должен удалить блог с несущействующим id
 - должен удалить блог с корректными id
}) */
