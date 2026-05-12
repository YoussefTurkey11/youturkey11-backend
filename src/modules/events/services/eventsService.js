import { StatusCodes } from "http-status-codes";
import Event from "../models/eventsModel.js";
import ApiError from "../../../utils/apiError.js";

// ============ Create Event ============
export const createEvent = async (body) => {
  if (new Date(body.endDate) <= new Date(body.startDate)) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "End date must be after start date",
    );
  }

  const event = await Event.create(body);
  return event;
};

// ============ Get All Events ============
export const getAllEvents = async ({ type, page = 1, limit = 10 }) => {
  const filter = {};
  if (type) filter.type = type;

  const skip = (page - 1) * limit;

  const [events, total] = await Promise.all([
    Event.find(filter).sort({ startDate: 1 }).skip(skip).limit(Number(limit)),
    Event.countDocuments(filter),
  ]);

  return {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: events,
  };
};

// ============ Get Event By ID ============
export const getEventById = async (id) => {
  const event = await Event.findById(id);

  if (!event) {
    throw new ApiError(`No event found with id: ${id}`, StatusCodes.NOT_FOUND);
  }

  return event;
};

// ============ Update Event ============
export const updateEvent = async (id, body) => {
  if (body.startDate && body.endDate) {
    if (new Date(body.endDate) <= new Date(body.startDate)) {
      throw new ApiError(
        "End date must be after start date",
        StatusCodes.BAD_REQUEST,
      );
    }
  }

  const event = await Event.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!event) {
    throw new ApiError(`No event found with id: ${id}`, StatusCodes.NOT_FOUND);
  }

  return event;
};

// ============ Delete Event ============
export const deleteEvent = async (id) => {
  const event = await Event.findByIdAndDelete(id);

  if (!event) {
    throw new ApiError(`No event found with id: ${id}`, StatusCodes.NOT_FOUND);
  }

  return event;
};
