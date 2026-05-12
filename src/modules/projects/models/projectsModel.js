import mongoose from "mongoose";
import slugify from "slugify";

const projectSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["frontend", "backend", "fullstack", "mobile", "other"],
      default: "frontend",
      required: [true, "Category field is required"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Title field is required"],
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description field is required"],
    },
    coverImage: {
      type: String,
      trim: true,
      required: [true, "Cover image field is required"],
    },
    gallery: [
      {
        type: String,
        trim: true,
      },
    ],
    technologies: [
      {
        type: String,
        trim: true,
        required: [true, "Technologies field is required"],
      },
    ],
    liveDemo: {
      type: String,
      trim: true,
      required: [true, "Live demo field is required"],
    },
    githubRepo: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

projectSchema.pre("save", async function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
