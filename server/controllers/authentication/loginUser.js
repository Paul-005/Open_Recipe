const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModal = require("../../modals/UserModal");

const loginUser = async (req, res) => {


  try {
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { email, password } = req.body;

    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const secret = process.env.JWT_SECRET || "panoca_secret";

    // Create token with email in the payload
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '24h' });

    const { name, email: userEmail, _id } = user;

    res.status(200).json({
      message: "Successfully logged in",
      token,
      user: {
        name,
        email: userEmail,
        _id
      },
    });
    console.log(token);
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = loginUser;
