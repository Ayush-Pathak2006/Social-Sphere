const express = require("express");
const Pin = require("../models/Pin");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Example routes
router.get("/", (req, res) => res.send("Get all pins"));
router.post("/", (req, res) => res.send("Create a pin"));

// Create a Pin
router.post("/create", authMiddleware, async (req, res) => {
    const { image, description, boardId } = req.body;
  
    if (!image || !description || !boardId) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }
  
    try {
      const pin = new Pin({
        image,
        description,
        user: req.user, // Set the user from the token
        board: boardId,
      });
  
      await pin.save();
      res.status(201).json({ message: "Pin created successfully", pin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Fetch Pins by board
  router.get("/board/:boardId", authMiddleware, async (req, res) => {
    try {
      const pins = await Pin.find({ board: req.params.boardId }).populate("user", "username");
      res.status(200).json(pins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
module.exports = router;
