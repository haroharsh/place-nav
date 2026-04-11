const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isValidJUITEmail = (email) => {
  const regex = /^[2-9][0-9]*[a-zA-Z0-9._%+-]*@juitsolan\.in$/;
  return regex.test(email);
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!isValidJUITEmail(email)) {
      return res.status(400).json({
        msg: "Email must start ≥2 and end with @juitsolan.in"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ msg: "Registered successfully" });

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isValidJUITEmail(email)) {
      return res.status(400).json({ msg: "Invalid college email" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    res.status(500).json(err);
  }
};