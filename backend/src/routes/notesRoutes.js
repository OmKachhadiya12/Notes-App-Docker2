import express from "express";
import {
  createNote,
  deleteNotes,
  getAllNotes,
  updateNotes,
  getNoteById,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router;
