import { StatusCodes } from "http-status-codes";
import Service from "../models/servicesModel.js";
import ApiError from "../../../utils/apiError.js";

// ============ Create Service ============
export const createService = async (body) => {
  const service = await Service.create(body);
  return service;
};

// ============ Get All Services ============
export const getAllServices = async ({
  category,
  isActive,
  page = 1,
  limit = 10,
}) => {
  const filter = {};
  if (category) filter.category = category;
  if (isActive !== undefined) filter.isActive = isActive === "true";

  const skip = (page - 1) * limit;

  const [services, total] = await Promise.all([
    Service.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Service.countDocuments(filter),
  ]);

  return {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: services,
  };
};

// ============ Get Service By ID ============
export const getServiceById = async (id) => {
  const service = await Service.findById(id);

  if (!service) {
    throw new ApiError(
      `No service found with id: ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return service;
};

// ============ Update Service ============
export const updateService = async (id, body) => {
  const service = await Service.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    throw new ApiError(
      `No service found with id: ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return service;
};

// ============ Delete Service ============
export const deleteService = async (id) => {
  const service = await Service.findByIdAndDelete(id);

  if (!service) {
    throw new ApiError(
      `No service found with id: ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return service;
};

// ============ Toggle Active ============
export const toggleActive = async (id) => {
  const service = await Service.findById(id);

  if (!service) {
    throw new ApiError(
      `No service found with id: ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }

  service.isActive = !service.isActive;
  await service.save();

  return service;
};
