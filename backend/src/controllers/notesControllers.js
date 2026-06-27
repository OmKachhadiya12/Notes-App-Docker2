import Note from "../models/noteModel.js";

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // -1 newest note appear first(descending order)
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    console.error("Error occur dunring fetching note: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(200).json({ message: "Note created successfully" });
  } catch (error) {
    console.error("Error occur dunring note creation: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true },
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(201).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Error occur dunring note update: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteNotes = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ message: "Note deleted succesfully" });
  } catch (error) {
    console.error("Error occur during deleting note: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllNotes, createNote, updateNotes, deleteNotes, getNoteById };
