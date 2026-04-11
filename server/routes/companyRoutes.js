const express = require("express");
const router = express.Router();
const { getCompanies, getCompanyDetails, addCompany } = require("../controllers/companyController");
const auth = require("../middleware/auth");
const admin = require("../middleware/adminAuth");

// Company Routing made easy
router.get("/", getCompanies);

router.post("/", [auth, admin], addCompany);

router.get("/:id", getCompanyDetails);

module.exports = router;
