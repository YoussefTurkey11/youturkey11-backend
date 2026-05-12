import { StatusCodes } from "http-status-codes";
import slugify from "slugify";
import ApiError from "../../../utils/apiError.js";
import Blog from "../models/blogsModel.js";

// ============ Create Blog ============
export const createBlog = async ({ body, userId }) => {
  const blog = await Blog.create({ ...body, author: userId });
  return blog;
};

// ============ Get All Blogs ============
export const getAllBlogs = async ({ published, tag, page = 1, limit = 10 }) => {
  const filter = {};
  if (published !== undefined) filter.published = published === "true";
  if (tag) filter.tags = { $in: [tag] };

  const skip = (page - 1) * limit;

  const [blogs, total] = await Promise.all([
    Blog.find(filter)
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-content"),
    Blog.countDocuments(filter),
  ]);
  return {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: blogs,
  };
};

// ============ Get Blog By Slug ============
export const getBlogBySlug = async (slug) => {
  const blog = await Blog.findOneAndUpdate(
    { slug: slugify(slug, { lower: true }) },
    { $inc: { views: 1 } },
    { new: true },
  ).populate("author", "fullName email");

  if (!blog) {
    throw new ApiError(
      `No blog found with slug: ${slugify(slug, { lower: true })}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return blog;
};

// ============ Update Blog ============
export const updateBlog = async (slug, body) => {
  const blog = await Blog.findOneAndUpdate(
    { slug: slugify(slug, { lower: true }) },
    { ...body },
    { new: true, runValidators: true },
  );

  if (!blog) {
    throw new ApiError(
      `No blog found with slug: ${slugify(slug, { lower: true })}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return blog;
};

// ============ Delete Blog ============
export const deleteBlog = async (slug) => {
  const blog = await Blog.findOneAndDelete({
    slug: slugify(slug, { lower: true }),
  });

  if (!blog) {
    throw new ApiError(
      `No blog found with slug: ${slugify(slug, { lower: true })}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return blog;
};

// ============ Toggle Publish ============
export const togglePublish = async (slug) => {
  const blog = await Blog.findOne({ slug: slugify(slug, { lower: true }) });

  if (!blog) {
    throw new ApiError(
      `No blog found with slug: ${slugify(slug, { lower: true })}`,
      StatusCodes.NOT_FOUND,
    );
  }

  blog.published = !blog.published;
  await blog.save();

  return blog;
};
