import { Schema, model } from "mongoose";

export interface ReservationI {
  name: string;
  surname: string;
  email: string;
  phone: number;
  adults: number;
  children: number;
  residents: number;
  date: Date;
  idGenerated: string;
}

const reservationSchema: Schema<ReservationI> = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  adults: {
    type: Number,
    default: 0,
  },
  children: {
    type: Number,
    default: 0,
  },
  residents: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
  },
  idGenerated: {
    type: String,
    required: true,
  },
});

const Reservation = model("Reservation", reservationSchema, "reservations");

export default Reservation;
