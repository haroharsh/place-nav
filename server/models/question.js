const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Technical", "HR", "Aptitude", "Other"],
    default: "Technical",
  },
  role: {
    type: String,
    required: true, // jyadatar to "Software Development Engineer"
  },
  link: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },
  companies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company", // Bidirectional relation to Company 
  }]
});

module.exports = mongoose.model("Question", QuestionSchema);
