const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  industry: {
    type: String,
  },
  website: {
    type: String,
  },
  logoUrl: {
    type: String,
  },
  recruitmentRoles: [{
    type: String,
  }],
  // Array of questions jarurat hai
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  }],
  averagePackage: {
    type: Number,
  },
  noOfStudentsPlaced: {
    type: Number,
    default: 0,
  },
  allOffers: [{
    type: Number,
    default: 0,
  }],

});

module.exports = mongoose.model("Company", CompanySchema);