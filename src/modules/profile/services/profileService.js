import { StatusCodes } from "http-status-codes";
import Profile from "../models/profileModel.js";
import ApiError from "../../../utils/apiError.js";

// ============ Create Profile ============
export const createProfile = async (body) => {
  const existProfile = await Profile.findOne({ user: body.user });
  if (existProfile) {
    throw new ApiError("Profile already exists", StatusCodes.BAD_REQUEST);
  }

  const profile = await Profile.create(body);
  return profile;
};

// ============ Get Profile ============
export const getProfile = async () => {
  const profile = await Profile.findOne().populate(
    "user",
    "fullName email phone",
  );

  if (!profile) {
    throw new ApiError("Profile not found", StatusCodes.NOT_FOUND);
  }

  return profile;
};

// ============ Update Profile ============
export const updateProfile = async (id, body) => {
  const profile = await Profile.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  }).populate("user", "fullName email phone");

  if (!profile) {
    throw new ApiError("Profile not found", StatusCodes.NOT_FOUND);
  }

  return profile;
};

// ============ Add Work Experience ============
export const addExperience = async (profileId, experience) => {
  const profile = await Profile.findByIdAndUpdate(
    profileId,
    { $push: { workExperience: experience } },
    { new: true, runValidators: true },
  );

  if (!profile) {
    throw new ApiError("Profile not found", StatusCodes.NOT_FOUND);
  }

  return profile;
};

// ============ Update Work Experience ============
export const updateExperience = async (profileId, experienceId, body) => {
  const profile = await Profile.findOneAndUpdate(
    { _id: profileId, "workExperience._id": experienceId },
    {
      $set: {
        "workExperience.$": { _id: experienceId, ...body },
      },
    },
    { new: true },
  );

  if (!profile) {
    throw new ApiError("Experience not found", StatusCodes.NOT_FOUND);
  }

  return profile;
};

// ============ Delete Work Experience ============
export const deleteExperience = async (profileId, experienceId) => {
  const profile = await Profile.findByIdAndUpdate(
    profileId,
    { $pull: { workExperience: { _id: experienceId } } },
    { new: true },
  );

  if (!profile) {
    throw new ApiError("Profile not found", StatusCodes.NOT_FOUND);
  }

  return profile;
};

// ============ Add Certification ============
export const addCertification = async (profileId, certification) => {
  const profile = await Profile.findByIdAndUpdate(
    profileId,
    { $push: { certifications: certification } },
    { new: true, runValidators: true },
  );

  if (!profile) {
    throw new ApiError("Profile not found", StatusCodes.NOT_FOUND);
  }

  return profile;
};

// ============ Update Certification ============
export const updateCertification = async (profileId, certificationId, body) => {
  const profile = await Profile.findOneAndUpdate(
    { _id: profileId, "certifications._id": certificationId },
    {
      $set: {
        "certifications.$": { _id: certificationId, ...body },
      },
    },
    { new: true },
  );
  if (!profile) {
    throw new ApiError("Profile not found", StatusCodes.NOT_FOUND);
  }

  return profile;
};

// ============ Delete Certification ============
export const deleteCertification = async (profileId, certificationId) => {
  const profile = await Profile.findByIdAndUpdate(
    profileId,
    { $pull: { certifications: { _id: certificationId } } },
    { new: true },
  );

  if (!profile) {
    throw new ApiError("Profile not found", StatusCodes.NOT_FOUND);
  }

  return profile;
};

// ============ Add Social Media ============
export const addSocialMedia = async (profileId, socialMedia) => {
  const profile = await Profile.findByIdAndUpdate(
    profileId,
    { $push: { socialMedia } },
    { new: true, runValidators: true },
  );

  if (!profile) {
    throw new ApiError("Profile not found", StatusCodes.NOT_FOUND);
  }

  return profile;
};

// ============ Update Social Media ============
export const updateSocialMedia = async (profileId, socialMedia) => {
  const profile = await Profile.findByIdAndUpdate(
    profileId,
    { $set: { socialMedia } },
    { new: true },
  );

  if (!profile) {
    throw new ApiError("Profile not found", StatusCodes.NOT_FOUND);
  }

  return profile;
};

// ============ Delete Social Media ============
export const deleteSocialMedia = async (profileId, socialMediaId) => {
  const profile = await Profile.findByIdAndUpdate(
    profileId,
    { $pull: { socialMedia: { _id: socialMediaId } } },
    { new: true },
  );

  if (!profile) {
    throw new ApiError("Profile not found", StatusCodes.NOT_FOUND);
  }

  return profile;
};
