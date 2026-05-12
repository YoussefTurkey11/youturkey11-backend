import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as eventService from "../services/eventsService.js";

// ============ Create Event ============
export const createEvent = asyncHandler(async (req, res) => {
  const event = await eventService.createEvent(req.body);

  res.status(StatusCodes.CREATED).json({
    message: "Event created successfully",
    data: event,
  });
});

// ============ Get All Events ============
export const getAllEvents = asyncHandler(async (req, res) => {
  const { type, page, limit } = req.query;

  const result = await eventService.getAllEvents({ type, page, limit });

  res.status(StatusCodes.OK).json(result);
});

// ============ Get Event By ID ============
export const getEventById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const event = await eventService.getEventById(id);

  res.status(StatusCodes.OK).json({ data: event });
});

// ============ Update Event ============
export const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const event = await eventService.updateEvent(id, req.body);

  res.status(StatusCodes.OK).json({
    message: "Event updated successfully",
    data: event,
  });
});

// ============ Delete Event ============
export const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await eventService.deleteEvent(id);

  res.status(StatusCodes.OK).json({ message: "Event deleted successfully" });
});
