import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as userService from "../services/userService.js";

export const getAllUsers = asyncHandler(async (_, res) => {
  const users = await userService.getAllUsers();
  res.status(StatusCodes.OK).json({ result: users.length, data: users });
});

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  res.status(StatusCodes.OK).json(user);
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const user = await userService.updateUserRole(id, role);
  res.status(StatusCodes.OK).json({ message: "User is admin now!", user });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await userService.deleteUser(id);
  res
    .status(StatusCodes.OK)
    .json({ message: "User was deleted successfully!" });
});
