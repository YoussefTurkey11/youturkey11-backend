import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as profileService from "../services/profileService.js";

// ============ Create Profile ============
export const createProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.createProfile({
    ...req.body,
    user: req.user._id,
  });

  res.status(StatusCodes.CREATED).json({
    message: "Profile created successfully",
    data: profile,
  });
});

// ============ Get Profile ============
export const getProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.getProfile();

  res.status(StatusCodes.OK).json({ data: profile });
});

// ============ Update Profile ============
export const updateProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const profile = await profileService.updateProfile(id, req.body);

  res.status(StatusCodes.OK).json({
    message: "Profile updated successfully",
    data: profile,
  });
});

// ============ Add Experience ============
export const addExperience = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const profile = await profileService.addExperience(id, req.body);

  res.status(StatusCodes.CREATED).json({
    message: "Experience added successfully",
    data: profile,
  });
});

// ============ Update Experience ============
export const updateExperience = asyncHandler(async (req, res) => {
  const { id, experienceId } = req.params;

  const profile = await profileService.updateExperience(
    id,
    experienceId,
    req.body,
  );

  res.status(StatusCodes.OK).json({
    message: "Experience updated successfully",
    data: profile,
  });
});

// ============ Delete Experience ============
export const deleteExperience = asyncHandler(async (req, res) => {
  const { id, experienceId } = req.params;

  const profile = await profileService.deleteExperience(id, experienceId);

  res.status(StatusCodes.OK).json({
    message: "Experience deleted successfully",
    data: profile,
  });
});

// ============ Add Certification ============
export const addCertification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const profile = await profileService.addCertification(id, req.body);

  res.status(StatusCodes.CREATED).json({
    message: "Certification added successfully",
    data: profile,
  });
});

// ============ Update Certification ============
export const updateCertification = asyncHandler(async (req, res) => {
  const { id, certificationId } = req.params;
  const certification = req.body;

  const profile = await profileService.updateCertification(
    id,
    certificationId,
    certification,
  );

  res.status(StatusCodes.OK).json({
    message: "Certification updated successfully",
    data: profile,
  });
});

// ============ Delete Certification ============
export const deleteCertification = asyncHandler(async (req, res) => {
  const { id, certificationId } = req.params;

  const profile = await profileService.deleteCertification(id, certificationId);

  res.status(StatusCodes.OK).json({
    message: "Certification deleted successfully",
    data: profile,
  });
});

// ============ Add Social Media ============
export const addSocialMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const profile = await profileService.addSocialMedia(id, req.body);

  res.status(StatusCodes.CREATED).json({
    message: "Social media added successfully",
    data: profile,
  });
});

// ============ Update Social Media ============
export const updateSocialMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const profile = await profileService.updateSocialMedia(
    id,
    req.body.socialMedia,
  );

  res.status(StatusCodes.OK).json({
    message: "Social media updated successfully",
    data: profile,
  });
});

// ============ Delete Social Media ============
export const deleteSocialMedia = asyncHandler(async (req, res) => {
  const { id, socialMediaId } = req.params;

  const profile = await profileService.deleteSocialMedia(id, socialMediaId);

  res.status(StatusCodes.OK).json({
    message: "Social media deleted successfully",
    data: profile,
  });
});
