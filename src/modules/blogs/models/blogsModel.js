import mongoose from "mongoose";
import slugify from "slugify";
import { countWords } from "../../../utils/countWords.js";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title field is required"],
      trim: true,
    },

    slug: {
      type: String,
      trim: true,
      unique: true,
    },

    excerpt: {
      type: String,
      required: [true, "Excerpt field is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description field is required"],
      trim: true,
    },

    content: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Content field is required"],
    },

    coverImage: {
      type: String,
      required: [true, "Cover image field is required"],
      trim: true,
    },

    gallery: [
      {
        type: String,
        trim: true,
      },
    ],

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    views: {
      type: Number,
      default: 0,
    },

    readTime: {
      type: Number,
      default: 0,
    },

    published: {
      type: Boolean,
      default: false,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author field is required"],
    },
  },
  { timestamps: true },
);

blogSchema.pre("save", async function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }

  if (this.isModified("content")) {
    const text =
      typeof this.content === "string"
        ? this.content
        : countWords(this.content);

    const words = text.trim().split(/\s+/).length;
    this.readTime = Math.ceil(words / 200);
  }
});

blogSchema.index({ tags: 1 });
blogSchema.index({ createdAt: -1 });
blogSchema.index({ published: 1 });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
