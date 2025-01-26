const express = require("express");
const Board = require("../models/Board");
const authMiddleware = require("../middleware/authMiddleware"); 
const router = express.Router();

// Example routes
router.get("/", (req, res) => res.send("Get all boards"));
router.post("/", (req, res) => res.send("Create a board"));

// Create a Board
router.post("/create", authMiddleware, async (req, res) => {
    const { name, description } = req.body;
  
    if (!name || !description) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }
  
    try {
      const board = new Board({
        name,
        description,
        user: req.user, // Set the user from the token
      });
  
      await board.save();
      res.status(201).json({ message: "Board created successfully", board });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Fetch all boards for a user
  router.get("/", authMiddleware, async (req, res) => {
    try {
      const boards = await Board.find({ user: req.user }).populate("pins");
      res.status(200).json(boards);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
