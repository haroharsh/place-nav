const Question = require("../models/question");
const Company = require("../models/company");

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err.message);
    res.status(500).send("Server Error");
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const { companies, ...rest } = req.body;
    const newQuestion = new Question({ ...rest, companies });
    const question = await newQuestion.save();

    if (companies && companies.length > 0) {
      await Company.updateMany(
        { _id: { $in: companies } },
        { $push: { questions: question._id } }
      );
    }

    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateSolution = async (req, res) => {
  try {
    const { type, content } = req.body;
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { solution: { type, content } },
      { new: true }
    );
    if (!question) return res.status(404).json({ msg: "Question not found" });
    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
