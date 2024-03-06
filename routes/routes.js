const express = require("express");
const router = express.Router();
const fs = require("fs");
// const { v4: uuidv4 } = require('uuid');

const filePath = "./data/apiData.json";

// Get a random question
router.get("/", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const questions = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    const { correct_answer, ...questionWithoutAnswer } = question;
    res.json(questionWithoutAnswer);
  } catch (err) {
    res.status(500).send("Error reading question data");
  }
});

// Validate an answer
router.post("/validate", (req, res) => {
  // Changed the path to '/validate'
  const { question, answer } = req.body;
  try {
    const data = fs.readFileSync("./data/apiData.json", "utf8");
    const questions = JSON.parse(data);
    const questionObj = questions.find((q) => q.question === question);
    if (!questionObj) {
      res.status(404).send("Question not found");
      return;
    }
    const isCorrect = questionObj.correct_answer === answer;
    res.json({ correct: isCorrect });
  } catch (err) {
    res.status(500).send("Error reading question data");
  }
});

module.exports = router;
