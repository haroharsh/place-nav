const express = require("express");
const router = express.Router();
const { getAllQuestions, addQuestion, updateSolution } = require("../controllers/questionController");
const auth = require("../middleware/auth");
const admin = require("../middleware/adminAuth");

router.get("/", getAllQuestions);
router.post("/", [auth, admin], addQuestion);

router.put("/:id/solution", [auth, admin], updateSolution);

module.exports = router;
