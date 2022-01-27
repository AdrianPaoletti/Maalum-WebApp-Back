import express from "express";
import {
  getAllReservation,
  getUniqueReservation,
  postReservation,
  deleteReservation,
  updateReservation,
} from "../controllers/reservationsController";

const router = express.Router();

router.get("/getAll", getAllReservation);
router.get("/get/:idReservation", getUniqueReservation);
router.post("/create", postReservation);
router.delete("/delete/:idReservation", deleteReservation);
router.put("/update/:idReservation", updateReservation);

export default router;
