import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        "Training and Mentorship",
        "Freelance Projects",
        "Work Opportunities",
        "Online and Offline Workshops | Talks",
        "Podcast and Youtube",
      ],
      default: "Training and Mentorship",
      required: [true, "Category field is required"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Title field is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description field is required"],
    },
    price: {
      type: Number,
      min: 0,
      required: [true, "Price field is required"],
    },
    features: [
      {
        type: String,
        trim: true,
        required: [true, "Each feature must be a non-empty string"],
      },
    ],
    bookingLink: {
      type: String,
      trim: true,
      required: [true, "Booking Link field is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
      required: [true, "isActive field is required"],
    },
  },
  { timestamps: true },
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
