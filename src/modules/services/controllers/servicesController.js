import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as serviceService from "../services/servicesService.js";

// ============ Create Service ============
export const createService = asyncHandler(async (req, res) => {
  const service = await serviceService.createService(req.body);

  res.status(StatusCodes.CREATED).json({
    message: "Service created successfully",
    data: service,
  });
});

// ============ Get All Services ============
export const getAllServices = asyncHandler(async (req, res) => {
  const { category, isActive, page, limit } = req.query;

  const result = await serviceService.getAllServices({
    category,
    isActive,
    page,
    limit,
  });

  res.status(StatusCodes.OK).json(result);
});

// ============ Get Service By ID ============
export const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const service = await serviceService.getServiceById(id);

  res.status(StatusCodes.OK).json({ data: service });
});

// ============ Update Service ============
export const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const service = await serviceService.updateService(id, req.body);

  res.status(StatusCodes.OK).json({
    message: "Service updated successfully",
    data: service,
  });
});

// ============ Delete Service ============
export const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await serviceService.deleteService(id);

  res.status(StatusCodes.OK).json({ message: "Service deleted successfully" });
});

// ============ Toggle Active ============
export const toggleActive = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const service = await serviceService.toggleActive(id);

  res.status(StatusCodes.OK).json({
    message: `Service is now ${service.isActive ? "active" : "inactive"}`,
    data: service,
  });
});
