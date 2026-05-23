import express from "express";

import {
  saveToken,
  createEntry,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/save-token", saveToken);

router.post("/create-entry", createEntry);

export default router;