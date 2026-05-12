import mongoose from "mongoose";

const socialMediaSchema = new mongoose.Schema({
  platform: String,
  url: String,
});

const experienceSchema = new mongoose.Schema({
  company: String,
  position: String,
  startDate: Date,
  endDate: Date,
  currentlyWorking: Boolean,
  description: String,
});

const certificationSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  fileUrl: String,
  imageUrl: String,
  issueDate: Date,
});

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User field is required"],
    },

    position: {
      type: String,
      required: [true, "Position field is required"],
      trim: true,
    },

    seniority: {
      type: String,
      required: [true, "Seniority field is required"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Location field is required"],
      trim: true,
    },

    summary: {
      type: String,
      required: [true, "Summary field is required"],
      maxlength: 1000,
    },

    objective: {
      type: String,
      required: [true, "Objective field is required"],
    },

    resumePdf: {
      type: String,
    },

    socialMedia: [socialMediaSchema],

    workExperience: [experienceSchema],

    certifications: [certificationSchema],
  },
  { timestamps: true },
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
