import express from "express";
import Reservation from "../../database/models/reservation";
import ErrorCode from "../../interfaces/error/error";

const getAllReservation = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  try {
    const reservations = await Reservation.find();
    if (reservations) {
      res.json(reservations);
      return;
    }
    const error = new ErrorCode("Could not find reservations");
    error.code = 404;
    next(error);
  } catch (error: any) {
    error.code = 400;
    error.message = "Could not get reservations";
    next(error);
  }
};

const getUniqueReservation = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  try {
    const { idReservation } = req.params;
    const searchedReservation = await Reservation.findById(idReservation);
    if (searchedReservation) {
      res.json(searchedReservation);
      return;
    }
    const error = new ErrorCode("Could not find reservation");
    error.code = 404;
    next(error);
  } catch (error: any) {
    error.code = 400;
    error.message = "Could not search for the reservation";
    next(error);
  }
};

const postReservation = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  try {
    const reservation = req.body;
    const newReservation = await Reservation.create(reservation);
    if (newReservation) {
      res.json(newReservation);
      return;
    }
    const error = new ErrorCode("Could not find the reservation");
    error.code = 404;
    next(error);
  } catch (error: any) {
    error.code = 400;
    error.message = "Could not create new reservation";
    next(error);
  }
};

const deleteReservation = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  try {
    const { idReservation } = req.params;
    const reservationDeleted = await Reservation.findByIdAndRemove(
      idReservation
    );
    if (reservationDeleted) {
      res.json("Deleted successfully");
      return;
    }
    const error = new ErrorCode("Could not find the reservation");
    error.code = 404;
    next(error);
  } catch (error: any) {
    error.code = 400;
    error.message = "Could not delete reservation";
    next(error);
  }
};

const updateReservation = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  try {
    const { idReservation } = req.params;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      idReservation,
      req.body,
      { new: true }
    );
    if (updatedReservation) {
      res.json(updatedReservation);
      return;
    }
    const error = new ErrorCode("Could not find the reservation");
    error.code = 404;
    next(error);
  } catch (error: any) {
    error.code = 400;
    error.message = "Could not update reservation";
    next(error);
  }
};

export {
  getAllReservation,
  getUniqueReservation,
  postReservation,
  deleteReservation,
  updateReservation,
};
