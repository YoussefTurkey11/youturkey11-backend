import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as blogService from "../services/blogsService.js";

// ============ Create Blog ============
export const createBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.createBlog({
    body: req.body,
    userId: req.user._id,
  });

  res.status(StatusCodes.CREATED).json({
    message: "Blog created successfully",
    data: blog,
  });
});

// ============ Get All Blogs ============
export const getAllBlogs = asyncHandler(async (req, res) => {
  const { published, tag, page, limit } = req.query;

  const result = await blogService.getAllBlogs({ published, tag, page, limit });

  res.status(StatusCodes.OK).json(result);
});

// ============ Get Blog By Slug ============
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const blog = await blogService.getBlogBySlug(slug);

  res.status(StatusCodes.OK).json({ data: blog });
});

// ============ Update Blog ============
export const updateBlog = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const blog = await blogService.updateBlog(slug, req.body);

  res.status(StatusCodes.OK).json({
    message: "Blog updated successfully",
    data: blog,
  });
});

// ============ Delete Blog ============
export const deleteBlog = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  await blogService.deleteBlog(slug);

  res.status(StatusCodes.OK).json({ message: "Blog deleted successfully" });
});

// ============ Toggle Publish ============
export const togglePublish = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const blog = await blogService.togglePublish(slug);

  res.status(StatusCodes.OK).json({
    message: `Blog is now ${blog.published ? "published" : "unpublished"}`,
    data: blog,
  });
});
