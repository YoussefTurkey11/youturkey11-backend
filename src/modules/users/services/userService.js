import { StatusCodes } from "http-status-codes";
import User from "../../auth/models/userModel.js";
import ApiError from "../../../utils/apiError.js";

export const getAllUsers = async () => {
  const user = await User.find().select(
    "-password -passwordResetToken -passwordResetExpire -emailVerifyToken -emailVerifyExpire -__v",
  );

  return user;
};

export const getUserById = async (id) => {
  const user = await User.findById(id).select(
    "-password -passwordResetToken -passwordResetExpire -emailVerifyToken -emailVerifyExpire -__v",
  );

  if (!user) {
    throw new ApiError(
      `No user found for this id: ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return user;
};

export const updateUserRole = async (id, role) => {
  if (!["user", "admin"].includes(role)) {
    throw new ApiError(`Invalid role`, StatusCodes.BAD_REQUEST);
  }

  const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select(
    "-password -__v",
  );

  if (!user) {
    throw new ApiError(
      `No user found for this id: ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return user;
};

export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new ApiError(
      `No user found for this id: ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return user;
};
