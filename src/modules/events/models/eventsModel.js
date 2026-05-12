import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["offline", "online"],
      default: "offline",
      required: [true, "Event type field is required"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Event title field is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Event description field is required"],
    },
    image: {
      type: String,
      trim: true,
      required: [true, "Event image field is required"],
    },
    link: {
      type: String,
      trim: true,
      required: [true, "Event link field is required"],
    },
    location: {
      type: String,
      trim: true,
      required: [true, "Event location field is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Event start date field is required"],
    },
    endDate: {
      type: Date,
      required: [true, "Event end date field is required"],
    },
  },
  { timestamps: true },
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
