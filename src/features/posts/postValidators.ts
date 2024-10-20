import { body } from "express-validator"
import { blogsRepository } from "../blog/blogsRepository"

export const titleValidator = body("title")
  .isString()
  .withMessage("Title should be a string")
  .trim()
  .isLength({ min: 3, max: 30 })
  .withMessage("Title length should be between 3 and 30 characters")
export const shortDescriptionValidator = body("shortDescription")
  .isString()
  .withMessage("Short description should be a string")
  .trim()
  .isLength({ min: 3, max: 100 })
  .withMessage("Short description length should be between 3 and 100 characters")
export const contentValidator = body("content")
  .isString()
  .withMessage("Content should be a string")
  .trim()
  .isLength({ min: 3, max: 1000 })
  .withMessage("Content length should be between 3 and 1000 characters")
export const blogIdValidator = body("blogId").custom((blogId) => {
  const blog = blogsRepository.getBlogById(blogId)
  if (!blog) {
    throw new Error("Blog with such id not found")
  }
})
