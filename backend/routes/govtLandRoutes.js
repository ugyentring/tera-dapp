import express from "express";
import {
  getAllGovtLand,
  getGovtLandById,
  deleteGovtLandById,
  getAllLandRecords,
  updateGovtLandById,
} from "../controllers/govtLandController.js";

const router = express.Router();

// Define routes for govtLand
router.get("/", getAllGovtLand);
router.get("/land-records", getAllLandRecords);
router.get("/:id", getGovtLandById);
router.delete("/:id", deleteGovtLandById);
router.patch("/:id", updateGovtLandById);

export default router;
